import React, { useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CompanyProfile.css";

import {
  MdModeEdit,
  MdPhotoCamera,
} from "react-icons/md";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaTasks,
  FaBriefcase,
  FaShieldAlt,
  FaStar,
  FaBuilding,
  FaCogs,
  FaUserCheck,
  FaTools,
} from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

const reviews = [
  { id: 1, rating: 0, name: "أحمد محمد", text: "خدمة ممتازة جدًا والتعامل محترم ." },
  { id: 2, rating: 0, name: "سارة علي", text: "من الشركات المميزة فعلا في المجال." },
  { id: 3, rating: 0, name: "محمد خالد", text: "أفضل شركة مقاولات تعاملت معها بصراحة." },
];

const totalRatings = reviews.length;
const avgRating =
  reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

/* ================= EDIT PROFILE COMPONENT ================= */
function ProfileSection({ setEditMode, setIsAccountActive, isAccountActive, setCompanyData, companyData }) {
  const [formData, setFormData] = useState({ ...companyData });
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [showCurrentPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    if (!formData.name || !nameRegex.test(formData.name)) newErrors.name = "يرجى إدخال اسم صحيح (حروف فقط)";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "يرجى إدخال بريد إلكتروني صحيح ومكتمل";
    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = "يجب أن يكون 11 رقم ويبدأ بـ 010, 011, 012, أو 015";
    if (newPassword && newPassword !== confirmPassword) newErrors.confirmPassword = "كلمة السر غير متطابقة";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      setCompanyData(formData);
      setIsAccountActive(true);
      setEditMode("profile");
    }
  };

  return (
    <div className="edit-form-container">
      <h2>{isAccountActive ? "تعديل ملف الشركة" : "إكمال بيانات الشركة"}</h2>
      <form className="edit-profile-form" onSubmit={handleSave}>
        <div className="form-group">
          <h3>بيانات الشركة</h3>
          <input name="name" placeholder="اسم الشركة" value={formData.name} onChange={handleInputChange} />
          {errors.name && <p style={{color: 'red', fontSize: '12px'}}>{errors.name}</p>}
          <input name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleInputChange} />
          {errors.email && <p style={{color: 'red', fontSize: '12px'}}>{errors.email}</p>}
          <input name="phone" placeholder="رقم الهاتف" value={formData.phone} maxLength={11} onChange={handleInputChange} />
          {errors.phone && <p style={{color: 'red', fontSize: '12px'}}>{errors.phone}</p>}
        </div>

        <div className="form-group">
          <h3>البيانات الأساسية</h3>
          <input name="about" placeholder="عن الشركة" value={formData.about} onChange={handleInputChange} />
          <input name="experience" placeholder="سنوات الخبرة" value={formData.experience} onChange={handleInputChange} />
          <input name="governorate" placeholder="المحافظة" value={formData.governorate} onChange={handleInputChange} />
          <input name="services" placeholder="الخدمات" value={formData.services} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <h3>معلومات العمل</h3>
          <input name="scope" placeholder="نطاق الخدمة" value={formData.scope} onChange={handleInputChange} />
          <input name="hours" placeholder="مواعيد العمل" value={formData.hours} onChange={handleInputChange} />
          <input name="responseTime" placeholder="سرعة الاستجابة" value={formData.responseTime} onChange={handleInputChange} />
          <select name="emergency" className="custom-select" value={formData.emergency} onChange={handleInputChange}>
            <option value="" disabled hidden>خدمة الطوارئ</option>
            <option value="available">متاحة</option>
            <option value="unavailable">غير متاحة</option>
          </select>
        </div>

        <div className="form-group password">
          <h3>تغيير كلمة السر</h3>
          <div className="password-field">
            <input type={showCurrentPassword ? "text" : "password"} placeholder="كلمة السر الحالية" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className="password-eye" onClick={() => setShowPassword(!showCurrentPassword)}>{showCurrentPassword ? <FiEye /> : <FiEyeOff />}</span>
          </div>
          <div className="password-field">
            <input type={showNewPassword ? "text" : "password"} placeholder="كلمة السر الجديدة" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <span className="password-eye" onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? <FiEye /> : <FiEyeOff />}</span>
          </div>
          <div className="password-field">
            <input type={showConfirmPassword ? "text" : "password"} placeholder="تأكيد كلمة السر" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <span className="password-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FiEye /> : <FiEyeOff />}</span>
            {errors.confirmPassword && <p style={{color: 'red', fontSize: '12px'}}>{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="form-btns">
          <button type="submit" className="save-btn">حفظ</button>
          <button type="button" className="edit-cancel-btn" onClick={() => setEditMode("profile")}>إلغاء</button>
        </div>
      </form>
    </div>
  );
}

