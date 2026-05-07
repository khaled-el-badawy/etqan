import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
// animation library
import AOS from "aos";
import "aos/dist/aos.css";
// styles
import "./CraftmanProfile.css";
// icons
import {
  MdModeEdit,
  MdAccessTime,
  MdLocationPin,
  MdWork,
  MdPhotoCamera,
} from "react-icons/md";
import { FaUser, FaTrashAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { BsPin } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { PiScrewdriverFill } from "react-icons/pi";
import { FaArrowDown, FaArrowUp, FaCalendarAlt, FaCamera } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

/* =======================
   Mock Data
======================= */
const handiesData = [
  {
    id: 1,
    ctaftName: "احمد علي",
    job: "كهربائي منازل وتشطيبات",
    rating: 0,
    verified: true,
    avatar: "/images/Ellipse 321.png",
    cover: "/images/profile-cover.png",
    about: {
      aboutInfo:
        "كهربائي متخصص في جميع أعمال الكهرباء المنزلية والتجارية، أعمل بدقة واهتمام بأدق التفاصيل، مع الالتزام التام بمعايير الأمان وجودة التنفيذ، وهدفي الأساسي هو تقديم خدمة مضمونة ترضي العميل.",
      experience: "8 سنوات",
      area: "القاهرة والجيزة",
      completedOrders: "0",
    },
    services: [
      "تأسيس كهرباء الشقق والفيلات",
      "صيانة الأعطال الكهربائية",
      "تركيب وحدات الإضاءة والنجف",
      "فحص الأعطال ومعالجة القفلات",
      "تركيب مفاتيح وبرايز",
      "تركيب لوحات التوزيع",
    ],
    workInfo: {
      area: " القاهرة - الجيزة - 6 أكتوبر - الشيخ زايد",
      workingHours: "من 9 صباحًا حتى 9 مساءً",
      speedOfResponse: "خلال ساعة",
      emergencyService: "متاحة",
    },
    worksImages: [
      "/images/work (1).png",
      "/images/work (2).png",
      "/images/work (6).png",
      "/images/work (7).png",
      "/images/work (8).png",
      "/images/work (9).png",
      "/images/work (1).png",
      "/images/work (2).png",
      "/images/work (6).png",
      "/images/work (7).png",
      "/images/work (8).png",
      "/images/work (9).png",
      "/images/work (2).png",
    ],
    reviews: [
      {
        id: 1,
        ctaftName: "محمد رفعت",
        date: "21/8/2025",
        rating: 5,
        comment:
          "الحرفي وصل في الموعد المحدد بالضبط، وكان محترم جدًا في التعامل. فحص المشكلة الأول وشرح لي سببها قبل ما يبدأ الشغل، وبعدها نفّذ الإصلاح بسرعة ونظافة. بصراحة تجربة مريحة وموثوقة",
        avatar: "/images/revewer (1).png",
      },
      {
        id: 2,
        ctaftName: "أحمد السيد",
        date: "21/8/2025",
        rating: 4,
        comment:
          "عجبني جدًا أسلوب التعامل، كان صبور وشرح لي كل خطوة قبل التنفيذ. عرض عليّ أكثر من حل وخلاني أختار الأنسب، وده خلاني أحس بثقة كبيرة في الخدمة.",
        avatar: "/images/revewer (2).png",
      },
      {
        id: 3,
        ctaftName: "سارة جمال",
        date: "21/8/2025",
        rating: 5,
        comment:
          "كنت محتاجة الإصلاح يتم بسرعة، والحرفي لبّى الطلب في نفس اليوم. الشغل كان مرتب ومحترف، وحسّيت إن فيه اهتمام حقيقي بالتفاصيل.",
        avatar: "/images/revewer (3).png",
      },
      {
        id: 4,
        ctaftName: "محمد عبد الله",
        date: "21/8/2025",
        rating: 2,
        comment:
          "كنت محتاجة الإصلاح يتم بسرعة، والحرفي لبّى الطلب في نفس اليوم. الشغل كان مرتب ومحترف، وحسّيت إن فيه اهتمام حقيقي بالتفاصيل.",
        avatar: "/images/revewer (1).png",
      },
    ],
  },
];

/* =======================
   Profile Summary
======================= */
function ProfileSummary({
  craftman,
  editMode,
  setEditMode,
  setShowRequestModal,
  setShowConfirmModal,
  isAccountActive,
  profileImg,
  setProfileImg,
  coverImg,
  setCoverImg,
}) {
  const allRatings = craftman.reviews?.map((review) => review.rating) || [];
  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length
      : 0;

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "profile") setProfileImg(url);
      else setCoverImg(url);
    }
  };

  return (
    <>
      <div
        className="coverBox"
        data-aos="fade-down"
        style={{ backgroundColor: isAccountActive ? "transparent" : "#f0f2f5" }}
      >
        {(isAccountActive || coverImg) && (
          <img src={coverImg || craftman.cover} alt="cover" />
        )}
        {editMode && (
          <label className="edit-cover-label">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImageChange(e, "cover")}
            />
            تعديل صورة الغلاف <MdPhotoCamera />
          </label>
        )}
      </div>

      <section className="profile-summary">
        <div className="profile-info">
          <div className="prson-data">
            <div
              className="profile-avatar"
              data-aos="fade-up"
              style={{
                backgroundColor: isAccountActive ? "transparent" : "#e0e0e0",
              }}
            >
              {(isAccountActive || profileImg) && (
                <img
                  className="avatar"
                  src={profileImg || craftman.avatar}
                  alt={craftman.ctaftName}
                />
              )}
              {editMode && (
                <label className="edit-avatar-label">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImageChange(e, "profile")}
                  />
                  <img src="/images/f7_camera-fill.svg" alt="" />
                </label>
              )}
            </div>
            <div className="craftman-info" data-aos="fade-left">
              <h2>
                {craftman.verified && (
                  <img
                    src="/images/Verification.png"
                    alt="Verified"
                    className="verified-badge"
                  />
                )}
                {craftman.ctaftName || craftman.name}
              </h2>
              {isAccountActive && <p>{craftman.job}</p>}
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
            (editMode ? (
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
                <FaTrashAlt /> حذف الحساب
              </button>
            ) : (
              <>
                <button
                  className="edit-profile-btn"
                  onClick={() => setEditMode(true)}
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
    </>
  );
}

