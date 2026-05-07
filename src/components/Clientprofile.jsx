import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ClientProfile.css';
import { 
  FaStar, FaStarHalfAlt, FaRegStar, FaEdit, 
<<<<<<< HEAD
  FaExclamationTriangle, FaTimes, FaEye, FaEyeSlash, FaCamera 
=======
  FaExclamationTriangle, FaTimes, FaEye, FaEyeSlash, FaTrashAlt 
>>>>>>> 701e9b000554ed5ae146289a1511b3fee675e870
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ClientProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [clientData, setClientData] = useState(null);

  const [showRateModal, setShowRateModal] = useState(false);
  const [showComplainModal, setShowComplainModal] = useState(false);
<<<<<<< HEAD
  const [showEditReviewModal, setShowEditReviewModal] = useState(false); 
  
=======
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); 
  const [showDeleteToast, setShowDeleteToast] = useState(false); 

>>>>>>> 701e9b000554ed5ae146289a1511b3fee675e870
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [complainText, setComplainText] = useState("");
  const [editReviewText, setEditReviewText] = useState(""); 

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [visibleHistory, setVisibleHistory] = useState(4);
  const [visibleReviews, setVisibleReviews] = useState(4);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000 });
    loadClientData();
  }, [id]);

  const loadClientData = () => {
    const savedCustomers = JSON.parse(localStorage.getItem('sharedCustomers')) || [];
    const foundClient = savedCustomers.find(c => c.id === Number(id));

    if (foundClient) {
      setClientData(foundClient);
      setFormData({
        name: foundClient.name || '',
        email: foundClient.email || '',
        phone: foundClient.phone || '',
        city: foundClient.location || '',
        password: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedClient = { ...clientData, [type]: reader.result };
        setClientData(updatedClient);
        
        const savedCustomers = JSON.parse(localStorage.getItem('sharedCustomers')) || [];
        const updatedList = savedCustomers.map(c => c.id === Number(id) ? updatedClient : c);
        localStorage.setItem('sharedCustomers', JSON.stringify(updatedList));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePersonalData = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) newErrors.name = "يرجى إدخال الاسم";
    if (!formData.email) newErrors.email = "ادخل البريد الالكتروني";
    if (!formData.phone) newErrors.phone = "ادخل رقم الهاتف";
    if (!formData.city) newErrors.city = "ادخل المحافظه";

<<<<<<< HEAD
    const savedCustomers = JSON.parse(localStorage.getItem('sharedCustomers')) || [];
    const isNameTaken = savedCustomers.some(c => c.name === formData.name && c.id !== Number(id));
    if (isNameTaken) newErrors.name = "هذا الاسم موجود بالفعل";
    const isEmailTaken = savedCustomers.some(c => c.email === formData.email && c.id !== Number(id));
    if (isEmailTaken) newErrors.email = "هذا البريد الإلكتروني مستخدم من قبل";
    const isPhoneTaken = savedCustomers.some(c => c.phone === formData.phone && c.id !== Number(id));
    if (isPhoneTaken) newErrors.phone = "رقم الهاتف هذا مسجل مسبقاً";
=======

    if (!formData.email) {
      newErrors.email = "ادخل البريد الالكتروني";
    } else if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "البريد الإلكتروني يجب أن ينتهي بـ @gmail.com";
    }

    if (!formData.phone) {
      newErrors.phone = "ادخل رقم الهاتف";
    } else if (formData.phone.length !== 11) {
      newErrors.phone = "رقم الهاتف يجب أن يكون 11 رقم";
    }

  
    if (!formData.city) {
      newErrors.city = "ادخل المحافظة";
    }

    if (!formData.password) {
      newErrors.password = "ادخل كلمة السر";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "ادخل كلمة السر الجديدة";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "ادخل التاكيد";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "كلمة السر غير صحيحة";
    }
>>>>>>> 701e9b000554ed5ae146289a1511b3fee675e870

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const updatedClient = { 
        ...clientData, 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone, 
        location: formData.city 
      };
      const updatedList = savedCustomers.map(c => c.id === Number(id) ? updatedClient : c);
      localStorage.setItem('sharedCustomers', JSON.stringify(updatedList));
      setClientData(updatedClient);
      alert("تم تحديث البيانات بنجاح");
      setActiveTab('about'); 
    }
  };