/* ================= REQUEST MODAL COMPONENT ================= */
function RequestServiceModal({ companyName, onClose }) {
  const today = new Date().toISOString().split('T')[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const egyptianGovernorates = ["القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "دمياط", "بني سويف", "بورسعيد", "جنوب سيناء", "حلايب وشلاتين", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "شمال سيناء", "سوهاج"];
  const filteredGovs = egyptianGovernorates.filter(gov => gov.includes(searchTerm));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {showSuccessMsg ? (
          <div className="success-toast-container"><div className="success-icon">✓</div><p>تم إرسال طلبك بنجاح</p></div>
        ) : (
          <>
            <h2 className="modal-title">طلب خدمة من {companyName}</h2>
            <form className="request-form" onSubmit={(e) => {e.preventDefault(); setShowSuccessMsg(true); setTimeout(() => {setShowSuccessMsg(false); onClose();}, 1500);}}>
              <div className="form-group-modal"><label>اسم العميل</label><input type="text" placeholder="أدخل اسمك" required /></div>
              <div className="form-group-modal custom-select-container">
                <label>المحافظة</label>
                <input type="text" placeholder="المحافظة" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setIsOpen(true);}} onFocus={() => setIsOpen(true)} required />
                {isOpen && filteredGovs.length > 0 && (
                  <ul className="gov-dropdown-list">
                    {filteredGovs.map((gov, index) => (<li key={index} onClick={() => {setSearchTerm(gov); setIsOpen(false);}}>{gov}</li>))}
                  </ul>
                )}
              </div>
              <div className="form-group-modal"><label>العنوان</label><input type="text" placeholder="العنوان بالتفصيل" required /></div>
              <div className="form-group-modal"><label>تاريخ الطلب</label><input type="date" value={today} readOnly className="readonly-input" /></div>
              <div className="modal-btns"><button type="submit" className="confirm-btn">إرسال الطلب</button><button type="button" className="cancel-btn" onClick={onClose}>إلغاء</button></div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isAccountActive, setIsAccountActive] = useState(false); 
  const [companyData, setCompanyData] = useState({
    name: "شركة أبناء سيناء",
    about: "شركة أبناء سيناء للتجارة والمقاولات العامة من الشركات العريقة في مجال التجارة والتشييد والبناء، وصُنفت بكونها أفضل شركة مقاولات عامة، ويرجع السبب إلى المميزات التي تتمتع بها الشركة بالإضافة إلى مجموعة الخدمات التي تتولى الشركة أمر تنفيذها بأعلى دقة.",
    email: "", phone: "", governorate: "القاهرة", experience: "16 سنة", scope: "داخل القاهرة والجيزة", hours: "من 9 صباحًا إلى 10 مساءً", responseTime: "خلال 30 دقيقة", emergency: "available", services: ""
  });

  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "profile") {
        setProfileImg(url);
      } else {
        setCoverImg(url);
      }
    }
  };

 
  const triggerCoverUpload = () => {
    if (coverInputRef.current) {
      coverInputRef.current.click();
    }
  };

  return (
    <div className="profile-container">
      {showRequestModal && <RequestServiceModal companyName={companyData.name} onClose={() => setShowRequestModal(false)} />}

      {/* COVER SECTION */}
      <div className="cover-container" style={{ backgroundColor: coverImg ? 'transparent' : '#f0f2f5', height: '250px', position: 'relative' }}>
        {coverImg && <img src={coverImg} alt="cover" className="cover-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        
        {/* زر تعديل الغلاف */}
        {activeTab === "edit" && (
          <button 
            type="button"
            className="edit-cover-btn" 
            onClick={triggerCoverUpload}
            style={{ zIndex: 10 }}
          >
            <MdPhotoCamera /> تعديل صورة الغلاف
          </button>
        )}
        
       
        <input 
          type="file" 
          ref={coverInputRef} 
          style={{ display: "none" }} 
          onChange={(e) => handleImageUpload(e, "cover")} 
          accept="image/*" 
        />
        
        {isAccountActive && (
          <div className="buttons left">
            <button className="btn primary" onClick={() => setShowRequestModal(true)}>طلب خدمة</button>
            <button onClick={() => setActiveTab("edit")} className="btn-edit"><MdModeEdit /></button>
          </div>
        )}
        <div className="cover-overlay"></div>
      </div>

      {/* PROFILE HEADER */}
      <div className="profile-header" style={{ textAlign: 'center', marginTop: '-75px', position: 'relative', zIndex: '5' }}>
        <div style={{ position: 'relative', width: '190px', height: '190px', margin: '0 auto' }}>
          <div className="profile-img" style={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '5px solid #fff', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {profileImg ? <img src={profileImg} alt="profile" className="profile-img"  /> : <FaBuilding style={{ fontSize: '60px', color: '#ccc' }} />}
          </div>
          {activeTab === "edit" && (
            <div 
              onClick={() => profileInputRef.current.click()} 
              className="profile-camera-icon "
            >
              <MdPhotoCamera />
            </div>
          )}
        </div>
        <input type="file" ref={profileInputRef} style={{ display: "none" }} onChange={(e) => handleImageUpload(e, "profile")} accept="image/*" />
        <div className="profile-info" style={{ marginTop: '15px' }}>
          <h2>{companyData.name}</h2>
          <p>للتجارة والمقاولات العامة</p>
          {isAccountActive && <div className="rating"><div className="star-icon"><FaStar /><span>{avgRating.toFixed(1)}</span></div></div>}
        </div>
      </div>

      {/* RENDER TABS */}
      {!isAccountActive && activeTab !== "edit" ? (
        <div className="activation-required-section">
          <div className="activation-content">
            <FaUserCheck className="activation-icon" />
            <h3>أهلاً بك في منصتنا <img src="/images/hand.svg" alt="hand" style={{ width: '50px' }}/></h3>
            <p className="no-wrap-text">يرجى إكمال تفعيل حسابك وإضافة بيانات الشركة لتظهر للعملاء بشكل احترافي.</p>
            <button className="activate-btn" onClick={() => setActiveTab("edit")}>فعل حسابك الآن</button>
          </div>
        </div>
      ) : activeTab === "profile" ? (
        <div>
          <div className="stats-box">
            <div className="stat"><div className="icon-circle blue"><FaCalendarAlt /></div><span>2026</span><p>تاريخ الانضمام</p></div>
            <div className="stat"><div className="icon-circle green"><FaTasks /></div><span>0</span><p>عدد الطلبات</p></div>
            <div className="stat"><div className="icon-circle purple"><FaMapMarkerAlt /></div><span>{companyData.governorate}</span><p>الموقع</p></div>
            <div className="stat"><div className="icon-circle orange"><FaBriefcase /></div><span>{companyData.experience}</span><p>سنوات الخبرة</p></div>
          </div>
          <div className="section-divider"></div>
          <div className="about-section"><div className="about-text"><h3 className="section-title"><FaBuilding className="title-icon" /> عن الشركة</h3><p className="section-p">{companyData.about}</p></div></div>
          <div className="section-divider"></div>
          <div className="section work-info">
            <h3 className="section-title"><FaBriefcase className="title-icon" /> معلومات العمل</h3>
            <div className="work-grid">
              <div className="work-item"><span className="label"><FaMapMarkerAlt /> نطاق الخدمة</span><p>{companyData.scope}</p></div>
              <div className="work-item"><span className="label"><FaClock /> مواعيد العمل</span><p>{companyData.hours}</p></div>
              <div className="work-item"><span className="label"><FaTasks /> سرعة الاستجابة</span><p>{companyData.responseTime}</p></div>
              <div className="work-item"><span className="label"><FaShieldAlt /> خدمة الطوارئ</span><p>{companyData.emergency === "available" ? "متاحة 24 ساعة" : "غير متاحة"}</p></div>
            </div>
          </div>
          <div className="section-divider"></div>
          <div className="section"><h3 className="section-title"><FaCogs className="title-icon" /> الخدمات الأساسية للشركة</h3>
            <div className="services">
              <div className="service-card"><div className="icon-circle blue"><FaBuilding /></div><h4>المقاولات العامة</h4><p>تنفيذ كافة المشروعات السكنية والتجارية بأعلى جودة</p></div>
              <div className="service-card"><div className="icon-circle green"><FaTools /></div><h4>أعمال التشطيبات</h4><p>تشطيبات داخلية وخارجية عصرية تناسب جميع الأذواق</p></div>
              <div className="service-card"><div className="icon-circle purple"><FaTasks /></div><h4>إدارة المشروعات</h4><p>إشراف هندسي متكامل وجدول زمني دقيق للتنفيذ</p></div>
              <div className="service-card"><div className="icon-circle orange"><FaShieldAlt /></div><h4>أعمال الترميم</h4><p>ترميم وتدعيم المباني القديمة بأحدث الوسائل التقنية</p></div>
            </div>
          </div>
          <div className="section-divider"></div>
          <div className="section reviews-section">
            <div className="reviews-header"><h3 className="section-title"><FaStar className="title-icon" /> تقييمات العملاء</h3></div>
            <div className="reviews">{reviews.map(r => (<div className="review-card" key={r.id}><div className="user"><div className="avatar">{r.name[0]}</div><div><h4>{r.name}</h4><FaStar className="stars" /> {r.rating.toFixed(1)}</div></div><p>{r.text}</p></div>))}</div>
          </div>
        </div>
      ) : (
        <ProfileSection setEditMode={setActiveTab} setIsAccountActive={setIsAccountActive} isAccountActive={isAccountActive} setCompanyData={setCompanyData} companyData={companyData} />
      )}
    </div>
  );
}