/* =======================
   Profile Section
======================= */
function ProfileSection({
  craftman,
  editMode,
  setEditMode,
  isAccountActive,
  setIsAccountActive,
}) {
  const [activeMainTab, setActiveMainTab] = useState("about");
  const [activeSideTab, setActiveSideTab] = useState("basic-info");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // States الحقول
  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showCurrentPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  //  عشان نتحكم في تاريخ الميلاد في نموذج تعديل الملف الشخصي مع ماسك DD/MM/YYYY
  const DOB_MASK = "--/--/----";
  const [dob, setDob] = useState("");
  const [dobFocused, setDobFocused] = useState(false);
  const [dobError, setDobError] = useState("");
  const dobRef = React.useRef(null);
  const dobDateRef = React.useRef(null);

  // حساب أقصى تاريخ مسموح (العمر لازم يكون 18 سنة على الأقل)
  const getMaxDateForAge18 = () => {
    const today = new Date();
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
    const yyyy = maxDate.getFullYear();
    const mm = String(maxDate.getMonth() + 1).padStart(2, "0");
    const dd = String(maxDate.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // استخراج الأرقام فقط من قيمة الماسك
  const getDigitsFromMask = (masked) => masked.replace(/[^0-9]/g, "");

  // بناء قيمة الماسك من الأرقام المدخلة
  const buildMaskedValue = (digits) => {
    const slots = [0, 1, 3, 4, 6, 7, 8, 9]; // مواقع الأرقام في الماسك (--/--/----)
    const mask = DOB_MASK.split("");
    for (let i = 0; i < digits.length && i < slots.length; i++) {
      mask[slots[i]] = digits[i];
    }
    return mask.join("");
  };

  // حساب موقع الكيرسور بناءً على عدد الأرقام المدخلة
  const getCursorPosition = (digitCount) => {
    const slots = [0, 1, 3, 4, 6, 7, 8, 9];
    if (digitCount >= slots.length) return 10;
    return slots[digitCount];
  };

  // ضبط موقع الكيرسور في الإنبوت
  const setCursorPos = (pos) => {
    setTimeout(() => {
      if (dobRef.current) {
        dobRef.current.setSelectionRange(pos, pos);
      }
    }, 0);
  };

  // التعامل مع إدخال تاريخ الميلاد بتنسيق --/--/---- مع ملء الأرقام تدريجياً
  const handleDobChange = (e) => {
    // الحصول على الحرف اللي المستخدم كتبه فعلاً
    const typed = e.nativeEvent.data;
    // لو الحرف مش رقم أو مفيش حرف (مثلاً delete) — نتجاهل
    if (!typed || !/^[0-9]$/.test(typed)) {
      // نرجع القيمة القديمة عشان نمنع أي تغيير غير مرغوب
      const currentDisplay = dob || DOB_MASK;
      setDob(currentDisplay);
      const oldDigits = getDigitsFromMask(currentDisplay);
      setCursorPos(getCursorPosition(oldDigits.length));
      return;
    }

    const currentDisplay = dob || DOB_MASK;
    const oldDigits = getDigitsFromMask(currentDisplay);

    // لو وصلنا لأقصى عدد أرقام (8) — نتجاهل
    if (oldDigits.length >= 8) {
      setDob(currentDisplay);
      setCursorPos(10);
      return;
    }

    // نضيف الرقم الجديد للأرقام الموجودة
    const resultDigits = oldDigits + typed;
    const masked = buildMaskedValue(resultDigits);
    setDob(masked);

    const cursorPos = getCursorPosition(resultDigits.length);
    setCursorPos(cursorPos);

    // التحقق من صحة التاريخ عند إدخال التاريخ الكامل
    validateDob(resultDigits);
  };

  // التعامل مع مفتاح Backspace لحذف آخر رقم
  const handleDobKeyDown = (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const currentDisplay = dob || DOB_MASK;
      const digits = getDigitsFromMask(currentDisplay);
      if (digits.length > 0) {
        const newDigits = digits.slice(0, -1);
        if (newDigits.length === 0) {
          setDob(DOB_MASK);
        } else {
          const masked = buildMaskedValue(newDigits);
          setDob(masked);
        }
        const cursorPos = getCursorPosition(newDigits.length);
        setCursorPos(cursorPos);
        validateDob(newDigits);
      }
    }
  };

  // عند الضغط على الحقل، نعرض الماسك ونحرك الكيرسور لأول خانة فاضية
  const handleDobFocus = () => {
    setDobFocused(true);
    if (!dob) {
      setDob(DOB_MASK);
    }
    const currentDisplay = dob || DOB_MASK;
    const digits = getDigitsFromMask(currentDisplay);
    const cursorPos = getCursorPosition(digits.length);
    setCursorPos(cursorPos);
  };

  // عند مغادرة الحقل، لو مفيش أرقام نرجع للحالة الفاضية (placeholder)
  const handleDobBlur = () => {
    setDobFocused(false);
    const currentDisplay = dob || DOB_MASK;
    const digits = getDigitsFromMask(currentDisplay);
    if (digits.length === 0) {
      setDob("");
    }
  };

  // التعامل مع اختيار تاريخ من الـ calendar (date picker)
  const handleDatePickerChange = (e) => {
    const dateValue = e.target.value; // YYYY-MM-DD
    if (!dateValue) return;
    const [yyyy, mm, dd] = dateValue.split("-");
    const digits = dd + mm + yyyy;
    const masked = buildMaskedValue(digits);
    setDob(masked);
    validateDob(digits);
  };

  // فتح الـ calendar عند الضغط على أيقونة التقويم
  const openDatePicker = () => {
    if (dobDateRef.current) {
      dobDateRef.current.showPicker();
    }
  };

  // التحقق من صحة التاريخ مع شرط العمر 18 سنة
  const validateDob = (digits) => {
    if (digits.length === 8) {const day = parseInt(digits.slice(0, 2), 10);
      const month = parseInt(digits.slice(2, 4), 10);
      const year = parseInt(digits.slice(4, 8), 10);
      const currentYear = new Date().getFullYear();

      if (month < 1 || month > 12) {
        setDobError("الشهر يجب أن يكون بين 01 و 12");
      } else if (day < 1 || day > 31) {
        setDobError("اليوم يجب أن يكون بين 01 و 31");
      } else if (year < 1900 || year > currentYear) {
        setDobError(`السنة يجب أن تكون بين 1900 و ${currentYear}`);
      } else {
        const dateObj = new Date(year, month - 1, day);
        if (
          dateObj.getFullYear() !== year ||
          dateObj.getMonth() !== month - 1 ||
          dateObj.getDate() !== day
        ) {
          setDobError("تاريخ غير صالح");
        } else {
          // التحقق من شرط العمر (18 سنة على الأقل)
          const today = new Date();
          const age18Date = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate(),
          );
          if (dateObj > age18Date) {
            setDobError("يجب أن يكون عمرك 18 سنة على الأقل");
          } else {
            setDobError("");
          }
        }
      }
    } else {
      setDobError("");
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // 1. Phone: Required & must start with a valid Egyptian prefix
    if (!phone.trim()) {
      errors.phone = "رقم الهاتف مطلوب";
    } else if (!/^(010|011|012|015)/.test(phone.trim())) {
      errors.phone = "رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015";
    }

    // 2. Password: Optional — but if changing, validate all fields
    const isChangingPassword = password || newPassword || confirmPassword;
    if (isChangingPassword) {
      if (!password.trim()) {
        errors.password = "كلمة السر الحالية مطلوبة لتغيير كلمة السر";
      }
      if (!newPassword.trim()) {
        errors.newPassword = "أدخل كلمة السر الجديدة";
      }
      if (newPassword !== confirmPassword) {
        errors.confirmPassword = "كلمة السر الجديدة وتأكيدها غير متطابقتين";
      }
    }

    // If there are errors, show them and stop
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // All good — clear errors and save
    setFormErrors({});
    setIsAccountActive(true);
    setEditMode(false);
  };

  const allRatings = craftman.reviews?.map((review) => review.rating) || [];
  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length
      : 0;
  const displayedReviews = showAllReviews
    ? craftman.reviews
    : craftman.reviews?.slice(0, 3);

  const renderSideContent = () => {
    // تجهيز بيانات افتراضية لو الداتا جاية من الداشبورد ناقصة
    const aboutData = craftman.about || { aboutInfo: "لا توجد معلومات متوفرة حالياً.", experience: craftman.experience || "غير محدد", area: craftman.location || "غير محدد", completedOrders: "0" };
    const servicesData = craftman.services || ["تقديم خدمات عامة"];
    const workData = craftman.workInfo || { area: craftman.location, workingHours: "غير محدد", speedOfResponse: "سريع", emergencyService: "متاحة" };

    switch (activeSideTab) {
      case "basic-info":
        return (
          <ul className="basic-info-content">
            <li className="about-info">
              <FaUser className="icon" /> {craftman.about.aboutInfo}
            </li>
            <li className="experience">
              <MdAccessTime className="icon" /> {craftman.about.experience}
            </li>
            <li className="area">
              <MdLocationPin className="icon" /> {craftman.about.area}
            </li>
            <li className="completed-orders">
              <MdWork className="icon" />{" "}
              {`عدد الطلبات المنفذة : ${craftman.about.completedOrders} طلب`}
            </li>
          </ul>
        );
      case "services":
        return (
          <ul className="services-content">
            {craftman.services.map((s, i) => (
              <li key={i}>
                <PiScrewdriverFill className="icon" /> {s}
              </li>
            ))}
          </ul>
        );
      case "work-info":
        return (
          <ul className="work-info-content">
            <li>
              <BsPin className="icon" />{" "}
              {`نطاق الخدمة : ${craftman.workInfo.area}`}
            </li>
            <li>
              <MdAccessTime className="icon" />{" "}
              {`ساعات العمل : ${craftman.workInfo.workingHours}`}
            </li>
            <li>
              <ImSpinner3 className="icon" />{" "}
              {`سرعة الاستجابة : ${craftman.workInfo.speedOfResponse}`}
            </li>
            <li>
              <AiOutlineExclamationCircle className="icon" />{" "}
              {`خدمة الطوارئ : ${craftman.workInfo.emergencyService}`}
            </li>
          </ul>
        );
      default:
        return null;
    }
  };

  if (editMode) {
    return (
      <div className="edit-form-container">
        <h2>
          {isAccountActive ? "تعديل الملف الشخصي" : "إكمال بيانات الحرفي"}
        </h2>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-group top">
            <h3>البيانات الشخصية</h3>
            <input
              type="text"
              placeholder="الاسم"
              defaultValue={craftman.ctaftName}
              required
            />
            
            {/* -------- */}
            <div className="dob-field-wrapper">
              <input
                type="text"
                id="dob"
                className="dob-input"
                ref={dobRef}
                placeholder="تاريخ الميلاد"
                value={dob}
                onChange={handleDobChange}
                onKeyDown={handleDobKeyDown}
                onFocus={handleDobFocus}
                onClick={handleDobFocus}
                onBlur={handleDobBlur}
                inputMode="numeric"
                autoComplete="off"
              />
              {/* أيقونة التقويم على يسار الحقل */}
              <span className="dob-calendar-icon" onClick={openDatePicker}>
                <FaCalendarAlt />
              </span>
              {/* حقل التاريخ المخفي للـ calendar picker */}
              <input
                type="date"
                className="dob-hidden-date"
                ref={dobDateRef}
                onChange={handleDatePickerChange}
                max={getMaxDateForAge18()}
                min="1900-01-01"
                tabIndex={-1}
              />
            </div>
            {dobError && <p className="dob error-msg">{dobError}</p>}
            {/* -------- */}
            <select>
              <option value="">الحالة الاجتماعية</option>
              <option>متزوج</option>
              <option>أعزب</option>
              <option>ارمل</option>
              <option>مطلق</option>
            </select>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setFormErrors((prev) => ({ ...prev, phone: "" })); }}
              maxLength={11}
              style={formErrors.phone ? { borderColor: "#ff6b6b" } : {}}
            />
            {formErrors.phone && <p className="dob error-msg">{formErrors.phone}</p>}
            <input
              type="text"
              placeholder="المحافظة"
              defaultValue={craftman.about.area}
            />
          </div>
          <div className="form-group middle">
            <h3>البيانات الأساسية</h3>
            <input
              type="text"
              placeholder="عن الحرفي"
              defaultValue={craftman.job}
            />
            <input
              type="text"
              placeholder="سنوات الخبرة"
              defaultValue={craftman.about.experience}
            />
            <input type="text" placeholder="الخدمات" />
          </div>
          <div className="form-group bottom">
            <h3>معلومات العمل</h3>
            <input
              type="text"
              placeholder="نطاق الخدمة"
              defaultValue={craftman.workInfo.area}
            />
            <input
              type="text"
              placeholder="مواعيد العمل"
              defaultValue={craftman.workInfo.workingHours}
            />
            <select>
              <option value="">خدمة الطوارئ</option>
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
                onChange={(e) => { setPassword(e.target.value); setFormErrors((prev) => ({ ...prev, password: "" })); }}
                style={formErrors.password ? { borderColor: "#ff6b6b" } : {}}
              />
              <span
                className="password-eye"
                onClick={() => setShowPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {formErrors.password && <p className="dob error-msg">{formErrors.password}</p>}
            <div className="password-field">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="كلمة السر الجديدة"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setFormErrors((prev) => ({ ...prev, newPassword: "" })); }}
                style={formErrors.newPassword ? { borderColor: "#ff6b6b" } : {}}
              />
              <span
                className="password-eye"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {formErrors.newPassword && <p className="dob error-msg">{formErrors.newPassword}</p>}
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="تأكيد كلمة السر"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setFormErrors((prev) => ({ ...prev, confirmPassword: "" })); }}
                style={formErrors.confirmPassword ? { borderColor: "#ff6b6b" } : {}}
              />
              <span
                className="password-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {formErrors.confirmPassword && <p className="dob error-msg">{formErrors.confirmPassword}</p>}
          </div>
          <div className="form-btns">
            <button type="submit" className="save-btn">
              حفظ
            </button>
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

  return (
    <div className="profile-wrapper">
      {!isAccountActive ? (
        <div className="activation-required-section">
          <div className="activation-content">
            <FaUserCheck className="activation-icon" />
            <h3>
              أهلاً بك في منصتنا{" "}
              <img
                src="/images/hand.svg"
                alt="hand"
                style={{ width: "50px" }}
              />
            </h3>
            <p className="no-wrap-text">
              يرجى إكمال تفعيل حسابك وإضافة بياناتك المهنية لتظهر للعملاء بشكل
              احترافي.
            </p>
            <button className="activate-btn" onClick={() => setEditMode(true)}>
              فعل حسابك الآن
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="main-tabs">
            <button
              className={activeMainTab === "about" ? "active" : ""}
              onClick={() => setActiveMainTab("about")}
            >
              عن الحرفي
            </button>
            <button
              className={activeMainTab === "works" ? "active" : ""}
              onClick={() => setActiveMainTab("works")}
            >
              الأعمال
            </button>
            <button
              className={activeMainTab === "reviews" ? "active" : ""}
              onClick={() => setActiveMainTab("reviews")}
            >
              تقييمات
            </button>
          </div>
          {activeMainTab === "about" && (
            <div className="about-section">
              <div className="side-tabs" data-aos="fade-up">
                <button
                  className={activeSideTab === "basic-info" ? "active" : ""}
                  onClick={() => setActiveSideTab("basic-info")}
                >
                  المعلومات الأساسية
                </button>
                <button
                  className={activeSideTab === "services" ? "active" : ""}
                  onClick={() => setActiveSideTab("services")}
                >
                  الخدمات
                </button>
                <button
                  className={activeSideTab === "work-info" ? "active" : ""}
                  onClick={() => setActiveSideTab("work-info")}
                >
                  معلومات العمل
                </button>
              </div>
              <div className="side-content">{renderSideContent()}</div>
            </div>
          )}
          {activeMainTab === "works" && (
            <div className="portfolio-section">
              <div className="portfolio-grid">
                <label className="work-item upload-box">
                  <input type="file" accept="image/*" hidden />
                  <img
                    src="/images/upload.png"
                    alt="upload"
                    className="upload-icon"
                  />
                </label>
                {craftman.worksImages.map((img, i) => (
                  <div
                    key={i}
                    className="work-item"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt="work" className="work-image" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeMainTab === "reviews" && (
            <div className="reviews-section">
              <h1 className="reviews-title">التقييمات وآراء العملاء</h1>
              <div className="rating-summary">
                <div className="rating-summary-box">
                  <div className="rating-score">
                    <h2>{avgRating.toFixed(1)}</h2>
                    <div className="review-stars">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < Math.round(avgRating) ? "filled" : ""}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rating-bars">
                    {[5, 4, 3, 2, 1].map((star, i) => {
                      const count = craftman.reviews.filter(
                        (r) => r.rating === star,
                      ).length;
                      const percent =
                        craftman.reviews.length > 0
                          ? (count / craftman.reviews.length) * 100
                          : 0;
                      return (
                        <div key={i} className="rating-bar">
                          <span>{star}</span>
                          <div className="bar">
                            <div
                              className="fill"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <hr />
              {craftman.reviews.length > 0 ? (
                displayedReviews.map((r, i) => (
                  <div key={i} className="review-card">
                    <div className="review-card-content">
                      <div className="review-header">
                        <div className="review-avatar">
                          <img src={r.avatar} alt="" />
                        </div>
                        <h4>{r.ctaftName}</h4>
                      </div>
                      <div className="rate-and-date">
                        <span>{r.date}</span>
                        <div className="review-stars">
                          {[...Array(5)].map((_, si) => (
                            <span
                              key={si}
                              className={si < r.rating ? "filled" : ""}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="comment">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="no-reviews">لا توجد تقييمات حالياً</p>
              )}
              {craftman.reviews.length > 3 && (
                <div className="show-all-reviews">
                  <button onClick={() => setShowAllReviews(!showAllReviews)}>
                    {showAllReviews ? <FaArrowUp /> : <FaArrowDown />}
                    <span>
                      {showAllReviews ? "عرض أقل" : "عرض كل التقييمات"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {selectedImage && (
        <div
          className="image-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div className="image-modal-content">
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img src={selectedImage} alt="preview" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= REQUEST MODAL ================= */

/* ================= REQUEST MODAL COMPONENT ================= */
function RequestServiceModal({ craftmanName, onClose }) {
  const today = new Date().toISOString().split("T")[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const egyptianGovernorates = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الدقهلية",
    "الشرقية",
    "الغربية",
    "المنوفية",
    "البحيرة",
    "كفر الشيخ",
    "الفيوم",
    "بني سويف",
    "المنيا",
    "أسيوط",
    "سوهاج",
    "قنا",
    "الأقصر",
    "أسوان",
    "البحر الأحمر",
    "الوادي الجديد",
    "مطروح",
    "شمال سيناء",
    "جنوب سيناء",
    "الإسماعيلية",
    "السويس",
    "بورسعيد",
    "دمياط",
    "القليوبية",
  ];
  const filteredGovs = egyptianGovernorates.filter((gov) =>
    gov.includes(searchTerm),
  );
  // this component is just a dummy form to show the success toast after submit, it doesn't actually send any data anywhere
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMsg(true);
    setTimeout(() => onClose(), 1500);
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
         <h2 className="modal-title">{craftmanName}</h2>
            <form
              className="request-form"
              onSubmit={(e) => {
                e.preventDefault();
                setShowSuccessMsg(true);
                setTimeout(() => {
                  setShowSuccessMsg(false);
                  onClose();
                }, 1500);
              }}
            >
              <div className="form-group-modal">
                <label>اسم العميل</label>
                <input type="text" placeholder="أدخل اسمك" required />
              </div>
              <div className="form-group-modal custom-select-container">
                <label>المحافظة</label>
                <input
                  type="text"
                  placeholder="المحافظة"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                  }}
                  onFocus={() => setIsOpen(true)}
                  required
                />
                {isOpen && filteredGovs.length > 0 && (
                  <ul className="gov-dropdown-list">
                    {filteredGovs.map((gov, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSearchTerm(gov);
                          setIsOpen(false);
                        }}
                      >
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
                <label>وصف الخدمة</label>
                <input type="text" placeholder="وصف الخدمة" required />
              </div>
              <div className="form-group-modal">
                <label>تاريخ الطلب</label>
                <input
                  type="date"
                  value={today}
                  readOnly
                  className="readonly-input"
                />
              </div>
              <div className="modal-btns">
                <button type="submit" className="confirm-btn">
                  إرسال الطلب
                </button>
                <button type="button" className="cancel-btn" onClick={onClose}>
                  إلغاء
                </button>
                <button type="button" className="close-btn" onClick={onClose}>
                  ×
                </button>
              </div>
            </form>
            </>
        )}
      </div>
    </div>
  );
}

/* ================= PAGE COMPONENT ================= */
const ProfilePage = () => {
  const { id = 1 } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isAccountActive, setIsAccountActive] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleDeleteAccount = () => {
    setShowConfirmModal(false);
    setShowDeleteToast(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const craftman = handiesData.find((e) => e.id === Number(id));
  if (!craftman) return <p>Not Found</p>;

  return (
    <div className="professional-profile-container">
      {showConfirmModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowConfirmModal(false)}
        >
          <div className="modal-box delete-confirm-modal">
            <h3>تنبيه حذف الحساب</h3>
            <p>
              هل أنت متأكد من حذف الحساب نهائياً؟ لا يمكن التراجع عن هذا
              الإجراء.
            </p>
            <div className="modal-btns">
              <button
                className="confirm-btn"
                style={{ backgroundColor: "#ff6b6b" }}
                onClick={handleDeleteAccount}
              >
                نعم
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteToast && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div
            className="success-toast-container"
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <div
              className="success-icon"
              style={{ backgroundColor: "#ff6b6b" }}
            >
              ✓
            </div>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              تم حذف الحساب بنجاح
            </p>
          </div>
        </div>
      )}

      {showRequestModal && (
        <RequestServiceModal
          craftmanName={craftman.ctaftName || craftman.name}
          onClose={() => setShowRequestModal(false)}
        />
      )}

      <ProfileSummary
        craftman={craftman}
        editMode={editMode}
        setEditMode={setEditMode}
        setShowRequestModal={setShowRequestModal}
        setShowConfirmModal={setShowConfirmModal}
        isAccountActive={isAccountActive}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        coverImg={coverImg}
        setCoverImg={setCoverImg}
      />

      <ProfileSection
        craftman={craftman}
        editMode={editMode}
        setEditMode={setEditMode}
        isAccountActive={isAccountActive}
        setIsAccountActive={setIsAccountActive}
      />
    </div>
  );
};

export default ProfilePage;