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
  FaTruck,
  FaShieldAlt,
  FaBoxOpen,
  FaTools,
  FaStar,
  FaBuilding,
  FaCogs,
} from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

const reviews = [
  { id: 1, rating: 0 },
  { id: 2, rating: 0 },
  { id: 3, rating: 0 },
  { id: 4, rating: 0 },
  { id: 5, rating: 0 },
];

const totalRatings = reviews.length;
const avgRating =
  reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

/* ================= EDIT PROFILE COMPONENT ================= */
function ProfileSection({ setEditMode }) {
  const [password, setPassword] = useState("");
  const [showCurrentPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordsNotMatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="edit-form-container">
      <h2>تعديل ملف الشركة</h2>
      <form className="edit-profile-form">
        <div className="form-group">
          <h3>بيانات الشركة</h3>
          <input placeholder="اسم الشركة" />
          <input placeholder="البريد الإلكتروني" />
          <input placeholder="رقم الهاتف" />
        </div>

        <div className="form-group">
          <h3>البيانات الأساسية</h3>
          <input placeholder="عن الشركة" />
          <input placeholder="سنوات الخبرة" />
          <input placeholder="المحافظة" />
          <input placeholder="الخدمات" />
        </div>

       
        <div className="form-group">
          <h3>معلومات العمل</h3>
          <input placeholder="نطاق الخدمة" />
          <input placeholder="مواعيد العمل" />
          <input placeholder="سرعة الاستجابة" />
          <select className="custom-select">
            <option value="" disabled selected hidden>خدمة الطوارئ</option>
            <option value="available">متاحة</option>
            <option value="available">غير متاحة</option>
          </select>
        </div>

        <div className="form-group password">
          <h3>تغيير كلمة السر</h3>
          <div className="password-field">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="كلمة السر الحالية"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-eye" onClick={() => setShowPassword(!showCurrentPassword)}>
              {showCurrentPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
          <div className="password-field">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="كلمة السر الجديدة"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span className="password-eye" onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="تأكيد كلمة السر"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="password-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
            </span>
            {passwordsNotMatch && <p className="error-msg">كلمة السر غير متطابقة</p>}
          </div>
        </div>

        <div className="form-btns">
          <button type="submit" className="save-btn">حفظ</button>
          <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>إلغاء</button>
        </div>
      </form>
    </div>
  );
}

/* ================= REQUEST MODAL COMPONENT ================= */
const egyptianGovernorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "دمياط", "بني سويف", "بورسعيد", "جنوب سيناء", "حلايب وشلاتين", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "شمال سيناء", "سوهاج"
];