<<<<<<< HEAD
=======
 
  const confirmDeleteAccount = () => {
    setShowDeleteConfirm(false);
    setShowDeleteToast(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

>>>>>>> 701e9b000554ed5ae146289a1511b3fee675e870
  const reviews = [
    { id: 1, name: "احمد علي", job: "سباك", date: "15/2/2025", rating: 5, img: "/images/Client profile/icon1.svg" },
    { id: 2, name: "محمد محمود", job: "كهربائي", date: "5/3/2025", rating: 5, img: "/images/Client profile/icon2.svg" },
    { id: 3, name: "شركة مكة", job: "شركة نقل", date: "1/5/2025", rating: 4, img: "/images/Client profile/icon3.svg" },
    { id: 4, name: "علي محمود", job: "فني كاميرات", date: "1/5/2025", rating: 4, img: "/images/Client profile/icon1.svg" },
    { id: 5, name: "سامح حسن", job: "نجار", date: "10/5/2025", rating: 5, img: "/images/Client profile/icon2.svg" },
  ];

  const historyData = [
    { id: 1, name: "احمد علي", job: "سباك", icon: "/images/Client profile/Client icon1.svg" }, 
    { id: 2, name: "محمد محمود", job: "كهربائي", icon: "/images/Client profile/Client icon2.svg" },
    { id: 3, name: "شركة مكة", job: "شركة نقل", icon: "/images/Client profile/Client icon3.svg" },
    { id: 4, name: "علي محمود", job: "فني كاميرات", icon: "/images/Client profile/Client icon4.svg" },
    { id: 5, name: "ياسر محمد", job: "نقاش", icon: "/images/Client profile/Client icon1.svg" },
  ];

  const handleCloseModals = () => {
    setShowRateModal(false);
    setShowComplainModal(false);
<<<<<<< HEAD
    setShowEditReviewModal(false);
=======
    setShowDeleteConfirm(false);
>>>>>>> 701e9b000554ed5ae146289a1511b3fee675e870
    setSelectedRating(0);
    setReviewText("");
    setComplainText("");
    setEditReviewText("");
  };

  if (!clientData) return <div style={{padding: "100px", textAlign: "center"}}><h2>جاري تحميل بيانات العميل...</h2></div>;

  return (
    <div className="profile-container">
<<<<<<< HEAD
      <header className="profile-header" style={{ backgroundImage: `url(${clientData.cover || '/images/Client profile/hero.svg'})` }}>
         <label className="edit-cover-btn">
            <FaCamera />
            <span>تعديل صورة الغلاف</span>
            <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, 'cover')} />
         </label>
      </header>

      <div className="profile-identity-wrapper" data-aos="fade-left">
        <div className="identity-content">
          <div className="avatar-container">
            <img src={clientData.img || clientData.avatar || "/images/Client profile/Virtual.jpeg"} alt={clientData.name} className="main-avatar" onError={(e) => { e.target.src = "/images/Client profile/Virtual.jpeg"; }} />
            <label className="edit-avatar-badge">
              <FaCamera />
              <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, 'img')} />
            </label>
          </div>
          <div className="name-verify-block">
            <h2 className="client-name">
              {clientData.name}
              <img src="/images/Client profile/profilelogo1.svg" alt="Verified" className="verify-tick" />
              <img src="/images/Client profile/profilelogo2.svg" alt="Edit" className="edit-name-icon" onClick={() => setActiveTab('edit')} />
            </h2>
