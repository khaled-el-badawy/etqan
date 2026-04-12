import React, { useEffect, useState } from 'react';
import './ClientProfile.css';
import { 
  FaStar, FaStarHalfAlt, FaRegStar, FaEdit, 
  FaExclamationTriangle, FaTimes, FaEye, FaEyeSlash 
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  // حالات التحكم في النوافذ المنبثقة
  const [showRateModal, setShowRateModal] = useState(false);
  const [showComplainModal, setShowComplainModal] = useState(false);
  
  // حالات تخزين التقييمات والشكاوى
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [complainText, setComplainText] = useState("");

  // حالات إظهار/إخفاء كلمات السر
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // بيانات الملف الشخصي
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    city: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSavePersonalData = (e) => {
    e.preventDefault();
    let newErrors = {};

    // التحقق من البريد الإلكتروني
    if (!formData.email) {
      newErrors.email = "ادخل البريد الالكتروني";
    } else if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "البريد الإلكتروني يجب أن ينتهي بـ @gmail.com";
    }

    // التحقق من الهاتف
    if (!formData.phone) {
      newErrors.phone = "ادخل رقم الهاتف";
    } else if (formData.phone.length !== 11) {
      newErrors.phone = "رقم الهاتف يجب أن يكون 11 رقم";
    }

    // التحقق من المحافظة
    if (!formData.city) {
      newErrors.city = "ادخل المحافظه";
    }

    // التحقق من كلمة السر الحالية
    if (!formData.password) {
      newErrors.password = "ادخل كلمت السر";
    }

    // التحقق من كلمة السر الجديدة
    if (!formData.newPassword) {
      newErrors.newPassword = "ادخل كلمت السر الجديده";
    }

    // التحقق من تأكيد كلمة السر
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "ادخل التاكيد";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "كلمت السر غير صحيحة";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("تم حفظ البيانات بنجاح");
      
      // تصفير الحقول بعد الضغط على OK
      setFormData({
        email: '',
        phone: '',
        city: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setActiveTab('about'); 
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const reviews = [
    { id: 1, name: "احمد علي", job: "سباك", date: "15/2/2025", rating: 5, img: "/images/Client profile/icon1.svg" },
    { id: 2, name: "محمد محمود", job: "كهربائي", date: "5/3/2025", rating: 5, img: "/images/Client profile/icon2.svg" },
    { id: 3, name: "شركة مكة", job: "شركة نقل", date: "1/5/2025", rating: 4, img: "/images/Client profile/icon3.svg" },
    { id: 4, name: "علي محمود", job: "فني كاميرات", date: "1/5/2025", rating: 4, img: "/images/Client profile/icon1.svg" },
  ];

  const historyData = [
    { id: 1, name: "احمد علي", job: "سباك", icon: "/images/Client profile/Client icon1.svg" }, 
    { id: 2, name: "محمد محمود", job: "كهربائي", icon: "/images/Client profile/Client icon2.svg" },
    { id: 3, name: "شركة مكة", job: "شركة نقل", icon: "/images/Client profile/Client icon3.svg" },
    { id: 4, name: "علي محمود", job: "فني كاميرات", icon: "/images/Client profile/Client icon4.svg" },
  ];

  const renderInteractiveStars = () => (
    <div className="interactive-stars-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= selectedRating ? "star-active" : "star-inactive"}
          onClick={() => setSelectedRating(star)}
        />
      ))}
    </div>
  );

  const handleCloseModals = () => {
    setShowRateModal(false);
    setShowComplainModal(false);
    setSelectedRating(0);
    setReviewText("");
    setComplainText("");
  };

  return (
    <div className="profile-container">
      <header className="profile-header" style={{ backgroundImage: `url('/images/Client profile/hero.svg')` }}></header>

      <div className="profile-identity-wrapper" data-aos="fade-left">
        <div className="identity-content">
          <div className="avatar-container">
            <img src="/images/Client profile/client.svg" alt="Client" className="main-avatar" />
          </div>
          <div className="name-verify-block">
            <h2 className="client-name">
              محمد السيد
              <img src="/images/Client profile/profilelogo1.svg" alt="Verified" className="verify-tick" />
              <img 
                src="/images/Client profile/profilelogo2.svg" 
                alt="Edit" 
                className="edit-name-icon" 
                title="تعديل البيانات" 
                onClick={() => setActiveTab('edit')}
              />
            </h2>
          </div>
        </div>
      </div>

      {activeTab !== 'edit' && (
        <div className="profile-tabs">
          <button className={`tab-item ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>عن العميل</button>
          <button className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>تقييمات</button>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="about-content-card" data-aos="fade-up">
            <div className="history-label-box">السجلات السابقه</div>
            <div className="history-list">
                {historyData.map((item) => (
                    <div key={item.id} className="history-item-row">
                        <div className="history-user-info">
                            <img src={item.icon} alt="icon" className="category-icon" />
                            <div className='user-text'>
                                <h4>{item.name}</h4>
                                <p>{item.job}</p>
                            </div>
                        </div>
                        <div className="history-rating-side">
                            <button className="small-rate-btn" onClick={() => setShowRateModal(true)}>
                                <span>تقييم </span>
                                <span>★★★</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="show-more-arrow">عرض المزيد ∨</button>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="reviews-section-card" data-aos="zoom-in">
          <div className="rating-header-row">
            <h3 className="section-title">التقييمات</h3>
            <div className="rating-summary-box">
               <div className="bars-side">
                  {[5, 4, 3, 2, 1].map(num => (
                    <div key={num} className="bar-row">
                      <span className="bar-label">{num}</span>
                      <div className="bar-track">
                        <div className="bar-level" style={{ width: num === 5 ? '90%' : num === 4 ? '15%' : '5%' }}></div>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="score-side">
                  <span className="big-score">4.8</span>
                  <div className="stars-icons-rtl">
                    <FaStarHalfAlt />
                    <FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
               </div>
            </div>
          </div>
          <div className="reviews-feed">
            {reviews.map((rev) => (
              <div key={rev.id} className="review-card-item">
                <div className="user-meta">
                  <img src={rev.img} alt={rev.name} />
                  <div className="user-text">
                    <h4>{rev.name}</h4>
                    <p>{rev.job}</p>
                  </div>
                </div>
                <div className="review-status">
                  <span className="date-stamp">{rev.date}</span>
                  <div className="stars-group">
                    {[...Array(5)].map((_, i) => (
                      i < rev.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                    ))}
                  </div>
                </div>
                <div className="review-btns">
                  <button className="btn-edit-rev"><FaEdit /> تعديل</button>
                  <button className="btn-complain" onClick={() => setShowComplainModal(true)}><FaExclamationTriangle /> شكوي</button>
                </div>
              </div>
            ))}
          </div>
          <button className="load-more">عرض كل التقييمات ↓</button>
        </div>
      )}

      {showRateModal && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="zoom-in">
            <button className="close-modal" onClick={handleCloseModals}><FaTimes /></button>
            <h3>قيم الخدمة</h3>
            {renderInteractiveStars()}
            <textarea 
              placeholder="اكتب تقييمك..." 
              className="modal-textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <button className="modal-submit-btn" onClick={() => {
              if (selectedRating === 0 || reviewText.trim() === "") {
                alert("من فضلك أكمل التقييم");
              } else {
                alert("تم إرسال تقييمك بنجاح");
                handleCloseModals(); 
              }
            }}>إرسال</button>
          </div>
        </div>
      )}

      {showComplainModal && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="zoom-in">
            <button className="close-modal" onClick={handleCloseModals}><FaTimes /></button>
            <h3>قدم شكوتك</h3>
            <textarea 
              placeholder="اكتب شكوتك هنا..." 
              className="modal-textarea"
              value={complainText}
              onChange={(e) => setComplainText(e.target.value)}
            ></textarea>
            <button className="modal-submit-btn" onClick={() => {
              if (complainText.trim() === "") {
                alert("من فضلك اكتب نص الشكوى أولاً");
              } else {
                alert("تم إرسال الشكوى بنجاح");
                handleCloseModals();
              }
            }}>إرسال</button>
          </div>
        </div>
      )}

      {activeTab === 'edit' && (
        <div className="edit-details-card" data-aos="fade-left">
            <div className="edit-nav-tab">التفاصيل شخصية</div>
            <h3 className="form-title">البيانات الشخصية</h3>
            <form className="personal-data-form" onSubmit={handleSavePersonalData}>
                
                <div className="input-group-wrapper">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="البريد الالكتروني" 
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className="input-group-wrapper">
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="رقم الهاتف" 
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>

                <div className="input-group-wrapper">
                  <input 
                    type="text" 
                    name="city"
                    placeholder="المحافظة" 
                    className={`form-input ${errors.city ? 'input-error' : ''}`}
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && <span className="error-msg">{errors.city}</span>}
                </div>
                
                <div className="input-group-wrapper password-wrapper">
                  <input 
                    type={showPass ? "text" : "password"} 
                    name="password"
                    placeholder="كلمه السر" 
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.password && <span className="error-msg">{errors.password}</span>}
                </div>

                <div className="input-group-wrapper password-wrapper">
                  <input 
                    type={showNewPass ? "text" : "password"} 
                    name="newPassword"
                    placeholder="كلمة السر الجديدة" 
                    className={`form-input ${errors.newPassword ? 'input-error' : ''}`}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                  <span className="eye-icon" onClick={() => setShowNewPass(!showNewPass)}>
                    {showNewPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.newPassword && <span className="error-msg">{errors.newPassword}</span>}
                </div>

                <div className="input-group-wrapper password-wrapper">
                  <input 
                    type={showConfirmPass ? "text" : "password"} 
                    name="confirmPassword"
                    placeholder="تأكيد كلمة السر" 
                    className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <span className="eye-icon" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                    {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
                </div>
                
                <div className="form-buttons">
                    <button type="submit" className="btn-save">حفظ</button>
                    <button type="button" className="btn-cancel" onClick={() => setActiveTab('about')}>إلغاء</button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};

export default ClientProfile;