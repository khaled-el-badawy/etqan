
import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CompanyProfile.css";

import {
  MdModeEdit,
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

const companiesData = [{}];

/* ================= PROFILE SECTION ================= */
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

          <select>
            <option>خدمة الطوارئ</option>
            <option>متاحة</option>
            <option>غير متاحة</option>
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

            <span className="password-eye"
              onClick={() => setShowPassword(!showCurrentPassword)}>
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

            <span className="password-eye"
              onClick={() => setShowNewPassword(!showNewPassword)}>
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

            <span className="password-eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
    {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
  </span>

  {passwordsNotMatch && (
    <p className="error-msg">كلمة السر غير متطابقة</p>
  )}
          </div>
          </div>

        <div className="form-btns">
          <button type="submit" className="save-btn">حفظ</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setEditMode(false)}
          >
            إلغاء
          </button>
        </div>

      </form>
    </div>
  );
}

/* ================= MAIN ================= */
export default function CompanyProfile() {
  const [showModal, setShowModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false); 
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="profile-container">

      {/* COVER */}
      <div className="cover-container">
       
        <img
          src="/images/companycover.jpg"
          alt="cover"
          className="cover-img"
        />
        <div className="buttons left">
           <button
  className="request-btn"
  onClick={() => setShowModal(true)}
>
  طلب خدمة
          </button>
          {showServiceModal && (
  <div
    className="modal-overlay"
    onClick={(e) => {
      if (e.target === e.currentTarget) setShowServiceModal(false);
    }}
  >
    <div className="modal-box">

      <button
        className="close-btn"
        onClick={() => setShowServiceModal(false)}
      >
        ×
      </button>

      <h3>طلب خدمة</h3>

      <input type="text" placeholder="اسم العميل" />

      <input type="text" placeholder="العنوان" />

      <input type="text" placeholder="المحافظة" />

      <input type="date" />

      <button className="submit-btn">
        إرسال
      </button>

    </div>
  </div>
)}
                <button onClick={() => setActiveTab("edit")} className="btn-edit">
                  <MdModeEdit />
                </button>
               
              </div>
        <div className="cover-overlay"></div>
      </div>

    

      {/* PROFILE */}
      {activeTab === "profile" && (
        <div>

          <div className="profile-header">
            <div className="profile-img-container">
              <img
                src="/images/companylogo.jpg"
                alt="profile"
                className="profile-img"
              />
              
            </div>

            <div className="profile-info">
              <h2>شركة أبناء سيناء</h2>
              <p>للتجارة والمقاولات العامة</p>

              <div className="rating">
                <div className="star-icon">
                <FaStar/>
                <span>
                    {avgRating.toFixed(1)}
                    
                    {/* ({totalRatings} تقييم) */}
                </span>
                </div>
                </div>

          
            </div>
          </div>
          {/* <div className="section-divider"></div> */}

          {/* STATS */}
          <div className=" stats-box">
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
              <span>43 سنة</span>
              <p>سنوات الخبرة</p>
            </div>
          </div>
<div className="section-divider"></div>
          {/* ABOUT */}
          
          <div className="about-section">

             <div className="about-text">
            <h3 className="section-title"><FaBuilding className="title-icon" /> عن الشركة</h3>
            
            
            <p className="section-p">
             شركة أبناء سيناء للتجارة والمقاولات العامة من الشركات العريقة في مجال التجارة والتشييد والبناء،<br/> وصُنفت بكونها أفضل شركة مقاولات عامة، ويرجع السبب إلى المميزات التي تتمتع بها الشركة<br/> بالإضافة إلى مجموعة الخدمات التي تتولى الشركة أمر تنفيذها بأعلى دقة،<br/> وتُعد هذه الشركة من أقدم الشركات في هذا المجال، إليكم الكثير من التفاصيل حولها.

            </p>
            </div>
    {/* <img
  src="/images/WhatsApp Image 2026-04-28 at 7.30.35 PM.jpeg"
  alt="construction"
              className="about-img" /> */}
          </div>
          
 <div className="section-divider"></div>
          {/* WORK INFO */}
<div className="section work-info">
  <h3 className="section-title">
    <FaBriefcase className="title-icon" />
    معلومات العمل
  </h3>

<div className="work-grid">

  <div className="work-item">
    <span className="label">
      <FaMapMarkerAlt className="label-icon" />
      نطاق الخدمة
    </span>
    <p>داخل القاهرة والجيزة</p>
  </div>

  <div className="work-item">
    <span className="label">
      <FaClock className="label-icon" />
      مواعيد العمل
    </span>
    <p>من 9 صباحًا إلى 10 مساءً</p>
  </div>

  <div className="work-item">
    <span className="label">
      <FaTasks className="label-icon" />
      سرعة الاستجابة
    </span>
    <p>خلال 30 دقيقة</p>
  </div>

  <div className="work-item">
    <span className="label">
      <FaShieldAlt className="label-icon" />
      خدمة الطوارئ
    </span>
    <p>متاحة 24 ساعة</p>
  </div>

            </div>
            </div>
          
 




       <div className="section-divider"></div>
               {/* Services */}
      <div className="section">
<h3 className="section-title">
  <FaCogs className="title-icon" />
  الخدمات الأساسية
</h3>
 <div className="services">
  <div className="service-card">
    <div className="icon-circle blue">
      <FaTruck />
    </div>
    <h4>نقل آمن وسريع</h4>
    <p>نقل الأثاث بأمان وفي الوقت المحدد</p>
  </div>

        <div className="service-card">
    <div className="icon-circle green">
      <FaShieldAlt />
    </div>
    <h4>ضمان على الأثاث</h4>
    <p>حماية كاملة ضد أي تلف</p>
  </div>

  <div className="service-card">
    <div className="icon-circle purple">
      <FaBoxOpen />
    </div>
    <h4>تغليف احترافي</h4>
    <p>أفضل مواد تغليف عالية الجودة</p>
  </div>

  <div className="service-card">
    <div className="icon-circle orange">
      <FaTools />
    </div>
    <h4>فك وتركيب</h4>
    <p>فريق متخصص للفك والتركيب</p>
  </div>
</div>
      </div>
<div className="section-divider"></div>
          {/* REVIEWS */}
 <div className="section reviews-section">

  <div className="reviews-header">
    <h3 className="section-title">
  <FaStar className="title-icon" />
  تقييمات العملاء
</h3>
  </div>

  <div className="reviews">

    <div className="review-card">
      <div className="user">
        <div className="avatar">أ</div>
        <div>
          <h4>أحمد محمد</h4>
                    <FaStar className="stars" />
                     {avgRating.toFixed(1)}
        </div>
      </div>
      <p>خدمة ممتازة جدًا والتعامل محترم والتسليم سريع.</p>
    </div>

    <div className="review-card">
      <div className="user">
        <div className="avatar">س</div>
        <div>
          <h4>سارة علي</h4>
                    <FaStar className="stars" />
                     {avgRating.toFixed(1)}
        </div>
      </div>
      <p>تغليف احترافي وحافظوا على كل حاجة بدون أي خدش.</p>
    </div>

    <div className="review-card">
      <div className="user">
        <div className="avatar">م</div>
        <div>
          <h4>محمد خالد</h4>
                    <FaStar className="stars" />
                     {avgRating.toFixed(1)}
        </div>
      </div>
      <p>أفضل شركة نقل تعاملت معها بصراحة.</p>
    </div>
            </div>
            </div>
  </div>
      )}

      {/* EDIT */}
      {activeTab === "edit" && (
        <ProfileSection setEditMode={() => setActiveTab("profile")} />
      )}
{showModal && (
  <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h1 style={{color:"red"}}>boooooox</h1>
      <h2>طلب خدمة</h2>

      <input placeholder="اسم العميل" />
      <input placeholder="العنوان" />

      <button
        className="btn primary"
        onClick={() => alert("تم الإرسال")}
      >
        إرسال
      </button>
    </div>
  </div>
)}
    </div>
  );
}