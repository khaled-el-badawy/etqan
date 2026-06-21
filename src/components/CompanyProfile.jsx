<<<<<<< HEAD
// CompanyProfile.jsx — متصل بالـ API زي CraftmanProfile
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
=======
import React, { useState, useRef } from "react";
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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
  FaTrashAlt,
} from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
<<<<<<< HEAD
import { ImSpinner3 } from "react-icons/im";

/* =======================
   دالة تحويل مسار الصورة لرابط كامل
======================= */
const getApiImageUrl = (path) => {
  if (!path) return "";
  let formattedPath = path.replace(/\\/g, "/");
  if (formattedPath.startsWith("https") || formattedPath.startsWith("blob:")) return formattedPath;
  const baseUrl = (axios.defaults.baseURL || "https://etqanproject.runasp.net").replace(/\/$/, "");
  if (!formattedPath.startsWith("/")) formattedPath = "/" + formattedPath;
  return `${baseUrl}${formattedPath}`;
};

/* =======================
   تحويل بيانات ال API إلى الشكل المطلوب للكومبوننت
======================= */
const normalizeCompanyProfile = (data) => {
  if (!data) return null;
  console.log("🔥 Raw Company Profile API Data:", data);

  // تحويل الخدمات من string مفصول بفواصل إلى مصفوفة
  let services = [];
  if (Array.isArray(data.services)) {
    services = data.services.filter(Boolean);
  } else if (typeof data.services === "string" && data.services.trim()) {
    services = data.services.split(/[,،]/).map((s) => s.trim()).filter(Boolean);
  }

  // استخراج التقييمات
  const rawReviews = data.customersReviews || data.reviews || [];

  // حساب سنوات الخبرة بشكل صحيح
  let experience = "";
  if (data.experience) {
    experience = data.experience;
  } else if (data.experienceYears != null) {
    experience = `${data.experienceYears} سنة`;
  }

  // حساب حالة الطوارئ بشكل صحيح
  let emergency = "";
  if (data.emergency) {
    emergency = data.emergency;
  } else if (data.isEmergencyAvailable != null) {
    emergency = data.isEmergencyAvailable ? "available" : "unavailable";
  }

  return {
    id: data.id || "",
    name: data.companyName || data.CompanyName || data.name || data.fullName || "",
    about: data.about || data.bio || "",
    email: data.email || "",
    phone: data.phone || data.phoneNumber || "",
    governorate: data.governorate || "",
    experience: experience,
    scope: data.area || data.serviceArea || "",
    hours: data.workingHours || data.workHours || data.WorkHours || "",
    responseTime: data.responseTime || "",
    emergency: emergency,
    services: services,
    avatar: getApiImageUrl(data.profilePicture || data.avatar || data.imageUrl) || "",
    cover: getApiImageUrl(data.coverPicture || data.cover || data.coverUrl) || "",
    rating: Number(data.rating ?? 0),
    completedOrders: String(data.completedOrdersCount ?? data.completedOrders ?? 0),
    joinedDate: data.joinedDate || "",
    reviews: Array.isArray(rawReviews)
      ? rawReviews.map((review, index) => ({
        id: review.id ?? index,
        name: review.name || review.fullName || review.clientName || "عميل",
        rating: Number(review.rating ?? 0),
        text: review.text || review.comment || review.review || "",
        avatar: getApiImageUrl(review.avatar || review.profilePicture) || "",
      }))
      : [],
  };
};