=======
      
      {showDeleteToast && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="success-toast-container" style={{ background: '#fff', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
            <div className="success-icon" style={{ backgroundColor: '#ff6b6b', color: '#fff', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>✓</div>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>تم حذف الحساب بنجاح</p>
          </div>
        </div>
      )}

      <header className="profile-header" style={{ backgroundImage: `url('/images/Client profile/hero.svg')` }}>
      </header>

      <div className="profile-identity-wrapper" data-aos="fade-left">
        <div className="identity-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveTab('edit')}
                />
              </h2>
            </div>
>>>>>>> 701e9b000554ed5ae146289a1511b3fee675e870
          </div>

          
          {activeTab === 'edit' && (
            <button 
              type="button"
              className="btn-delete-white-area" 
              onClick={() => setShowDeleteConfirm(true)}
              style={{ 
                backgroundColor: '#ff6b6b', 
                color: '#fff', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontWeight: 'bold',
                fontSize: '18px',
                marginLeft: 'auto'
              }}
            >
              <FaTrashAlt /> حذف الحساب
            </button>
          )}
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
                {historyData.slice(0, visibleHistory).map((item) => (
                    <div key={item.id} className="history-item-row">
                        <div className="history-user-info">
                            <img src={item.icon} alt="icon" className="category-icon" />
                            <div className='user-text'><h4>{item.name}</h4><p>{item.job}</p></div>
                        </div>
                        <div className="history-rating-side">
                            <button className="small-rate-btn" onClick={() => setShowRateModal(true)}><span>تقييم </span><span>★★★</span></button>
                        </div>
                    </div>
                ))}
            </div>
            {visibleHistory < historyData.length && (
                <button className="show-more-arrow" onClick={() => setVisibleHistory(visibleHistory + 4)}>عرض المزيد ∨</button>
            )}
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
                      <div className="bar-track"><div className="bar-level" style={{ width: num === 5 ? '90%' : '5%' }}></div></div>
                    </div>
                  ))}
               </div>
               <div className="score-side"><span className="big-score">4.8</span><div className="stars-icons-rtl"><FaStarHalfAlt /><FaStar /><FaStar /><FaStar /><FaStar /></div></div>
            </div>
          </div>
          <div className="reviews-feed">
            {reviews.slice(0, visibleReviews).map((rev) => (
              <div key={rev.id} className="review-card-item">
                <div className="user-meta">
                  <img src={rev.img} alt={rev.name} />
                  <div className="user-text"><h4>{rev.name}</h4><p>{rev.job}</p></div>
                </div>
                <div className="review-status">
                  <span className="date-stamp">{rev.date}</span>
                  <div className="stars-group">{[...Array(5)].map((_, i) => (i < rev.rating ? <FaStar key={i} /> : <FaRegStar key={i} />))}</div>
                </div>
                <div className="review-btns">
                  <button className="btn-edit-rev" onClick={() => setShowEditReviewModal(true)}><FaEdit /> تعديل</button>
                  <button className="btn-complain" onClick={() => setShowComplainModal(true)}><FaExclamationTriangle /> شكوي</button>
                </div>
              </div>
            ))}
          </div>
          {visibleReviews < reviews.length && <button className="load-more" onClick={() => setVisibleReviews(reviews.length)}>عرض كل التقييمات ↓</button>}
        </div>
      )}

      {activeTab === 'edit' && (
        <div className="edit-details-card" data-aos="fade-left">
            <div className="edit-nav-tab">التفاصيل شخصية</div>
            <h3 className="form-title">البيانات الشخصية</h3>
            <form className="personal-data-form" onSubmit={handleSavePersonalData}>
                <div className="input-group-wrapper">
                  <input type="text" name="name" placeholder="الاسم الكامل" className="form-input" value={formData.name} onChange={handleInputChange} />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
                <div className="input-group-wrapper">
                  <input type="email" name="email" placeholder="البريد الالكتروني" className="form-input" value={formData.email} onChange={handleInputChange} />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
                <div className="input-group-wrapper">
                  <input type="tel" name="phone" placeholder="رقم الهاتف" className="form-input" value={formData.phone} onChange={handleInputChange} />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
                <div className="input-group-wrapper">
                  <input type="text" name="city" placeholder="المحافظة" className="form-input" value={formData.city} onChange={handleInputChange} />
                  {errors.city && <span className="error-msg">{errors.city}</span>}
                </div>
                <div className="input-group-wrapper password-wrapper">
                  <input type={showPass ? "text" : "password"} name="password" placeholder="كلمه السر الحالية" className="form-input" value={formData.password} onChange={handleInputChange} />
                  <span className="eye-icon" onClick={() => setShowPass(!showPass)}>{showPass ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
                <div className="form-buttons"><button type="submit" className="btn-save">حفظ</button><button type="button" className="btn-cancel" onClick={() => setActiveTab('about')}>إلغاء</button></div>
            </form>
        </div>
      )}

      {showRateModal && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="zoom-in">
            <button className="close-modal" onClick={handleCloseModals}><FaTimes /></button>
            <h3>قيم الخدمة</h3>
            <div className="interactive-stars-row">
              {[1, 2, 3, 4, 5].map((star) => (<FaStar key={star} className={star <= selectedRating ? "star-active" : "star-inactive"} onClick={() => setSelectedRating(star)} />))}
            </div>
            <textarea placeholder="اكتب تقييمك..." className="modal-textarea" value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
            <button className="modal-submit-btn" onClick={() => { if(selectedRating && reviewText) { alert("تم التقييم"); handleCloseModals(); } else alert("أكمل التقييم") }}>إرسال</button>
          </div>
        </div>
      )}

      {showEditReviewModal && (
        <div className="modal-overlay">
          <div className="modal-content edit-review-modal" data-aos="zoom-in">
            <button className="close-modal" onClick={handleCloseModals}><FaTimes /></button>
            <h3 className="modal-title-custom">عدل تقييمك.</h3>
            <textarea 
              placeholder="اكتب هنا..." 
              className="modal-textarea-custom"
              value={editReviewText}
              onChange={(e) => setEditReviewText(e.target.value)}
            ></textarea>
            <button className="modal-submit-btn-custom" onClick={() => {
              if (editReviewText.trim() === "") alert("من فضلك اكتب نص التقييم");
              else { alert("تم تعديل التقييم بنجاح"); handleCloseModals(); }
            }}>إرسال</button>
          </div>
        </div>
      )}

      {showComplainModal && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="zoom-in">
            <button className="close-modal" onClick={handleCloseModals}><FaTimes /></button>
            <h3>قدم شكوتك</h3>
            <textarea placeholder="اكتب شكوتك هنا..." className="modal-textarea" value={complainText} onChange={(e) => setComplainText(e.target.value)}></textarea>
            <button className="modal-submit-btn" onClick={() => {
              if (complainText.trim() === "") alert("من فضلك اكتب نص الشكوى أولاً");
              else { alert("تم إرسال الشكوى بنجاح"); handleCloseModals(); }
            }}>إرسال</button>
          </div>
        </div>
      )}
<<<<<<< HEAD
=======

      {/* مودال تأكيد حذف الحساب */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', padding: '30px' }}>
            <h3 style={{ color: '#40798C', marginBottom: '15px' }}>تنبيه حذف الحساب</h3>
            <p style={{ color: '#666', marginBottom: '25px' }}>هل أنت متأكد من حذف الحساب نهائياً؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button 
                onClick={confirmDeleteAccount}
                style={{ backgroundColor: '#ff6b6b', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                نعم
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                style={{ backgroundColor: '#eaeaea', color: '#333', border: 'none', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                إلغاء
              </button>
            </div>
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
                    placeholder="كلمة السر" 
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <FaEye /> : < FaEyeSlash />}
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
                  <span className="eye-icon" onClick={() => setShowNewPassword(!showNewPass)}>
                    {showNewPass ? <FaEye /> : < FaEyeSlash />}
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
                    {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
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
>>>>>>> 701e9b000554ed5ae146289a1511b3fee675e870
    </div>
  );
};

export default ClientProfile;