function RequestServiceModal({ companyName, onClose }) {
  const today = new Date().toISOString().split('T')[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const filteredGovs = egyptianGovernorates.filter(gov => gov.includes(searchTerm));

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMsg(true);
    setTimeout(() => {
      setShowSuccessMsg(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {showSuccessMsg ? (
          <div className="success-toast-container">
            <div className="success-icon">✓</div>
            <p>تم إرسال طلبك بنجاح</p>
          </div>
        ) : (
          <>
            <h2 className="modal-title"> {companyName}</h2>
            <form className="request-form" onSubmit={handleSubmit}>
              <div className="form-group-modal">
                <label>اسم العميل</label>
                <input type="text" placeholder="أدخل اسمك" required />
              </div>
              <div className="form-group-modal custom-select-container">
                <label>المحافظة</label>
                <input 
                  type="text" placeholder="المحافظة" value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value); setIsOpen(true);}}
                  onFocus={() => setIsOpen(true)} required
                />
                {isOpen && filteredGovs.length > 0 && (
                  <ul className="gov-dropdown-list">
                    {filteredGovs.map((gov, index) => (
                      <li key={index} onClick={() => {setSearchTerm(gov); setIsOpen(false);}}>
                        {gov}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="form-group-modal">
                <label>العنوان</label>
                <input type="text" placeholder="العنوان بالتفصيل" required />
              </div>
              <div className="form-group-modal">
                <label>تاريخ الطلب</label>
                <input type="date" value={today} readOnly className="readonly-input" />
              </div>
              <div className="modal-btns">
                <button type="submit" className="confirm-btn">إرسال الطلب</button>
                <button type="button" className="cancel-btn" onClick={onClose}>إلغاء</button>
                <button type="button" className="close-btn" onClick={onClose}>×</button>
              </div>
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
  const companyName = "شركة أبناء سيناء";

  const [profileImg, setProfileImg] = useState("/images/companylogo.jpg");
  const [coverImg, setCoverImg] = useState("/images/companycover.jpg");

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "profile") setProfileImg(url);
      else setCoverImg(url);
    }
  };

  return (
    <div className="profile-container">
      {showRequestModal && (
        <RequestServiceModal companyName={companyName} onClose={() => setShowRequestModal(false)} />
      )}

      {/* COVER */}
      <div className="cover-container">
        <img src={coverImg} alt="cover" className="cover-img" />
        
        {activeTab === "edit" && (
          <button className="edit-cover-btn" onClick={() => coverInputRef.current.click()}>
            <MdPhotoCamera /> تعديل صورة الغلاف
          </button>
        )}
        <input 
          type="file" ref={coverInputRef} style={{ display: "none" }} 
          onChange={(e) => handleImageUpload(e, "cover")} accept="image/*" 
        />

        <div className="buttons left">
          <button className="btn primary" onClick={() => setShowRequestModal(true)}>طلب خدمة</button>
          <button onClick={() => setActiveTab("edit")} className="btn-edit">
            <MdModeEdit />
          </button>
        </div>
        <div className="cover-overlay"></div>
      </div>

      <div className="profile-header">
        <div className="profile-img-container">
          <img src={profileImg} alt="profile" className="profile-img" />
          {activeTab === "edit" && (
            <div className="profile-camera-icon" onClick={() => profileInputRef.current.click()}>
              <MdPhotoCamera />
            </div>
          )}
          <input 
            type="file" ref={profileInputRef} style={{ display: "none" }} 
            onChange={(e) => handleImageUpload(e, "profile")} accept="image/*" 
          />
        </div>
        
        <div className="profile-info">
          <h2>{companyName}</h2>
          <p>للتجارة والمقاولات العامة</p>
          <div className="rating">
            <div className="star-icon">
              <FaStar />
              <span>{avgRating.toFixed(1)}</span>
            </div>
          </div>

          
        </div>
      </div>

      {activeTab === "profile" ? (
        <div>
          {/* STATS */}
          <div className="stats-box">
            <div className="stat">
              <div className="icon-circle blue"><FaCalendarAlt /></div>
              <span>2026</span>
              <p>تاريخ الانضمام</p>
            </div>
            <div className="stat">
              <div className="icon-circle green"><FaTasks /></div>
              <span>0</span>
              <p>عدد الطلبات</p>
            </div>
            <div className="stat">
              <div className="icon-circle purple"><FaMapMarkerAlt /></div>
              <span>القاهرة</span>
              <p>الموقع</p>
            </div>
            <div className="stat">
              <div className="icon-circle orange"><FaBriefcase /></div>
              <span>16 سنة</span>
              <p>سنوات الخبرة</p>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* ABOUT */}
          <div className="about-section">
            <div className="about-text">
              <h3 className="section-title"><FaBuilding className="title-icon" /> عن الشركة</h3>
              <p className="section-p">
                شركة أبناء سيناء للتجارة والمقاولات العامة من الشركات العريقة في مجال التجارة والتشييد والبناء،<br /> 
                وصُنفت بكونها أفضل شركة مقاولات عامة، ويرجع السبب إلى المميزات التي تتمتع بها الشركة<br /> 
                بالإضافة إلى مجموعة الخدمات التي تتولى الشركة أمر تنفيذها بأعلى دقة،<br /> 
                وتُعد هذه الشركة من أقدم الشركات في هذا المجال، إليكم الكثير من التفاصيل حولها.
              </p>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* WORK INFO */}
          <div className="section work-info">
            <h3 className="section-title"><FaBriefcase className="title-icon" /> معلومات العمل</h3>
            <div className="work-grid">
              <div className="work-item">
                <span className="label"><FaMapMarkerAlt className="label-icon" /> نطاق الخدمة</span>
                <p>داخل القاهرة والجيزة</p>
              </div>
              <div className="work-item">
                <span className="label"><FaClock className="label-icon" /> مواعيد العمل</span>
                <p>من 9 صباحًا إلى 10 مساءً</p>
              </div>
              <div className="work-item">
                <span className="label"><FaTasks className="label-icon" /> سرعة الاستجابة</span>
                <p>خلال 30 دقيقة</p>
              </div>
              <div className="work-item">
                <span className="label"><FaShieldAlt className="label-icon" /> خدمة الطوارئ</span>
                <p>متاحة 24 ساعة</p>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* Services */}
          <div className="section">
  <h3 className="section-title">
    <FaCogs className="title-icon" />
    الخدمات الأساسية للشركة
  </h3>
  <div className="services">
    <div className="service-card">
      <div className="icon-circle blue">
        <FaBuilding />
      </div>
      <h4>المقاولات العامة</h4>
      <p>تنفيذ كافة المشروعات السكنية والتجارية بأعلى جودة</p>
    </div>

    <div className="service-card">
      <div className="icon-circle green">
        <FaTools />
      </div>
      <h4>أعمال التشطيبات</h4>
      <p>تشطيبات داخلية وخارجية عصرية تناسب جميع الأذواق</p>
    </div>

    <div className="service-card">
      <div className="icon-circle purple">
        <FaTasks />
      </div>
      <h4>إدارة المشروعات</h4>
      <p>إشراف هندسي متكامل وجدول زمني دقيق للتنفيذ</p>
    </div>

    <div className="service-card">
      <div className="icon-circle orange">
        <FaShieldAlt />
      </div>
      <h4>أعمال الترميم</h4>
      <p>ترميم وتدعيم المباني القديمة بأحدث الوسائل التقنية</p>
    </div>
  </div>
</div>

          <div className="section-divider"></div>

          {/* REVIEWS */}
          <div className="section reviews-section">
            <div className="reviews-header">
              <h3 className="section-title"><FaStar className="title-icon" /> تقييمات العملاء</h3>
            </div>
            <div className="reviews">
              <div className="review-card">
                <div className="user">
                  <div className="avatar">أ</div>
                  <div>
                    <h4>أحمد محمد</h4>
                    <FaStar className="stars" /> {avgRating.toFixed(1)}
                  </div>
                </div>
                <p>خدمة ممتازة جدًا والتعامل محترم .</p>
              </div>
              <div className="review-card">
                <div className="user">
                  <div className="avatar">س</div>
                  <div>
                    <h4>سارة علي</h4>
                    <FaStar className="stars" /> {avgRating.toFixed(1)}
                  </div>
                </div>
                <p>من الشركات المميزة فعلا في المجال.</p>
              </div>
              <div className="review-card">
                <div className="user">
                  <div className="avatar">م</div>
                  <div>
                    <h4>محمد خالد</h4>
                    <FaStar className="stars" /> {avgRating.toFixed(1)}
                  </div>
                </div>
                <p>أفضل شركة مقاولات تعاملت معها بصراحة.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProfileSection setEditMode={() => setActiveTab("profile")} />
      )}
    </div>
  );
}