/* ================= EDIT PROFILE COMPONENT ================= */
function ProfileSection({ setEditMode, setIsAccountActive, isAccountActive, setCompanyData, companyData, profileFile, coverFile, profileImg, coverImg, setProfileFile, setCoverFile, setProfileImg, setCoverImg }) {
=======

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
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const [formData, setFormData] = useState({ ...companyData });
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [showCurrentPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
<<<<<<< HEAD
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const [serviceTags, setServiceTags] = useState(() => {
    if (Array.isArray(companyData.services)) return companyData.services;
    if (typeof companyData.services === 'string' && companyData.services) return companyData.services.split(/[,،]/).map(s => s.trim()).filter(Boolean);
    return [];
  });
  const [serviceInput, setServiceInput] = useState("");

  const handleServiceInputKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const nextService = serviceInput.trim();
    if (!nextService) return;
    setServiceTags((prev) => [...prev, nextService]);
    setServiceInput("");
  };

  const removeServiceTag = (indexToRemove) => {
    setServiceTags((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

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
<<<<<<< HEAD

    // التحقق من كلمة السر
    const isChangingPassword = password || newPassword || confirmPassword;
    if (isChangingPassword) {
      if (!password.trim()) newErrors.password = "كلمة السر الحالية مطلوبة لتغيير كلمة السر";
      if (!newPassword.trim()) newErrors.newPassword = "أدخل كلمة السر الجديدة";
      else if (newPassword.length < 8) newErrors.newPassword = "كلمة السر الجديدة يجب ألا تقل عن 8 أحرف";
      if (newPassword !== confirmPassword) newErrors.confirmPassword = "كلمة السر غير متطابقة";
    }

=======
    if (newPassword && newPassword !== confirmPassword) newErrors.confirmPassword = "كلمة السر غير متطابقة";
    
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

<<<<<<< HEAD
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitMessage({ type: "", text: "" });

    const normalizedServiceTags = serviceInput.trim()
      ? [...serviceTags, serviceInput.trim()]
      : serviceTags;

    // ===== بناء البيانات المرسلة لل API بصيغة FormData =====
    // ===== بناء البيانات المرسلة لل API بصيغة FormData (المطابقة 100% للباك إيند) =====
    const apiFormData = new FormData();
    if (formData.name) apiFormData.append("CompanyName", formData.name);
    if (formData.email) apiFormData.append("Email", formData.email);
    if (formData.phone) apiFormData.append("Phone", formData.phone); // 🎯 Phone بدل PhoneNumber
    if (formData.about) apiFormData.append("About", formData.about);
    if (formData.governorate) apiFormData.append("Governorate", formData.governorate);
    if (formData.scope) apiFormData.append("ServiceArea", formData.scope);
    if (formData.hours) apiFormData.append("WorkingHours", formData.hours); // 🎯 WorkingHours
    if (formData.responseTime) apiFormData.append("ResponseTime", formData.responseTime);
    
    // إرسال الخدمات كمصفوفة نصوص (مؤقتاً في حقل ServiceIds أو حسب اتفاقكم)
    if (normalizedServiceTags.length > 0) {
      apiFormData.append("ServiceIds", normalizedServiceTags.join(","));
    }

    // سنوات الخبرة (رقم)
    const expText = formData.experience || "";
    const expYears = parseInt(expText, 10);
    if (!isNaN(expYears)) {
      apiFormData.append("ExperienceYears", String(expYears));
    }

    // خدمة الطوارئ (إرسال true أو false صريحة كنص لتطابق الـ bool)
    apiFormData.append("EmergencyService", formData.emergency === "available" ? "true" : "false"); // 🎯 EmergencyService

    // 🎯 صور الملف الشخصي (نفس الأسماء اللي ضفناها في الـ DTO: Avatar و Cover)
    if (profileFile) apiFormData.append("Avatar", profileFile); 
    if (coverFile) apiFormData.append("Cover", coverFile);
    
    // ===== Debug: طباعة كل محتويات FormData في الكونسول =====
    console.log("===== Company FormData Contents =====");
    for (let pair of apiFormData.entries()) {
      console.log(pair[0], pair[1]);
    }
    console.log("=====================================");

    const isChangingPassword = password || newPassword || confirmPassword;

    try {
      setIsSubmitting(true);
      setErrors({});

      const token = localStorage.getItem("token");
      const config = {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      };

      // ✅ إرسال بيانات التحديث للـ API
      const updateResponse = await axios.put("/api/CompanyProfile/update-profile", apiFormData, config);
      console.log("✅ API Update Response Status:", updateResponse.status);
      console.log("✅ API Update Response Data:", JSON.stringify(updateResponse.data, null, 2));

      // ✅ تغيير كلمة السر لو المستخدم عايز يغيرها
      if (isChangingPassword) {
        await axios.post("/api/CompanyProfile/change-password", {
          currentPassword: password,
          newPassword,
          confirmPassword,
        }, config);
      }

      // ✅ إعادة جلب البيانات من ال API بعد التحديث
      try {
        const companyId = companyData.id || localStorage.getItem("userId");
        const refreshResponse = await axios.get(`/api/CompanyProfile/${companyId}/public-profile`, config);
        console.log("🔄 Refreshed Company Data from API:", JSON.stringify(refreshResponse.data, null, 2));
        const refreshed = normalizeCompanyProfile(refreshResponse.data);
        if (refreshed) {
          setCompanyData(refreshed);
          // ✅ ننظف blob URLs بس لو الـ API رجع صور صحيحة
          if (refreshed.cover) {
            setCoverImg("");
            setCoverFile(null);
          }
          if (refreshed.avatar) {
            setProfileImg("");
            setProfileFile(null);
          }
        }
      } catch (refreshErr) {
        console.warn("تعذر إعادة جلب البيانات بعد التحديث:", refreshErr);
        // fallback: تحديث محلي — ونخلي blob URLs زي ما هي
        setCompanyData({
          ...formData,
          services: normalizedServiceTags,
          avatar: profileImg || companyData.avatar,
          cover: coverImg || companyData.cover,
        });
      }

      setSubmitMessage({
        type: "success",
        text: isChangingPassword ? "تم حفظ البيانات وتغيير كلمة السر بنجاح" : "تم حفظ بيانات الشركة بنجاح",
      });
      setServiceTags(normalizedServiceTags);
      setServiceInput("");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsAccountActive(true);
      setTimeout(() => setEditMode("profile"), 900);
    } catch (err) {
      console.error("خطأ في تحديث بروفايل الشركة:", err);
      console.error("Status:", err.response?.status);
      console.error("Response data:", JSON.stringify(err.response?.data, null, 2));

      const errorData = err.response?.data;
      let errorText = "تعذر حفظ البيانات، حاول مرة أخرى";
      if (typeof errorData === "string") {
        errorText = errorData;
      } else if (errorData?.errors && typeof errorData.errors === "object") {
        const msgs = Object.entries(errorData.errors).map(
          ([field, fieldErrors]) => `${field}: ${[].concat(fieldErrors).join("، ")}`
        );
        if (msgs.length > 0) errorText = msgs.join(" | ");
      } else if (errorData?.message) {
        errorText = errorData.message;
      } else if (errorData?.title) {
        errorText = errorData.title;
      }
      setSubmitMessage({ type: "error", text: errorText });
    } finally {
      setIsSubmitting(false);
    }
  };
// -------------------------------------------
=======
  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      setCompanyData(formData);
      setIsAccountActive(true);
      setEditMode("profile");
    }
  };

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  return (
    <div className="edit-form-container">
      <h2>{isAccountActive ? "تعديل ملف الشركة" : "إكمال بيانات الشركة"}</h2>
      <form className="edit-profile-form" onSubmit={handleSave}>
        <div className="form-group">
          <h3>بيانات الشركة</h3>
          <input name="name" placeholder="اسم الشركة" value={formData.name} onChange={handleInputChange} />
<<<<<<< HEAD
          {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
          <input name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleInputChange} />
          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
          <input name="phone" placeholder="رقم الهاتف" value={formData.phone} maxLength={11} onChange={handleInputChange} />
          {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>}
=======
          {errors.name && <p style={{color: 'red', fontSize: '12px'}}>{errors.name}</p>}
          <input name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleInputChange} />
          {errors.email && <p style={{color: 'red', fontSize: '12px'}}>{errors.email}</p>}
          <input name="phone" placeholder="رقم الهاتف" value={formData.phone} maxLength={11} onChange={handleInputChange} />
          {errors.phone && <p style={{color: 'red', fontSize: '12px'}}>{errors.phone}</p>}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        </div>

        <div className="form-group">
          <h3>البيانات الأساسية</h3>
          <input name="about" placeholder="عن الشركة" value={formData.about} onChange={handleInputChange} />
          <input name="experience" placeholder="سنوات الخبرة" value={formData.experience} onChange={handleInputChange} />
          <input name="governorate" placeholder="المحافظة" value={formData.governorate} onChange={handleInputChange} />
<<<<<<< HEAD

          <div className="services-tags-input">
            {serviceTags.map((tag, index) => (
              <span className="service-tag" key={`${tag}-${index}`}>
                {tag}
                <button
                  type="button"
                  aria-label={`حذف ${tag}`}
                  onClick={() => removeServiceTag(index)}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={serviceInput}
              placeholder="اكتب خدمة واضغط Enter"
              onChange={(e) => setServiceInput(e.target.value)}
              onKeyDown={handleServiceInputKeyDown}
            />
          </div>
=======
        
          <select 
  name="services" 
  value={formData.services} 
  onChange={handleInputChange}
  className="custom-select" 
>
  <option value="" disabled hidden>اختر نوع الشركة</option>
  <option value="لنقل مخلفات البناء"> نقل مخلفات البناء</option>
  <option value="لنقل الرمل والزلط ">نقل الرمل والزلط </option>
  <option value="للمقاولات والبناء">مقاولات وبناء</option>
  <option value="لنقل الأثاث">نقل الأثاث</option>
  <option value="لتأجير قلابات ولود">تأجير قلابات ولودر</option>
</select>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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
<<<<<<< HEAD
          {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>}
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          <div className="password-field">
            <input type={showNewPassword ? "text" : "password"} placeholder="كلمة السر الجديدة" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <span className="password-eye" onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? <FiEye /> : <FiEyeOff />}</span>
          </div>
<<<<<<< HEAD
          {errors.newPassword && <p style={{ color: 'red', fontSize: '12px' }}>{errors.newPassword}</p>}
          <div className="password-field">
            <input type={showConfirmPassword ? "text" : "password"} placeholder="تأكيد كلمة السر" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <span className="password-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FiEye /> : <FiEyeOff />}</span>
            {errors.confirmPassword && <p style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* رسالة نجاح أو خطأ */}
        {submitMessage.text && (
          <div style={{
            padding: "10px 15px",
            borderRadius: "8px",
            marginBottom: "10px",
            backgroundColor: submitMessage.type === "success" ? "#d4edda" : "#f8d7da",
            color: submitMessage.type === "success" ? "#155724" : "#721c24",
            textAlign: "center",
            fontWeight: "bold",
          }}>
            {submitMessage.text}
          </div>
        )}

        <div className="form-btns">
          <button type="submit" className="save-btn" disabled={isSubmitting}>
            {isSubmitting ? <><ImSpinner3 className="spinner-icon" /> جاري الحفظ...</> : "حفظ"}
          </button>
          <button type="button" className="edit-cancel-btn" disabled={isSubmitting} onClick={() => setEditMode("profile")}>إلغاء</button>
=======
          <div className="password-field">
            <input type={showConfirmPassword ? "text" : "password"} placeholder="تأكيد كلمة السر" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <span className="password-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FiEye /> : <FiEyeOff />}</span>
            {errors.confirmPassword && <p style={{color: 'red', fontSize: '12px'}}>{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="form-btns">
          <button type="submit" className="save-btn">حفظ</button>
          <button type="button" className="edit-cancel-btn" onClick={() => setEditMode("profile")}>إلغاء</button>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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
  const egyptianGovernorates = [
<<<<<<< HEAD
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "الغربية",
    "المنوفية", "البحيرة", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا",
    "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر",
    "الوادي الجديد", "مطروح", "شمال سيناء", "جنوب سيناء", "الإسماعيلية",
    "السويس", "بورسعيد", "دمياط", "القليوبية"
=======
    "القاهرة","الجيزة","الإسكندرية","الدقهلية","الشرقية","الغربية",
    "المنوفية","البحيرة","كفر الشيخ","الفيوم","بني سويف","المنيا",
    "أسيوط","سوهاج","قنا","الأقصر","أسوان","البحر الأحمر",
    "الوادي الجديد","مطروح","شمال سيناء","جنوب سيناء","الإسماعيلية",
    "السويس","بورسعيد","دمياط","القليوبية"
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  ];
  const filteredGovs = egyptianGovernorates.filter(gov => gov.includes(searchTerm));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {showSuccessMsg ? (
          <div className="success-toast-container"><div className="success-icon">✓</div><p>تم إرسال طلبك بنجاح</p></div>
        ) : (
          <>
            <h2 className="modal-title">{companyName}</h2>
<<<<<<< HEAD
            <form className="request-form" onSubmit={(e) => { e.preventDefault(); setShowSuccessMsg(true); setTimeout(() => { setShowSuccessMsg(false); onClose(); }, 1500); }}>
              <div className="form-group-modal"><label>اسم العميل</label><input type="text" placeholder="أدخل اسمك" required /></div>
              <div className="form-group-modal custom-select-container">
                <label>المحافظة</label>
                <input type="text" placeholder="المحافظة" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setIsOpen(true); }} onFocus={() => setIsOpen(true)} required />
                {isOpen && filteredGovs.length > 0 && (
                  <ul className="gov-dropdown-list">
                    {filteredGovs.map((gov, index) => (<li key={index} onClick={() => { setSearchTerm(gov); setIsOpen(false); }}>{gov}</li>))}
=======
            <form className="request-form" onSubmit={(e) => {e.preventDefault(); setShowSuccessMsg(true); setTimeout(() => {setShowSuccessMsg(false); onClose();}, 1500);}}>
              <div className="form-group-modal"><label>اسم العميل</label><input type="text" placeholder="أدخل اسمك" required /></div>
              <div className="form-group-modal custom-select-container">
                <label>المحافظة</label>
                <input type="text" placeholder="المحافظة" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setIsOpen(true);}} onFocus={() => setIsOpen(true)} required />
                {isOpen && filteredGovs.length > 0 && (
                  <ul className="gov-dropdown-list">
                    {filteredGovs.map((gov, index) => (<li key={index} onClick={() => {setSearchTerm(gov); setIsOpen(false);}}>{gov}</li>))}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  </ul>
                )}
              </div>
              <div className="form-group-modal"><label>العنوان</label><input type="text" placeholder="العنوان بالتفصيل" required /></div>
              <div className="form-group-modal"><label>وصف الخدمة</label><input type="text" placeholder="وصف الخدمة" required /></div>
              <div className="form-group-modal"><label>تاريخ الطلب</label><input type="date" value={today} readOnly className="readonly-input" /></div>
<<<<<<< HEAD
              <div className="modal-btns">
                <button type="submit" className="confirm-btn">إرسال الطلب</button>
                <button type="button" className="cancel-btn" onClick={onClose}>إلغاء</button>
                <button type="button" className="close-btn" onClick={onClose}>×</button>
              </div>
=======
                <div className="modal-btns">
                  <button type="submit" className="confirm-btn">إرسال الطلب</button>
                  <button type="button" className="cancel-btn" onClick={onClose}>إلغاء</button>
                  <button type="button" className="close-btn" onClick={onClose}>×</button>
                </div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function CompanyProfile() {
<<<<<<< HEAD
  const { id: urlId } = useParams();
  const userId = urlId || localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("profile");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isAccountActive, setIsAccountActive] = useState(true);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => { AOS.init({ duration: 1000 }); }, []);

  // ✅ جلب بيانات الشركة من الـ API
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      if (!userId) { setError("يرجى تسجيل الدخول أولاً"); setLoading(false); return; }
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const config = { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } };
        const response = await axios.get(`/api/CompanyProfile/${userId}/public-profile`, config);
        setCompanyData(normalizeCompanyProfile(response.data));
      } catch (err) {
        console.error("Error fetching company profile:", err);
        setError("تعذر تحميل بيانات الشركة حالياً");
      } finally { setLoading(false); }
    };
    fetchCompanyProfile();
  }, [userId]);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === "profile") { setProfileImg(url); setProfileFile(file); }
    else { setCoverImg(url); setCoverFile(file); }
  };

  // ✅ حذف الحساب من الـ API
  const handleDeleteAccount = async () => {
    setDeleteError("");
    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      await axios.delete("/api/CompanyProfile/delete-account", { headers: { Authorization: `Bearer ${token}` } });
      setShowConfirmModal(false);
      localStorage.clear();
      setShowDeleteToast(true);
      setTimeout(() => { window.location.href = "/"; }, 2000);
    } catch (err) {
      console.error("خطأ في حذف الحساب:", err);
      const errorData = err.response?.data;
      let errorText = "تعذر حذف الحساب، حاول مرة أخرى";
      if (typeof errorData === "string") errorText = errorData;
      else if (errorData?.message) errorText = errorData.message;
      else if (errorData?.title) errorText = errorData.title;
      setDeleteError(errorText);
    } finally { setIsDeleting(false); }
  };

  // حالة التحميل
  if (loading) return (<div className="profile-container"><p style={{ textAlign: "center", padding: "80px 20px" }}>جاري تحميل بيانات الشركة...</p></div>);
  // حالة الخطأ
  if (error || !companyData) return (<div className="profile-container"><p style={{ textAlign: "center", padding: "80px 20px", color: "#ff6b6b" }}>{error || "لم يتم العثور على بيانات الشركة"}</p></div>);

  const avgRating = companyData.reviews?.length > 0
    ? companyData.reviews.reduce((sum, r) => sum + r.rating, 0) / companyData.reviews.length
    : Number(companyData.rating) || 0;
  const servicesDisplay = Array.isArray(companyData.services) ? companyData.services.join("، ") : companyData.services || "";
