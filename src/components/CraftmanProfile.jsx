import React, { useEffect, useState } from "react";
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
} from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { BsPin } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { PiScrewdriverFill } from "react-icons/pi";
import { FaArrowDown, FaArrowUp, FaCalendarAlt } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

/* =======================
   Mock Data
======================= */
const handiesData = [
  {
    id: 1,
    name: "احمد علي",
    job: "كهربائي منازل وتشطيبات",
    rating: 0,
    verified: true,
    avatar: "/images/Ellipse 321.png",
    cover: "/images/profile-cover.png",

    ////////////////////////////// about craftman
    //basic info
    about: {
      aboutInfo:
        "كهربائي متخصص في جميع أعمال الكهرباء المنزلية والتجارية، أعمل بدقة واهتمام بأدق التفاصيل، مع الالتزام التام بمعايير الأمان وجودة التنفيذ، وهدفي الأساسي هو تقديم خدمة مضمونة ترضي العميل.",
      experience: "8 سنوات",
      area: "القاهرة والجيزة",
      completedOrders: "0",
    },
    //services
    services: [
      "تأسيس كهرباء الشقق والفيلات",
      "صيانة الأعطال الكهربائية",
      "تركيب وحدات الإضاءة والنجف",
      "فحص الأعطال ومعالجة القفلات",
      "تركيب مفاتيح وبرايز",
      "تركيب لوحات التوزيع",
    ],
    //work info
    workInfo: {
      area: " القاهرة - الجيزة - 6 أكتوبر - الشيخ زايد",
      workingHours: "من 9 صباحًا حتى 9 مساءً",
      speedOfResponse: "خلال ساعة",
      emergencyService: "متاحة",
    },
    ////////////////////////////// works images
    // ------------------cat------------------------------------
    // worksCategories: [
    //   {
    //     id: 1,
    //     title: "تشطيبات",
    //     cover: "/images/work (4).png",
    //     images: [
    //       "/images/work (5).png",
    //       "/images/work (4).png",
    //       "/images/work (6).png",
    //     ],
    //   },
    //   {
    //     id: 2,
    //     title: "إضاءة",
    //     cover: "/images/work (1).png",
    //     images: [
    //       "/images/work (1).png",
    //       "/images/work (6).png",
    //       "/images/work (6).png",
    //       "/images/work (8).png",
    //       "/images/work (9).png",
    //       "/images/work (9).png",
    //       "/images/work (1).png",
    //     ],
    //   },
    // ],
    // ------------------------------------------------------
    ////////////////////////////// works images
    worksImages: [
      "/images/work (1).png",
      "/images/work (2).png",
      "/images/work (6).png",
      "/images/work (1).png",
      "/images/work (2).png",
      "/images/work (6).png",
      "/images/work (7).png",
      "/images/work (8).png",
      "/images/work (9).png",
      "/images/work (1).png",
      "/images/work (2).png",
      "/images/work (1).png",
      "/images/work (8).png",
      "/images/work (9).png",
      "/images/work (6).png",
      "/images/work (7).png",
      "/images/work (8).png",
      "/images/work (9).png",
      "/images/work (2).png",
    ],
    ////////////////////////////// reviews
    reviews: [
      {
        id: 1,
        name: "محمد رفعت",
        date: "21/8/2025",
        rating: 5,
        comment:
          "الحرفي وصل في الموعد المحدد بالضبط، وكان محترم جدًا في التعامل. فحص المشكلة الأول وشرح لي سببها قبل ما يبدأ الشغل، وبعدها نفّذ الإصلاح بسرعة ونظافة. بصراحة تجربة مريحة وموثوقة",
        avatar: "/images/revewer (1).png",
      },
      {
        id: 2,
        name: "أحمد السيد",
        date: "21/8/2025",
        rating: 4,
        comment:
          "عجبني جدًا أسلوب التعامل، كان صبور وشرح لي كل خطوة قبل التنفيذ. عرض عليّ أكثر من حل وخلاني أختار الأنسب، وده خلاني أحس بثقة كبيرة في الخدمة.",
        avatar: "/images/revewer (2).png",
      },
      {
        id: 3,
        name: "سارة جمال",
        date: "21/8/2025",
        rating: 5,
        comment:
          "كنت محتاجة الإصلاح يتم بسرعة، والحرفي لبّى الطلب في نفس اليوم. الشغل كان مرتب ومحترف، وحسّيت إن فيه اهتمام حقيقي بالتفاصيل.",
        avatar: "/images/revewer (3).png",
      },
      {
        id: 1,
        name: "محمد رفعت",
        date: "21/8/2025",
        rating: 5,
        comment:
          "الحرفي وصل في الموعد المحدد بالضبط، وكان محترم جدًا في التعامل. فحص المشكلة الأول وشرح لي سببها قبل ما يبدأ الشغل، وبعدها نفّذ الإصلاح بسرعة ونظافة. بصراحة تجربة مريحة وموثوقة",
        avatar: "/images/revewer (1).png",
      },
      {
        id: 2,
        name: "أحمد السيد",
        date: "21/8/2025",
        rating: 5,
        comment:
          "عجبني جدًا أسلوب التعامل، كان صبور وشرح لي كل خطوة قبل التنفيذ. عرض عليّ أكثر من حل وخلاني أختار الأنسب، وده خلاني أحس بثقة كبيرة في الخدمة.",
        avatar: "/images/revewer (2).png",
      },
      {
        id: 3,
        name: "سارة جمال",
        date: "21/8/2025",
        rating: 2,
        comment:
          "كنت محتاجة الإصلاح يتم بسرعة، والحرفي لبّى الطلب في نفس اليوم. الشغل كان مرتب ومحترف، وحسّيت إن فيه اهتمام حقيقي بالتفاصيل.",
        avatar: "/images/revewer (3).png",
      },
    ],
  },
  // -----------------------------------------------------------------------------------------
  {
    id: 2,
    name: "أحمد علي",
    job: "سباك",
    rating: 0,
    verified: false,
    avatar: "/images/test.avif",
    cover: "/images/cover2.png",

    // about craftman
    //basic info
    about: {
      aboutInfo:
        "سباك متخصص في جميع أعمال السباكة المنزلية والتجارية، أعمل بدقة واهتمام بأدق التفاصيل، مع الالتزام التام بمعايير الأمان وجودة التنفيذ، وهدفي الأساسي هو تقديم خدمة مضمونة ترضي العميل.",
      experience: "10 سنوات",
      area: "المنصورة والدقهلية",
      completedOrders: "+90",
    },
    //services
    services: [
      "تأسيس السباكة الشقق والفيلات",
      "صيانة مواسير المياه والصرف الصحي",
      "تشطيبات الحمامات والمطابخ",
      "فحص الأعطال ومعالجةت",
    ],
    // work info
    workInfo: {
      area: "المنصورة احمد ماهر - المنصورة - الدقهلية",
      workingHours: "من 9 صباحًا حتى 5 مساءً",
      speedOfResponse: "اقل من ساعة",
      emergencyService: "متاحة",
    },
    // -------------------------------------------------
    // worksCategories: [
    //   {
    //     id: 1,
    //     title: "تشطيبات",
    //     cover: "/images/work (6).png",
    //     images: [
    //       "/images/work (1).png",
    //       "/images/work (5).png",
    //       "/images/work (2).png",
    //     ],
    //   },
    //   {
    //     id: 2,
    //     title: "إضاءة",
    //     cover: "/images/work (5).png",
    //     images: ["/images/work (5).png", "/images/work (5).png"],
    //   },
    // ],
    // -------------------------------------------------
    ////////////////////////////// works images
    worksImages: [
      "/images/work (1).png",
      "/images/work (9).png",
      "/images/work (2).png",
    ],
    reviews: [],
  },
];

