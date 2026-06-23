import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import { FaArrowDown, FaArrowUp, FaCalendarAlt } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

/* =======================
   API ID الافتراضي للاختبار
======================= */
// const TEST_ARTISAN_ID = "dd79bf4d-ee81-4399-b606-9f1f358e80d2";

/* =======================
   قائمة الوظائف من قاعدة البيانات
======================= */
const JOBS_LIST = [
  "حداد",
  "كهرباء",
  "نجارة",
  "سباكة",
  "محارة",
  "نقاش",
  "فني غاز",
  "فني تكييفات",
  "منجد",
  "سيراميك",
  "أمن وأنظمة ذكية",
  "عامل بناء",
  "صيانة أجهزة كهربائية",
  "سواق نقل",
  "تكسير وإزالة",
  "الومنتال",
  "فني تركيب دش",
  "تنظيف",
];

const getApiImageUrl = (path) => {
  if (!path) return "";
  let formattedPath = path.replace(/\\/g, "/");
  if (formattedPath.startsWith("https") || formattedPath.startsWith("blob:"))
    return formattedPath;

  // If no global baseURL is set, use the hardcoded backend domain
  const baseUrl = (
    axios.defaults.baseURL || "https://etqanproject.runasp.net"
  ).replace(/\/$/, "");

  if (!formattedPath.startsWith("/")) {
    formattedPath = "/" + formattedPath;
  }
  return `${baseUrl}${formattedPath}`;
};

const formatBirthDateToDobMask = (birthDate) => {
  if (!birthDate) return "";
  const [datePart] = birthDate.split("T");
  const [yyyy, mm, dd] = datePart.split("-");
  return yyyy && mm && dd ? `${dd}/${mm}/${yyyy}` : "";
};

const getExperienceYears = (value) => {
  const match = String(value || "").match(/\d+/);
  return match ? Number(match[0]) : null;
};

/**
 * تحويل الحالة الاجتماعية من نص عربي أو رقم إلى القيمة الرقمية المطلوبة للـ API
 * الـ API ممكن يرجع النص العربي ("أعزب") أو الرقم (1) — لازم نوحدهم
 */
const MARITAL_TEXT_TO_NUM = {
  "افضل عدم الاجابة": "0",
  "أفضل عدم الإجابة": "0",
  أعزب: "1",
  اعزب: "1",
  متزوج: "2",
  ارمل: "3",
  أرمل: "3",
  مطلق: "4",
};

const normalizeMaritalStatus = (value) => {
  if (value == null || value === "") return "0";
  const str = String(value).trim();
  // لو القيمة رقم من 0-4 نرجعها زي ما هي
  if (/^[0-4]$/.test(str)) return str;
  // لو نص عربي نحوله لرقم
  return MARITAL_TEXT_TO_NUM[str] ?? "0";
};

/**
 * تحويل بيانات ال API إلى الشكل المطلوب للكومبوننت
 */