=======
  const [activeTab, setActiveTab] = useState("profile");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isAccountActive, setIsAccountActive] = useState(false); 
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); 

  const initialData = {
    name: "شركة أبناء سيناء",
    about: "شركة أبناء سيناء للتجارة والمقاولات العامة من الشركات العريقة في مجال التجارة والتشييد والبناء، وصُنفت بكونها أفضل شركة مقاولات عامة، ويرجع السبب إلى المميزات التي تتمتع بها الشركة بالإضافة إلى مجموعة الخدمات التي تتولى الشركة أمر تنفيذها بأعلى دقة، وتُعد هذه الشركة من أقدم الشركات في هذا المجال، إليكم الكثير من التفاصيل حولها.",
    email: "", phone: "", governorate: "القاهرة", experience: "16 سنة", scope: "داخل القاهرة والجيزة", hours: "من 9 صباحًا إلى 10 مساءً", responseTime: "خلال 30 دقيقة", emergency: "available", services: ""
  };

  const [companyData, setCompanyData] = useState(initialData);
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

 
  const confirmDelete = () => {
    setShowConfirmModal(false);
    setShowDeleteToast(true);
    setTimeout(() => {
      setShowDeleteToast(false);
      window.location.href = "/"; 
    }, 2000);
  };
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

  return (
    <div className="profile-container">
      {showRequestModal && <RequestServiceModal companyName={companyData.name} onClose={() => setShowRequestModal(false)} />}
<<<<<<< HEAD

      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => !isDeleting && setShowConfirmModal(false)}>
          <div className="modal-box delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '20px', color: '#40798C' }}>تنبيه حذف الحساب</h3>
            <p style={{ marginBottom: '30px', color: '#666' }}>هل أنت متأكد من حذف الحساب نهائياً؟ لا يمكن التراجع عن هذا الإجراء.</p>
            {deleteError && <p style={{ color: "#ff6b6b", fontSize: "14px", margin: "8px 0" }}>{deleteError}</p>}
            <div className="modal-btns" style={{ justifyContent: 'center', gap: '15px' }}>
              <button className="confirm-btn" style={{ backgroundColor: '#ff6b6b', padding: '10px 20px' }} onClick={handleDeleteAccount} disabled={isDeleting}>{isDeleting ? "جاري الحذف..." : "نعم، احذف الحساب"}</button>
              <button className="cancel-btn" style={{ backgroundColor: '#eaeaea' }} onClick={() => setShowConfirmModal(false)} disabled={isDeleting}>إلغاء</button>