/* =======================
   Profile Summary
======================= */
function ProfileSummary({ craftman, editMode, setEditMode }) {
  // حساب التقييمات عشان نطلع المتوسط ونحسب النسبة لكل تقييم في بار التقييمات
  const allRatings = craftman.reviews?.map((review) => review.rating) || [];
  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length
      : 0;

  return (
    <>
      <div className="coverBox" data-aos="fade-down">
        <img src={craftman.cover} alt="cover" />

        {editMode && (
          <label className="edit-avatar-label">
            <input type="file" accept="image/*" hidden />
            تعديل صورة الغلاف
            <img src="/images/f7_camera-fill.svg" alt="" />
          </label>
        )}
      </div>

      <section className="profile-summary">
        <div className="profile-info">
          <div className="prson-data">
            {/* avatar لازم يكون هنا داخل prson-data */}

            <div className="profile-avatar" data-aos="fade-up">
              <img className="avatar" src={craftman.avatar} alt={craftman.name} />
              {editMode && (
                <label className="edit-avatar-label">
                  <input type="file" accept="image/*" hidden />
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
                    style={{ display: craftman.verified ? "block" : "none" }}
                  />
                )}
                {craftman.name}
              </h2>

              <p>{craftman.job}</p>
              <span>
                <img src="/images/star.png" alt="Star" className="star-icon" />{" "}
                {avgRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="action-btns">
          <button
            className="edit-profile-btn"
            onClick={() => setEditMode(true)}
          >
            <MdModeEdit />
          </button>

          <button className="request-service-btn">طلب خدمة</button>
        </div>
      </section>
    </>
  );
}

/* =======================
   Profile Section
======================= */
function ProfileSection({ craftman, editMode, setEditMode }) {
  // هتتحكم في التبويبات الرئيسية (عن الحرفي - الأعمال - التقييمات)
  const [activeMainTab, setActiveMainTab] = useState("about");
  // هتتحكم في التبويبات الجانبية في قسم عن الحرفي
  const [activeSideTab, setActiveSideTab] = useState("basic-info");
  // works section states
  const [selectedImage, setSelectedImage] = useState(null);
  // لما يضغط على مجموعة أعمال معينة عشان يشوف صورها
  // const [selectedCategory, setSelectedCategory] = useState(null);
  //  عشان نتحكم في عرض كل التقييمات أو 3 تقييمات فقط
  const [showAllReviews, setShowAllReviews] = useState(false);
  //  عشان نتحكم في قيمة سعر الخدمة في نموذج تعديل الملف الشخصي بحيث يكون رقم فقط ويتقرب لأقرب 5 جنيه
  const [price, setPrice] = useState("");
  //  عشان نتحكم في صحة البريد الإلكتروني في نموذج تعديل الملف الشخصي
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  //  عشان نتحكم في صحة رقم الهاتف في نموذج تعديل الملف الشخصي
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  //  عشان نتحكم في اظهار كلمة السر أو اخفائها في نموذج تعديل الملف الشخصي
  const [password, setPassword] = useState("");
  const [showCurrentPassword, setShowPassword] = useState(false);
  //  عشان نتحكم في اظهار كلمة السر الجديدة أو اخفائها في نموذج تعديل الملف الشخصي
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  //  عشان نتحكم في اظهار تأكيد كلمة السر الجديدة أو اخفائها في نموذج تعديل الملف الشخصي
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
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
          const age18Date = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
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

  /////////////////////////////////
  // عشان نتحقق إذا كانت كلمة السر الجديدة وتأكيدها متطابقين ولا لأ
  const passwordsNotMatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;
  // عشان نتحقق من صحة النموذج قبل الحفظ (تقدر تضيف باقي الحقول اللي انت عايزها)

  // عشان نتحقق من صحة البريد الإلكتروني في نموذج تعديل الملف الشخصي
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length > 0 && !emailRegex.test(value)) {
      setEmailError("يرجى إدخال بريد إلكتروني صالح");
    } else if (value.length === 0) {
      setEmailError("");
    } else {
      setEmailError("");
    }
  };

  // عشان نتحقق من صحة رقم الهاتف في نموذج تعديل الملف الشخصي
  const phoneRegex = /^01[0125][0-9]{8}$/;

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    if (value.length > 0 && !phoneRegex.test(value)) {
      setPhoneError(
        "يجب ان يبدأ رقم الهاتف ب 010 او 011 او 012 او 015 و وان يتكون من 11 رقم",
      );
    } else {
      setPhoneError("");
    }
  };
  // عشان نتحكم في قيمة سعر الخدمة في نموذج تعديل الملف الشخصي بحيث يكون رقم فقط ويتقرب لأقرب 5 جنيه
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handlePriceBlur = () => {
    let value = parseInt(price);

    if (isNaN(value) || value < 5) {
      value = 5;
    } else {
      value = Math.ceil(value / 5) * 5;
    }

    setPrice(value);
  };
  // عشان نتحقق من صحة النموذج قبل الحفظ (تقدر تضيف باقي الحقول اللي انت عايزها)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordsNotMatch || emailError || phoneError || dobError) {
      return;
    }

    console.log("form submitted");
  };

  //-------------------------------------------------------------
  // حساب التقييمات عشان نطلع المتوسط ونحسب النسبة لكل تقييم في بار التقييمات
  const allRatings = craftman.reviews?.map((review) => review.rating) || [];
  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length
      : 0;

  const displayedReviews = showAllReviews
    ? craftman.reviews
    : craftman.reviews?.slice(0, 3);

  const renderSideContent = () => {
    switch (activeSideTab) {
      case "basic-info":
        return (
          <ul className="basic-info-content">
            <li className="about-info">
              <FaUser className="icon" />
              {craftman.about.aboutInfo}
            </li>
            <li className="experience">
              <MdAccessTime className="icon" />
              {craftman.about.experience}
            </li>
            <li className="area">
              <MdLocationPin className="icon" />
              {craftman.about.area}
            </li>
            <li className="completed-orders">
              <MdWork className="icon" />
              {`عدد الطلبات المنفذة : ${craftman.about.completedOrders} طلب`}
            </li>
          </ul>
        );

      case "services":
        return (
          <ul className="services-content">
            {craftman.services.map((service, index) => {
              return (
                <>
                  <li key={index}>
                    <PiScrewdriverFill className="icon" />
                    {service}
                  </li>
                </>
              );
            })}
          </ul>
        );

      case "work-info":
        return (
          <ul className="work-info-content">
            <li>
              <BsPin className="icon" />
              {`نطاق الخدمة : ${craftman.workInfo.area}`}
            </li>
            <li>
              <MdAccessTime className="icon" />
              {`ساعات العمل : ${craftman.workInfo.workingHours}`}
            </li>
            <li>
              <ImSpinner3 className="icon" />
              {`سرعة الاستجابة : ${craftman.workInfo.speedOfResponse}`}
            </li>
            <li>
              <AiOutlineExclamationCircle className="icon" />
              {`خدمة الطوارئ : ${craftman.workInfo.emergencyService}`}
            </li>
          </ul>
        );

      default:
        return null;
    }
  };
  // renderSideContent هتستخدمها عشان تعرض المحتوي علي اليسار حسب التبويب الجانبي اللي المستخدم ضاغط عليه في قسم عن الحرفي
  if (editMode) {
    return (
      <div className="edit-form-container">
        <h2>تعديل الملف الشخصي</h2>

        <form
          className="edit-profile-form"
          data-aos="fade-up"
          data-aos-once="true"
          onSubmit={handleSubmit}
        >
          <div className="form-group top">
            <h3>البيانات الشخصية</h3>
            <input type="text" id="name" placeholder="الاسم" />
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

            <select name="marital-status" id="marital-status">
              <option value="">اختر الحالة الاجتماعية</option>
              <option value="متزوج">متزوج</option>
              <option value="أعزب">أعزب</option>
              <option value="ارمل">ارمل</option>
              <option value="مطلق">مطلق</option>
              {/* <option value="مطلق">افضل عدم الإجابة</option> */}
            </select>
            <input
              type="email"
              id="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p className="email error-msg">{emailError}</p>}
            <input
              type="tel"
              id="phone"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={11}
            />
            {phoneError && <p className="phone error-msg">{phoneError}</p>}
            <input type="text" id="address" placeholder="المحافظة" />
          </div>
          {/*  */}
          <div className="form-group middle">
            <h3>البيانات الأساسية</h3>
            <input type="text" id="job" placeholder="عن الحرفي" />
            <input type="text" id="years" placeholder="سنوات الخبرة" />
            <input type="text" id="services" placeholder="الخدمات" />
          </div>
          {/*  */}
          <div className="form-group bottom">
            <h3>معلومات العمل</h3>
            <input type="text" id="area" placeholder="نطاق الخدمة" />
            <input
              type="number"
              inputMode="tel"
              id="price"
              placeholder="سعر الخدمة"
              step={5}
              min={5}
              value={price}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
            />
            <input type="text" id="working-hours" placeholder="مواعيد العمل" />
            <input
              type="text"
              id="speed-of-response"
              placeholder="وقت الاستجابة"
            />
            <select id="emergency-service" placeholder="خدمة الطوارئ">
              <option value="">اختر خدمة الطوارئ</option>
              <option value="متاحة">متاحة</option>
              <option value="غير متاحة">غير متاحة</option>
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
              <span
                className="password-eye"
                onClick={() => setShowPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>

            {/*  */}

            <div className="password-field">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="كلمة السر الجديدة"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="password-eye"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>

            {/*  */}

            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="تأكيد كلمة السر"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="password-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {passwordsNotMatch ? <FiEye /> : <FiEyeOff />}
              </span>
              {passwordsNotMatch && (
                <p className="password error-msg">
                  يجب أن تكون كلمة السر مطابقة
                </p>
              )}
            </div>
          </div>

          {/*  */}
          <div className="form-btns">
            {/* <button type="submit" className="save-btn">
              حفظ
            </button> */}
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
      {
       
      }
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

      {/* المحتوي */}
      {activeMainTab === "about" && (
        <div className="about-section">
          {/* Vertical Tabs */}
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

          {/* المحتوي (علي اليسار) */}
          <div className="side-content">{renderSideContent()}</div>
        </div>
      )}

  
      {/* --------------------------------------------- */}
      {activeMainTab === "works" && (
        <div className="portfolio-section">
          <div className="portfolio-grid">
            {/* upload box */}
            <label className="work-item upload-box">
              <input type="file" accept="image/*" className="input-file" />
              <img
                src="/images/upload.png"
                alt="upload"
                className="upload-icon"
              />
            </label>

            {/* images map */}
            {craftman.worksImages.map((image, index) => (
              <div
                key={index}
                className="work-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-once="true"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Work ${index + 1}`}
                  className="work-image"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* --------------------------------------------- */}
      {activeMainTab === "reviews" && (
        <div className="reviews-section">
          {/* ================= Rating Summary ================= */}
          <h1 className="reviews-title">التقييمات وآراء العملاء</h1>
          <div className="rating-summary">
            <div className="rating-summary-box">
              <div className="rating-score">
                <h2>{avgRating.toFixed(1)}</h2>

                <div className="review-stars">
                  {[...Array(5)].map((_, index) => {
                    return (
                      <span
                        key={index}
                        className={
                          index < Math.round(avgRating) ? "filled" : ""
                        }
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="rating-bars">
                {[5, 4, 3, 2, 1].map((star, index) => {
                  const count = craftman.reviews
                    ? craftman.reviews.filter(
                        (review) => review.rating === star,
                      ).length
                    : 0;

                  const percent =
                    craftman.reviews && craftman.reviews.length > 0
                      ? (count / craftman.reviews.length) * 100
                      : 0;

                  return (
                    <div key={index} className="rating-bar">
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

          {/* ================= Reviews List ================= */}
          {craftman.reviews && craftman.reviews.length > 0 ? (
            displayedReviews.map((review, index) => {
              return (
                <div
                  key={index}
                  className="review-card"
                  data-aos="fade-left"
                  data-aos-delay={index * 100}
                >
                  <div className="review-card-content">
                    <div className="review-header">
                      <div className="review-avatar">
                        <img src={review.avatar} alt={review.name} />
                      </div>
                      <h4>{review.name}</h4>
                    </div>
                    <div className="rate-and-date">
                      <span>{review.date}</span>
                      <div className="review-stars">
                        {[...Array(allRatings[index])].map((_, starIndex) => {
                          return (
                            <span
                              key={starIndex}
                              className={
                                starIndex < review.rating ? "filled" : ""
                              }
                            >
                              ★
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <p className="comment">{review.comment}</p>
                </div>
              );
            })
          ) : (
            <p className="no-reviews" data-aos="fade-up">
              <span>لا توجد تقييمات حتى الآن</span>
            </p>
          )}
          {craftman.reviews.length > 3 && (
            <div className="show-all-reviews">
              <button onClick={() => setShowAllReviews(!showAllReviews)}>
                {showAllReviews ? <FaArrowUp /> : <FaArrowDown />}
                <span>{showAllReviews ? "عرض أقل" : "عرض كل التقييمات"}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* --------------------------------------------- */}
      {selectedImage && (
        <div
          className="image-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
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

/* =======================
   Page Components
======================= */
const ProfilePage = () => {
  const { id = 1 } = useParams();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const craftman = handiesData.find((e) => e.id === Number(id));

  if (!craftman) return <p>Not Found</p>;

  return (
    <div className="professional-profile-container">
      {/* مرر setEditMode */}
      <ProfileSummary
        craftman={craftman}
        editMode={editMode}
        setEditMode={setEditMode}
      />

      {/* مرر editMode */}
      <ProfileSection
        craftman={craftman}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
};

export default ProfilePage;