const normalizeCraftmanProfile = (data) => {
  if (!data) return null;

  console.log("🔥 Raw Profile API Data:", data); // للـ Debugging عشان نشوف اسم الخاصية الصحيحة

  // تحويل الخدمات من string مفصول بفواصل إلى مصفوفة لو جاية كده
  let services = [];
  if (Array.isArray(data.services)) {
    services = data.services;
  } else if (typeof data.services === "string" && data.services.trim()) {
    services = data.services
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // استخراج البورتفوليو من أكثر من اسم محتمل في الـ API
  const apiPortfolio =
    data.portfolioImages ||
    data.portfolios ||
    data.portfolio ||
    data.images ||
    data.works ||
    [];

  return {
    id: data.id || "",
    isOwner: Boolean(data?.permissions?.isOwner ?? data?.isOwner ?? false),
    ctaftName: data.fullName || data.ctaftName || data.name || "",
    job: data.jobName || data.job || "",
    rating: Number(data.rating ?? 0),
    verified: Boolean(data.verified ?? true),
    avatar:
      getApiImageUrl(data.profilePicture || data.avatar || data.imageUrl) || "",
    cover:
      getApiImageUrl(data.coverPicture || data.cover || data.coverUrl) || "",
    email: data.email || "",
    phone: data.phone || data.phoneNumber || "",
    birthDate: data.birthDate || "",
    maritalStatus: normalizeMaritalStatus(
      data.maritalStatus ?? data.socialStatus,
    ),
    about: {
      aboutInfo: data.bio || data.about?.aboutInfo || "",
      experience:
        data.experienceYears != null
          ? `${data.experienceYears} سنوات`
          : data.about?.experience || "",
      area: data.governorate || data.about?.area || "",
      completedOrders: String(
        data.completedOrdersCount ?? data.about?.completedOrders ?? 0,
      ),
    },
    services: services,
    workInfo: {
      area: data.serviceArea || data.workInfo?.area || "",
      workingHours: data.workHours || data.workInfo?.workingHours || "",
      speedOfResponse:
        data.responseTime || data.workInfo?.speedOfResponse || "",
      emergencyService:
        data.isEmergencyAvailable != null
          ? data.isEmergencyAvailable
            ? "متاحة"
            : "غير متاحة"
          : data.workInfo?.emergencyService || "",
    },
    worksImages:
      Array.isArray(apiPortfolio) && apiPortfolio.length > 0
        ? apiPortfolio.map((img) =>
            getApiImageUrl(img?.url || img?.imageUrl || img?.imagePath || img),
          )
        : [],
    // حفظ بيانات البورتفوليو الكاملة (مع الـ id) عشان نقدر نحذف
    portfolioData:
      Array.isArray(apiPortfolio) && apiPortfolio.length > 0
        ? apiPortfolio.map((img) => ({
            id: img?.id ?? img?.imageId ?? null,
            url: getApiImageUrl(
              img?.url || img?.imageUrl || img?.imagePath || img,
            ),
            description: img?.description || "",
          }))
        : [],
    reviews: Array.isArray(data.reviews)
      ? data.reviews.map((review, index) => ({
          id: review.id ?? index,
          ctaftName:
            review.ctaftName ||
            review.fullName ||
            review.name ||
            review.clientName ||
            "عميل",
          date: review.date || review.createdAt || "",
          rating: Number(review.rating ?? 0),
          comment: review.comment || review.review || "",
          avatar:
            getApiImageUrl(
              review.avatar || review.profilePicture || review.imageUrl,
            ) || "/images/revewer (1).png",
        }))
      : [],
    joinedDate: data.joinedDate || "",
  };
};

/* =======================
   Profile Summary
======================= */
function ProfileSummary({
  craftman,
  isOwner,
  editMode,
  setEditMode,
  setShowRequestModal,
  setShowConfirmModal,
  isAccountActive,
  profileImg,
  setProfileImg,
  setProfileFile,
  coverImg,
  setCoverImg,
  setCoverFile,
}) {
  const allRatings = craftman.reviews?.map((review) => review.rating) || [];
  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length
      : Number(craftman.rating) || 0;

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "profile") {
        setProfileImg(url);
        setProfileFile(file);
      } else {
        setCoverImg(url);
        setCoverFile(file);
      }
    }
  };

  return (
    <>
      <div
        className="coverBox"
        data-aos="fade-down"
        style={{ backgroundColor: isAccountActive ? "" : "#f0f2f5" }}
      >
        {(isAccountActive || coverImg) && (
          <img src={coverImg || craftman.cover} alt="cover" />
        )}
        {editMode && isOwner && (
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
                backgroundColor: isAccountActive ? "" : "#e0e0e0",
              }}
            >
              {(isAccountActive || profileImg) && (
                <img
                  className="avatar"
                  src={profileImg || craftman.avatar}
                  alt={craftman.ctaftName}
                />
              )}
              {editMode && isOwner && (
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
            isOwner &&
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
              </>
            ))}

          {isAccountActive && !isOwner && (
            <button
              className="request-service-btn"
              onClick={() => setShowRequestModal(true)}
            >
              طلب خدمة
            </button>
          )}
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
  isOwner,
  editMode,
  setEditMode,
  isAccountActive,
  setIsAccountActive,
  onUpdateProfile,
  profileFile,
  coverFile,
  profileImg,
  coverImg,
}) {
  const [activeMainTab, setActiveMainTab] = useState("about");
  const [activeSideTab, setActiveSideTab] = useState("basic-info");
  const [selectedImage, setSelectedImage] = useState(null);

  // ===== حالات البورتفوليو =====
  const [isUploadingPortfolio, setIsUploadingPortfolio] = useState(false);
  const [portfolioMessage, setPortfolioMessage] = useState({
    type: "",
    text: "",
  });
  const [deletingImageId, setDeletingImageId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // imageId المراد حذفه
  const [showAllReviews, setShowAllReviews] = useState(false);

  // States الحقول

  const [email, setEmail] = useState(craftman.email || "");
  const [phone, setPhone] = useState(craftman.phone || "");
  // maritalStatus — دايماً رقم كـ string ("0"-"4") عشان يتوافق مع الـ select
  const [maritalStatus, setMaritalStatus] = useState(
    normalizeMaritalStatus(craftman.maritalStatus),
  );
  const [selectedJob, setSelectedJob] = useState(craftman.job || "");
  const [password, setPassword] = useState("");
  const [showCurrentPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [serviceTags, setServiceTags] = useState(craftman.services || []);
  const [serviceInput, setServiceInput] = useState("");
  const [aboutInfo, setAboutInfo] = useState(craftman.about?.aboutInfo || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  //  عشان نتحكم في تاريخ الميلاد في نموذج تعديل الملف الشخصي مع ماسك DD/MM/YYYY
  const DOB_MASK = "--/--/----";
  const [dob, setDob] = useState(() =>
    formatBirthDateToDobMask(craftman.birthDate),
  );
  const [dobError, setDobError] = useState("");
  const dobRef = useRef(null);
  const dobDateRef = useRef(null);

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
    if (digits.length === 8) {
      const day = parseInt(digits.slice(0, 2), 10);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: "", text: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get("fullName") || "").trim();
    const job = selectedJob;
    const governorate = String(formData.get("governorate") || "").trim();
    const experience = String(formData.get("experience") || "").trim();
    const serviceArea = String(formData.get("serviceArea") || "").trim();
    const workHours = String(formData.get("workHours") || "").trim();
    const emergencyService = String(
      formData.get("emergencyService") ||
        craftman.workInfo?.emergencyService ||
        "",
    ).trim();
    const errors = {};

    if (!fullName) {
      errors.fullName = "الاسم مطلوب";
    }

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
      } else if (newPassword.length < 8) {
        errors.newPassword = "كلمة السر الجديدة يجب ألا تقل عن 8 أحرف";
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

    const normalizedServiceTags = serviceInput.trim()
      ? [...serviceTags, serviceInput.trim()]
      : serviceTags;
    // ===== بناء البيانات المرسلة لل API بصيغة FormData =====
    const apiFormData = new FormData();
    apiFormData.append("FullName", fullName);
    apiFormData.append("Bio", aboutInfo.trim());
    const expYears = getExperienceYears(experience);
    if (expYears != null)
      apiFormData.append("ExperienceYears", String(expYears));
    apiFormData.append("WorkHours", workHours);
    apiFormData.append("Services", normalizedServiceTags.join(", "));
    apiFormData.append("ServiceArea", serviceArea);
    apiFormData.append(
      "ResponseTime",
      craftman.workInfo?.speedOfResponse || "",
    );
    apiFormData.append(
      "IsEmergencyAvailable",
      String(emergencyService === "متاحة"),
    );

    // إضافة تاريخ الميلاد لو موجود
    const dobDigits = getDigitsFromMask(dob || "");
    if (dobDigits.length === 8) {
      const dd = dobDigits.slice(0, 2);
      const mm = dobDigits.slice(2, 4);
      const yyyy = dobDigits.slice(4, 8);
      apiFormData.append("BirthDate", `${yyyy}-${mm}-${dd}`);
    }

    // إضافة الحقول الشخصية
    if (email.trim()) apiFormData.append("Email", email.trim());
    if (phone.trim()) apiFormData.append("PhoneNumber", phone.trim());
    // MaritalStatus لازم يتبعت كرقم (int) حسب ال API — دايماً نبعته
    apiFormData.append("MaritalStatus", String(maritalStatus || "0"));
    // إضافة المحافظة و الوظيفة
    if (governorate) apiFormData.append("Governorate", governorate);
    if (job) apiFormData.append("JobName", job);

    // إضافة الصور لو موجودة
    if (profileFile) apiFormData.append("ProfilePicture", profileFile);
    if (coverFile) apiFormData.append("CoverPicture", coverFile);

    // ===== Debug: طباعة كل محتويات FormData في الكونسول =====
    console.log("===== FormData Contents =====");
    for (let pair of apiFormData.entries()) {
      console.log(pair[0], pair[1]);
    }
    console.log("=============================");

    try {
      setIsSubmitting(true);
      setFormErrors({});

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      // إرسال البيانات — axios تلقائياً يضبط Content-Type: multipart/form-data
      await axios.put("/api/Artisans/edit-full-profile", apiFormData, config);

      if (isChangingPassword) {
        await axios.post(
          "/api/Artisans/change-password",
          {
            currentPassword: password,
            newPassword,
            confirmPassword,
          },
          config,
        );
      }

      // إعادة جلب البيانات من ال API بعد التحديث عشان نضمن البيانات متزامنة
      try {
        const artisanId = craftman?.id;
        if (!artisanId) throw new Error("Missing artisan id for refresh");
        const refreshResponse = await axios.get(
          `/api/Artisans/${artisanId}/profile`,
          config, // لازم نبعت التوكن مع طلب الجلب
        );
        let profileData = refreshResponse.data;

        try {
          const portRes = await axios.get("/api/Artisans/portfolio", config);
          profileData.portfolioImages = portRes.data || [];
        } catch (e) {
          console.warn("Failed to fetch portfolio:", e);
        }

        const refreshed = normalizeCraftmanProfile(profileData);
        if (refreshed) {
          onUpdateProfile?.(refreshed);
        }
      } catch (refreshErr) {
        // لو الـ refresh فشل، نحدث البيانات محلياً كـ fallback
        console.warn("تعذر إعادة جلب البيانات بعد التحديث:", refreshErr);
        onUpdateProfile?.((prev) => ({
          ...prev,
          ctaftName: fullName,
          job: job || prev.job,
          email: email.trim() || prev.email,
          phone: phone.trim() || prev.phone,
          maritalStatus:
            maritalStatus !== "" ? maritalStatus : prev.maritalStatus,
          services: normalizedServiceTags,
          avatar: profileImg || prev.avatar,
          cover: coverImg || prev.cover,
          about: {
            ...prev.about,
            aboutInfo: aboutInfo.trim(),
            experience: experience || prev.about?.experience || "",
            area: governorate || prev.about?.area || "",
          },
          workInfo: {
            ...prev.workInfo,
            area: serviceArea || prev.workInfo?.area || "",
            workingHours: workHours || prev.workInfo?.workingHours || "",
            emergencyService:
              emergencyService || prev.workInfo?.emergencyService || "",
          },
        }));
      }

      setSubmitMessage({
        type: "success",
        text: isChangingPassword
          ? "تم حفظ البيانات وتغيير كلمة السر بنجاح"
          : "تم حفظ بيانات الملف الشخصي بنجاح",
      });
      setServiceTags(normalizedServiceTags);
      setServiceInput("");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsAccountActive(true);
      setTimeout(() => setEditMode(false), 900);
    } catch (err) {
      console.error("خطأ في تحديث البروفايل:", err);
      console.error("Status:", err.response?.status);
      console.error(
        "Response data:",
        JSON.stringify(err.response?.data, null, 2),
      );
      const errorData = err.response?.data;
      let errorText = "تعذر حفظ البيانات، حاول مرة أخرى";
      if (typeof errorData === "string") {
        errorText = errorData;
      } else if (errorData?.errors && typeof errorData.errors === "object") {
        // ⚡ ASP.NET validation errors — لازم نفحص errors الأول
        // لأن ASP.NET بيرجع title + errors مع بعض
        // الـ title بيكون "One or more validation errors occurred"
        // لكن errors فيها تفاصيل كل حقل
        const msgs = Object.entries(errorData.errors).map(
          ([field, fieldErrors]) =>
            `${field}: ${[].concat(fieldErrors).join("، ")}`,
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

  const handleServiceInputKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const nextService = serviceInput.trim();
    if (!nextService) return;

    setServiceTags((prev) => [...prev, nextService]);
    setServiceInput("");
  };

  const removeServiceTag = (indexToRemove) => {
    setServiceTags((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  // ===== رفع صورة جديدة للبورتفوليو =====
  const handlePortfolioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // مسح الـ input عشان لو المستخدم اختار نفس الصورة تاني
    e.target.value = "";

    try {
      setIsUploadingPortfolio(true);
      setPortfolioMessage({ type: "", text: "" });

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("Image", file);
      formData.append("Description", ""); // وصف اختياري

      const response = await axios.post(
        "/api/Artisans/portfolio/add",
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );

      console.log("✅ تم رفع صورة البورتفوليو:", response.data);

      // إعادة جلب البيانات من ال API بعد الرفع عشان نحدث الصور
      try {
        const artisanId = craftman?.id;
        if (!artisanId) throw new Error("Missing artisan id for refresh");
        const config = {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        };
        const refreshResponse = await axios.get(
          `/api/Artisans/${artisanId}/profile`,
          config,
        );
        let profileData = refreshResponse.data;

        try {
          const portRes = await axios.get("/api/Artisans/portfolio", config);
          profileData.portfolioImages = portRes.data || [];
        } catch (e) {
          console.warn("Failed to fetch portfolio:", e);
        }

        const refreshed = normalizeCraftmanProfile(profileData);
        if (refreshed) {
          onUpdateProfile?.(refreshed);
        }
      } catch (refreshErr) {
        console.warn("تعذر إعادة جلب البيانات بعد رفع الصورة:", refreshErr);
        // fallback: نضيف الصورة محلياً
        const newImgUrl = URL.createObjectURL(file);
        onUpdateProfile?.((prev) => ({
          ...prev,
          worksImages: [...(prev.worksImages || []), newImgUrl],
          portfolioData: [
            ...(prev.portfolioData || []),
            {
              id: response.data?.id || Date.now(),
              url: newImgUrl,
              description: "",
            },
          ],
        }));
      }

      setPortfolioMessage({ type: "success", text: "تم رفع الصورة بنجاح" });
      setTimeout(() => setPortfolioMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      console.error("خطأ في رفع صورة البورتفوليو:", err);
      console.error("Response:", err.response?.data);

      let errorText = "تعذر رفع الصورة، حاول مرة أخرى";
      const errorData = err.response?.data;
      if (typeof errorData === "string") errorText = errorData;
      else if (errorData?.message) errorText = errorData.message;
      else if (errorData?.title) errorText = errorData.title;

      setPortfolioMessage({ type: "error", text: errorText });
      setTimeout(() => setPortfolioMessage({ type: "", text: "" }), 5000);
    } finally {
      setIsUploadingPortfolio(false);
    }
  };

  // ===== حذف صورة من البورتفوليو =====
  const handlePortfolioDelete = async (imageId) => {
    if (!imageId && imageId !== 0) {
      console.error("لا يوجد ID للصورة المراد حذفها");
      setPortfolioMessage({
        type: "error",
        text: "لا يمكن حذف هذه الصورة (لا يوجد معرف)",
      });
      setTimeout(() => setPortfolioMessage({ type: "", text: "" }), 3000);
      return;
    }

    try {
      setDeletingImageId(imageId);
      setShowDeleteConfirm(null);
      setPortfolioMessage({ type: "", text: "" });

      const token = localStorage.getItem("token");

      await axios.delete(`/api/Artisans/portfolio/delete/${imageId}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      console.log("✅ تم حذف صورة البورتفوليو بنجاح، ID:", imageId);

      // إعادة جلب البيانات بعد الحذف
      try {
        const artisanId = craftman?.id;
        if (!artisanId) throw new Error("Missing artisan id for refresh");
        const config = {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        };
        const refreshResponse = await axios.get(
          `/api/Artisans/${artisanId}/profile`,
          config,
        );
        let profileData = refreshResponse.data;

        try {
          const portRes = await axios.get("/api/Artisans/portfolio", config);
          profileData.portfolioImages = portRes.data || [];
        } catch (e) {
          console.warn("Failed to fetch portfolio:", e);
        }

        const refreshed = normalizeCraftmanProfile(profileData);
        if (refreshed) {
          onUpdateProfile?.(refreshed);
        }
      } catch (refreshErr) {
        console.warn("تعذر إعادة جلب البيانات بعد الحذف:", refreshErr);
        // fallback: نحذف الصورة محلياً
        onUpdateProfile?.((prev) => ({
          ...prev,
          portfolioData: (prev.portfolioData || []).filter(
            (img) => img.id !== imageId,
          ),
          worksImages: (prev.worksImages || []).filter(
            (_, idx) => (prev.portfolioData || [])[idx]?.id !== imageId,
          ),
        }));
      }

      setPortfolioMessage({ type: "success", text: "تم حذف الصورة بنجاح" });
      setTimeout(() => setPortfolioMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      console.error("خطأ في حذف صورة البورتفوليو:", err);
      console.error("Response:", err.response?.data);

      let errorText = "تعذر حذف الصورة، حاول مرة أخرى";
      const errorData = err.response?.data;
      if (typeof errorData === "string") errorText = errorData;
      else if (errorData?.message) errorText = errorData.message;
      else if (errorData?.title) errorText = errorData.title;

      setPortfolioMessage({ type: "error", text: errorText });
      setTimeout(() => setPortfolioMessage({ type: "", text: "" }), 5000);
    } finally {
      setDeletingImageId(null);
    }
  };

  const allRatings = craftman.reviews?.map((review) => review.rating) || [];
  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length
      : Number(craftman.rating) || 0;
  const displayedReviews = showAllReviews
    ? craftman.reviews
    : craftman.reviews?.slice(0, 3);

  const renderSideContent = () => {
    // تجهيز بيانات افتراضية لو الداتا جاية من الداشبورد ناقصة
    const aboutData = craftman.about || {
      aboutInfo: "لا توجد معلومات متوفرة حالياً.",
      experience: craftman.experience || "غير محدد",
      area: craftman.location || "غير محدد",
      completedOrders: "0",
    };
    const servicesData = craftman.services || ["تقديم خدمات عامة"];
    const workData = craftman.workInfo || {
      area: craftman.location,
      workingHours: "غير محدد",
      speedOfResponse: "سريع",
      emergencyService: "متاحة",
    };

    switch (activeSideTab) {
      case "basic-info":
        return (
          <ul className="basic-info-content">
            <li className="about-info">
              <FaUser className="icon" /> {aboutData.aboutInfo}
            </li>
            <li className="experience">
              <MdAccessTime className="icon" /> {aboutData.experience}
            </li>
            <li className="area">
              <MdLocationPin className="icon" /> {aboutData.area}
            </li>
            <li className="completed-orders">
              <MdWork className="icon" />{" "}
              {`عدد الطلبات المنفذة : ${aboutData.completedOrders} طلب`}
            </li>
          </ul>
        );
      case "services":
        return (
          <ul className="services-content">
            {servicesData.map((s, i) => (
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
              <BsPin className="icon" /> {`نطاق الخدمة : ${workData.area}`}
            </li>
            <li>
              <MdAccessTime className="icon" />{" "}
              {`ساعات العمل : ${workData.workingHours}`}
            </li>
            <li>
              <ImSpinner3 className="icon" />{" "}
              {`سرعة الاستجابة : ${workData.speedOfResponse}`}
            </li>
            <li>
              <AiOutlineExclamationCircle className="icon" />{" "}
              {`خدمة الطوارئ : ${workData.emergencyService}`}
            </li>
          </ul>
        );
      default:
        return null;
    }
  };

  if (editMode && isOwner) {
    return (
      <div className="edit-form-container">
        <h2>
          {isAccountActive ? "تعديل الملف الشخصي" : "إكمال بيانات الحرفي"}
        </h2>
        {/* 159 */}
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-group top">
            <h3>البيانات الشخصية</h3>
            <input
              type="text"
              name="fullName"
              placeholder="الاسم"
              defaultValue={craftman.ctaftName}
              required
              style={formErrors.fullName ? { borderColor: "#ff6b6b" } : {}}
            />
            {formErrors.fullName && (
              <p className="dob error-msg">{formErrors.fullName}</p>
            )}

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
            <select
              name="maritalStatus"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
            >
              <option value="" disabled>
                الحالة الاجتماعية
              </option>
              <option value="0">افضل عدم الاجابة</option>
              <option value="1">أعزب</option>
              <option value="2">متزوج</option>
              <option value="3">ارمل</option>
              <option value="4">مطلق</option>
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
              onChange={(e) => {
                setPhone(e.target.value);
                setFormErrors((prev) => ({ ...prev, phone: "" }));
              }}
              maxLength={11}
              style={formErrors.phone ? { borderColor: "#ff6b6b" } : {}}
            />
            {formErrors.phone && (
              <p className="dob error-msg">{formErrors.phone}</p>
            )}
            <input
              type="text"
              name="governorate"
              placeholder="المحافظة"
              defaultValue={craftman.about.area}
            />
          </div>
          <div className="form-group middle">
            <h3>البيانات الأساسية</h3>
            <select
              name="job"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              <option value="">اختر الوظيفة</option>
              {JOBS_LIST.map((jobItem) => (
                <option key={jobItem} value={jobItem}>
                  {jobItem}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="experience"
              placeholder="سنوات الخبرة"
              defaultValue={craftman.about.experience}
            />
            {/* <input type="text" placeholder="الخدمات" /> */}
            <textarea
              placeholder="نبذة عن الحرفي"
              value={aboutInfo}
              onChange={(e) => setAboutInfo(e.target.value)}
            />
          </div>
          <div className="form-group bottom">
            <h3>معلومات العمل</h3>
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
            <input
              type="text"
              name="serviceArea"
              placeholder="نطاق الخدمة"
              defaultValue={craftman.workInfo.area}
            />
            <input
              type="text"
              name="workHours"
              placeholder="مواعيد العمل"
              defaultValue={craftman.workInfo.workingHours}
            />
            <select
              name="emergencyService"
              defaultValue={craftman.workInfo.emergencyService || ""}
            >
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormErrors((prev) => ({ ...prev, password: "" }));
                }}
                style={formErrors.password ? { borderColor: "#ff6b6b" } : {}}
              />
              <span
                className="password-eye"
                onClick={() => setShowPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {formErrors.password && (
              <p className="dob error-msg">{formErrors.password}</p>
            )}
            <div className="password-field">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="كلمة السر الجديدة"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setFormErrors((prev) => ({ ...prev, newPassword: "" }));
                }}
                style={formErrors.newPassword ? { borderColor: "#ff6b6b" } : {}}
              />
              <span
                className="password-eye"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {formErrors.newPassword && (
              <p className="dob error-msg">{formErrors.newPassword}</p>
            )}
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="تأكيد كلمة السر"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setFormErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                style={
                  formErrors.confirmPassword ? { borderColor: "#ff6b6b" } : {}
                }
              />
              <span
                className="password-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {formErrors.confirmPassword && (
              <p className="dob error-msg">{formErrors.confirmPassword}</p>
            )}
          </div>
          {submitMessage.text && (
            <p className={`profile-submit-message ${submitMessage.type}`}>
              {submitMessage.text}
            </p>
          )}
          <div className="form-btns">
            <button type="submit" className="save-btn" disabled={isSubmitting}>
              {isSubmitting ? "جاري الحفظ..." : "حفظ"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              disabled={isSubmitting}
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
            {isOwner && (
              <button
                className="activate-btn"
                onClick={() => setEditMode(true)}
              >
                فعل حسابك الآن
              </button>
            )}
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
            <div className="about-section" data-aos="fade-up">
              <div className="side-tabs">
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
              {/* رسالة حالة البورتفوليو */}
              {portfolioMessage.text && (
                <p
                  className={`profile-submit-message ${portfolioMessage.type}`}
                  style={{ marginBottom: "12px", textAlign: "center" }}
                >
                  {portfolioMessage.text}
                </p>
              )}
              <div className="portfolio-grid">
                {/* زر رفع صورة جديدة */}
                {isOwner && (
                  <label
                    className={`work-item upload-box ${isUploadingPortfolio ? "uploading" : ""}`}
                    style={{ position: "relative" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handlePortfolioUpload}
                      disabled={isUploadingPortfolio}
                    />
                    {isUploadingPortfolio ? (
                      <div className="upload-spinner">
                        <ImSpinner3 className="spinning" />
                        <span>جاري الرفع...</span>
                      </div>
                    ) : (
                      <img
                        src="/images/upload.png"
                        alt="upload"
                        className="upload-icon"
                      />
                    )}
                  </label>
                )}
                {/* عرض صور البورتفوليو مع زر الحذف */}
                {(craftman.portfolioData || []).map((imgData, i) => (
                  <div
                    key={imgData.id || i}
                    className="work-item"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={imgData.url}
                      alt="work"
                      className="work-image"
                      onClick={() => setSelectedImage(imgData.url)}
                      style={{ cursor: "pointer" }}
                    />
                    {/* زر حذف الصورة */}
                    {isOwner && imgData.id != null && (
                      <button
                        type="button"
                        className="portfolio-delete-btn"
                        title="حذف الصورة"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(imgData.id);
                        }}
                        disabled={deletingImageId === imgData.id}
                      >
                        {deletingImageId === imgData.id ? (
                          <ImSpinner3 className="spinning" />
                        ) : (
                          <FaTrashAlt />
                        )}
                      </button>
                    )}
                    {/* مودال تأكيد الحذف */}
                    {showDeleteConfirm === imgData.id && (
                      <div className="portfolio-delete-confirm">
                        <p>حذف هذه الصورة؟</p>
                        <div className="portfolio-delete-confirm-btns">
                          <button
                            type="button"
                            className="confirm-yes"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePortfolioDelete(imgData.id);
                            }}
                          >
                            نعم
                          </button>
                          <button
                            type="button"
                            className="confirm-no"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteConfirm(null);
                            }}
                          >
                            لا
                          </button>
                        </div>
                      </div>
                    )}
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
/* ================= PAGE COMPONENT ================= */
const ProfilePage = () => {
  const { id: profileId } = useParams();

  const [craftman, setCraftman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isAccountActive, setIsAccountActive] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchCraftmanProfile = async () => {
      // التحقق من وجود profileId القادم من route
      if (!profileId) {
        setError("تعذر تحديد الحرفي المطلوب عرضه");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        const config = {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        };

        const response = await axios.get(
          `/api/Artisans/${profileId}/profile`,
          config,
        );
        let profileData = response.data;

        // جلب البورتفوليو من المسار المنفصل
        try {
          const portRes = await axios.get(
            `https://etqanproject.runasp.net/api/Artisans/portfolio`,
            config,
          );
          profileData.portfolioImages = portRes.data || [];
        } catch (e) {
          console.warn("Failed to fetch portfolio data:", e);
        }

        const normalized = normalizeCraftmanProfile(profileData);
        setIsOwner(Boolean(normalized?.isOwner));
        setCraftman(normalized);
      } catch (err) {
        console.error("Error fetching craftman profile:", err);
        setError("تعذر تحميل بيانات الحرفي حالياً");
      } finally {
        setLoading(false);
      }
    };

    fetchCraftmanProfile();
  }, [profileId]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleDeleteAccount = async () => {
    setDeleteError("");

    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");

      // ✅ حذف الحساب من قاعدة البيانات
      const response = await axios.delete("/api/Artisans/delete-my-account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ استجابة الحذف:", response.status, response.data);

      // نجح الحذف — نقفل المودال وننظف البيانات
      setShowConfirmModal(false);
      localStorage.clear(); // مسح كل البيانات المحفوظة

      setShowDeleteToast(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      console.error("خطأ في حذف الحساب:", err);
      console.error("السبب الحقيقي للخطأ:", err.response?.data);

      const errorData = err.response?.data;
      let errorText = "تعذر حذف الحساب، حاول مرة أخرى";
      if (typeof errorData === "string") {
        errorText = errorData;
      } else if (errorData?.message) {
        errorText = errorData.message;
      } else if (errorData?.title) {
        errorText = errorData.title;
      }
      setDeleteError(errorText);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="professional-profile-container">
        <p style={{ textAlign: "center", padding: "80px 20px" }}>
          جاري تحميل بيانات الحرفي...
        </p>
      </div>
    );
  }

  if (error || !craftman) {
    return (
      <div className="professional-profile-container">
        <p
          style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "#ff6b6b",
          }}
        >
          {error || "لم يتم العثور على الحرفي"}
        </p>
      </div>
    );
  }

  return (
    <div className="professional-profile-container">
      {isOwner && showConfirmModal && (
        <div
          className="modal-overlay"
          onClick={() => !isDeleting && setShowConfirmModal(false)}
        >
          <div
            className="modal-box delete-confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>تنبيه حذف الحساب</h3>
            <p>
              هل أنت متأكد من حذف الحساب نهائياً؟ لا يمكن التراجع عن هذا
              الإجراء.
            </p>
            {deleteError && (
              <p
                style={{ color: "#ff6b6b", fontSize: "14px", margin: "8px 0" }}
              >
                {deleteError}
              </p>
            )}
            <div className="modal-btns">
              <button
                className="confirm-btn"
                style={{ backgroundColor: "#ff6b6b" }}
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? "جاري الحذف..." : "نعم، احذف الحساب"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowConfirmModal(false)}
                disabled={isDeleting}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {isOwner && showDeleteToast && (
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

      {!isOwner && showRequestModal && (
        <RequestServiceModal
          craftmanName={craftman.ctaftName || craftman.name}
          onClose={() => setShowRequestModal(false)}
        />
      )}

      <ProfileSummary
        craftman={craftman}
        isOwner={isOwner}
        editMode={editMode}
        setEditMode={setEditMode}
        setShowRequestModal={setShowRequestModal}
        setShowConfirmModal={setShowConfirmModal}
        isAccountActive={isAccountActive}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        setProfileFile={setProfileFile}
        coverImg={coverImg}
        setCoverImg={setCoverImg}
        setCoverFile={setCoverFile}
      />

      <ProfileSection
        key={craftman.id}
        craftman={craftman}
        isOwner={isOwner}
        editMode={editMode}
        setEditMode={setEditMode}
        isAccountActive={isAccountActive}
        setIsAccountActive={setIsAccountActive}
        onUpdateProfile={setCraftman}
        profileFile={profileFile}
        coverFile={coverFile}
        profileImg={profileImg}
        coverImg={coverImg}
      />
    </div>
  );
};

export default ProfilePage;