=======
      

      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-box delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '20px', color: '#40798C' }}>تنبيه حذف الحساب</h3>
            <p style={{ marginBottom: '30px', color: '#666' }}>هل أنت متأكد من حذف الحساب نهائياً؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="modal-btns" style={{ justifyContent: 'center', gap: '15px' }}>
              <button className="confirm-btn" style={{ backgroundColor: '#ff6b6b', padding: '10px 20px' }} onClick={confirmDelete}>نعم</button>
              <button className="cancel-btn" style={{ backgroundColor: '#eaeaea' }} onClick={() => setShowConfirmModal(false)}>إلغاء</button>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            </div>
          </div>
        </div>
      )}

      {showDeleteToast && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="success-toast-container" style={{ background: '#fff', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
            <div className="success-icon" style={{ backgroundColor: '#ff6b6b' }}>✓</div>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>تم حذف الحساب بنجاح</p>
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* COVER */}
      <div
        className="coverBox"
        data-aos="fade-down"
        style={{ backgroundColor: isAccountActive ? "" : "#f0f2f5" }}
      >
        {(isAccountActive || coverImg) && (
          <img src={coverImg || companyData.cover} alt="cover" />
        )}
        {activeTab === "edit" && (
          <label className="edit-cover-label">
            <input
              type="file"
              accept="image/*"
              hidden
              ref={coverInputRef}
              onChange={(e) => handleImageUpload(e, "cover")}
            />
            تعديل صورة الغلاف <MdPhotoCamera />
          </label>
        )}
      </div>

      {/* PROFILE HEADER */}
      <section className="profile-summary">
        <div className="profile-info">
          <div className="prson-data">
            <div
              className="profile-avatar"
              data-aos="fade-up"
              style={{
                backgroundColor: isAccountActive ? "" : "#e0e0e0",
              }}
            >
              {(isAccountActive || profileImg) && (
                <img
                  className="avatar"
                  src={profileImg || companyData.avatar}
                  alt={companyData.name}
                />
              )}
              {!isAccountActive && !profileImg && (
                <FaBuilding style={{ fontSize: '60px', color: '#ccc' }} />
              )}
              {activeTab === "edit" && (
                <label className="edit-avatar-label">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={profileInputRef}
                    onChange={(e) => handleImageUpload(e, "profile")}
                  />
                  <img src="/images/f7_camera-fill.svg" alt="" />
                </label>
              )}
            </div>
            <div className="craftman-info" data-aos="fade-left">
              <h2>{companyData.name}</h2>
              {isAccountActive && <p>{servicesDisplay}</p>}
              {isAccountActive && (
                <span>
                  <img
                    src="/images/star.png"
                    alt="Star"
                    className="star-icon"
                  />{" "}
                  {avgRating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="action-btns">
          {isAccountActive &&
            (activeTab === "edit" ? (
              <button
                className="btn-delete-account"
                onClick={() => setShowConfirmModal(true)}
                style={{
                  backgroundColor: "#ff6b6b",
                  color: "#fff",
                  border: "none",
                  padding: "24px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "bold",
                }}
              >
=======
      {/* COVER SECTION */}
      <div className="cover-container" style={{ backgroundColor: coverImg ? 'transparent' : '#f0f2f5', height: '250px', position: 'relative' }}>
        {coverImg && <img src={coverImg} alt="cover" className="cover-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        
        {activeTab === "edit" && (
          <button 
            type="button"
            className="editcover-btn" 
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
            {activeTab === "edit" ? (
              <button 
                className="btn-delete" 
                onClick={() => setShowConfirmModal(true)}
                style={{ backgroundColor: '#ff6b6b', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold',fontSize: '20px' }}>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                <FaTrashAlt /> حذف الحساب
              </button>
            ) : (
              <>
<<<<<<< HEAD
                <button
                  className="edit-profile-btn"
                  onClick={() => setActiveTab("edit")}
                >
                  <MdModeEdit />
                </button>
                <button
                  className="request-service-btn"
                  onClick={() => setShowRequestModal(true)}
                >
                  طلب خدمة
                </button>
              </>
            ))}
        </div>
      </section>

      {/* TABS */}
=======
                <button className="btn primary" onClick={() => setShowRequestModal(true)}>طلب خدمة</button>
                <button onClick={() => setActiveTab("edit")} className="btn-edit"><MdModeEdit /></button>
              </>
            )}
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
          <p>{companyData.services}</p>
          {isAccountActive && <div className="rating"><div className="star-icon"><FaStar /><span>{avgRating.toFixed(1)}</span></div></div>}
        </div>
      </div>

      {/* RENDER TABS */}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      {!isAccountActive && activeTab !== "edit" ? (
        <div className="activation-required-section">
          <div className="activation-content">
            <FaUserCheck className="activation-icon" />
<<<<<<< HEAD
            <h3>أهلاً بك في منصتنا <img src="/images/hand.svg" alt="hand" style={{ width: '50px' }} /></h3>
=======
            <h3>أهلاً بك في منصتنا <img src="/images/hand.svg" alt="hand" style={{ width: '50px' }}/></h3>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            <p className="no-wrap-text">يرجى إكمال تفعيل حسابك وإضافة بيانات الشركة لتظهر للعملاء بشكل احترافي.</p>
            <button className="activate-btn" onClick={() => setActiveTab("edit")}>فعل حسابك الآن</button>
          </div>
        </div>
      ) : activeTab === "profile" ? (
        <div>
          <div className="stats-box">
<<<<<<< HEAD
            <div className="stat"><div className="icon-circle blue"><FaCalendarAlt /></div><span>{companyData.joinedDate || "2026"}</span><p>تاريخ الانضمام</p></div>
            <div className="stat"><div className="icon-circle green"><FaTasks /></div><span>{companyData.completedOrders || 0}</span><p>عدد الطلبات</p></div>
=======
            <div className="stat"><div className="icon-circle blue"><FaCalendarAlt /></div><span>2026</span><p>تاريخ الانضمام</p></div>
            <div className="stat"><div className="icon-circle green"><FaTasks /></div><span>0</span><p>عدد الطلبات</p></div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            <div className="stat"><div className="icon-circle purple"><FaMapMarkerAlt /></div><span>{companyData.governorate}</span><p>الموقع</p></div>
            <div className="stat"><div className="icon-circle orange"><FaBriefcase /></div><span>{companyData.experience}</span><p>سنوات الخبرة</p></div>
          </div>
          <div className="section-divider"></div>
          <div className="about-section"><div className="about-text"><h3 className="section-title"><FaBuilding className="title-icon" /> عن الشركة</h3><p className="section-p">{companyData.about}</p></div></div>
          <div className="section-divider"></div>
          <div className="section work-info">
            <h3 className="section-title"><FaBriefcase className="title-icon" /> معلومات العمل</h3>
            <div className="work-grid">
              <div className="work-item"><span className="label-icon"><FaMapMarkerAlt /> نطاق الخدمة</span><p>{companyData.scope}</p></div>
              <div className="work-item"><span className="label-icon"><FaClock /> مواعيد العمل</span><p>{companyData.hours}</p></div>
              <div className="work-item"><span className="label-icon"><FaTasks /> سرعة الاستجابة</span><p>{companyData.responseTime}</p></div>
              <div className="work-item"><span className="label-icon"><FaShieldAlt /> خدمة الطوارئ</span><p>{companyData.emergency === "available" ? "متاحة 24 ساعة" : "غير متاحة"}</p></div>
            </div>
          </div>
          <div className="section-divider"></div>
<<<<<<< HEAD
          <div className="section"><h3 className="section-title"><FaCogs className="title-icon" /> الخدمات الأساسية</h3>
=======
          <div className="section"><h3 className="section-title"><FaCogs className="title-icon" /> الخدمات الأساسية للشركة</h3>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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
<<<<<<< HEAD
            <div className="reviews">{companyData.reviews.map(r => (<div className="review-card" key={r.id}><div className="user"><div className="avatar">{r.name[0]}</div><div><h4>{r.name}</h4><FaStar className="stars" /> {r.rating.toFixed(1)}</div></div><p>{r.text}</p></div>))}</div>
          </div>
        </div>
      ) : (
        <ProfileSection setEditMode={setActiveTab} setIsAccountActive={setIsAccountActive} isAccountActive={isAccountActive} setCompanyData={setCompanyData} companyData={companyData} profileFile={profileFile} coverFile={coverFile} profileImg={profileImg} coverImg={coverImg} setProfileFile={setProfileFile} setCoverFile={setCoverFile} setProfileImg={setProfileImg} setCoverImg={setCoverImg} />
      )}
    </div>
  );
}
=======
            <div className="reviews">{reviews.map(r => (<div className="review-card" key={r.id}><div className="user"><div className="avatar">{r.name[0]}</div><div><h4>{r.name}</h4><FaStar className="stars" /> {r.rating.toFixed(1)}</div></div><p>{r.text}</p></div>))}</div>
          </div>
        </div>
      ) : (
        <ProfileSection setEditMode={setActiveTab} setIsAccountActive={setIsAccountActive} isAccountActive={isAccountActive} setCompanyData={setCompanyData} companyData={companyData} />
      )}
    </div>
  );
}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
