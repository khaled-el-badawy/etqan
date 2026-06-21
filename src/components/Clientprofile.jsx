import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import axios from "axios";
=======
import { useParams } from "react-router-dom";
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
import "./ClientProfile.css";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaEdit,
  FaExclamationTriangle,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaCamera,
  FaTrashAlt,
  FaCheckCircle,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

<<<<<<< HEAD
const API_BASE = "https://etqanproject.runasp.net";

const getApiImageUrl = (path) => {
  if (!path) return "";
  let formattedPath = path.replace(/\\/g, "/");
  if (formattedPath.startsWith("https") || formattedPath.startsWith("blob:")) return formattedPath;
  const baseUrl = (axios.defaults.baseURL || "https://etqanproject.runasp.net").replace(/\/$/, "");
  if (!formattedPath.startsWith("/")) {
    formattedPath = "/" + formattedPath;
  }
  return `${baseUrl}${formattedPath}`;
};

const normalizeClientProfile = (data) => {
  if (!data) return null;
  console.log("🔥 Raw Client Profile API Data:", data);

  return {
    id: data.id || "",
    name: data.fullName || data.FullName || data.clientName || data.ClientName || data.name || "",
    email: data.email || "",
    phone: data.phoneNumber || data.phone || "",
    location: data.governorate || data.location || "",
    img: getApiImageUrl(data.profilePicture || data.avatar || data.imageUrl) || "",
    cover: getApiImageUrl(data.coverPicture || data.coverPhoto || data.cover) || "",
    verified: data.verified ?? true,
    date: data.joinedDate || data.createdAt || "",
    rating: Number(data.rating ?? 0),
    reviews: Array.isArray(data.reviews)
      ? data.reviews.map((review, index) => ({
        id: review.id ?? index,
        name: review.clientName || review.fullName || review.name || "عميل",
        job: review.job || review.jobName || "عميل",
        date: review.date || review.createdAt || "",
        rating: Number(review.rating ?? 0),
        comment: review.comment || review.review || "",
        img: getApiImageUrl(review.avatar || review.profilePicture || review.imageUrl) || "/images/revewer (1).png",
      }))
      : [],
    history: Array.isArray(data.history)
      ? data.history.map((item, index) => ({
        id: item.id ?? index,
        name: item.craftmanName || item.name || "حرفي",
        job: item.jobName || item.job || "خدمة",
        icon: getApiImageUrl(item.icon || item.imageUrl || item.craftmanAvatar) || "/images/Client profile/Client icon1.svg",
      }))
      : []
  };
};

const ClientProfile = () => {
=======
const ClientProfile = () => {
  const { id } = useParams();
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const [activeTab, setActiveTab] = useState("about");
  const [clientData, setClientData] = useState(null);

  const [showRateModal, setShowRateModal] = useState(false);
  const [showComplainModal, setShowComplainModal] = useState(false);
  const [showEditReviewModal, setShowEditReviewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);
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
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

  useEffect(() => {
    AOS.init({ duration: 1000 });
    loadClientData();
<<<<<<< HEAD
  }, []);

  const loadClientData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("يرجى تسجيل الدخول أولاً");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const userId = localStorage.getItem("userId");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const res = await axios.get(`${API_BASE}/api/ClientProfile/${userId}`, config);
      const mapped = normalizeClientProfile(res.data);
      setClientData(mapped);

      setFormData({
        name: mapped.name,
        email: mapped.email,
        phone: mapped.phone,
        city: mapped.location,
        password: "", newPassword: "", confirmPassword: "",
      });
    } catch (err) {
      console.error("Error fetching client profile:", err);
      console.error("Response status:", err.response?.status);
      console.error("Response data:", err.response?.data);
      setError("تعذر تحميل بيانات العميل");
    } finally {
      setLoading(false);
=======
  }, [id]);

  const loadClientData = () => {
    const savedCustomers =
      JSON.parse(localStorage.getItem("sharedCustomers")) || [];
    const foundClient = savedCustomers.find((c) => c.id === Number(id));

    if (foundClient) {
      setClientData(foundClient);
      setFormData({
        name: foundClient.name || "",
        email: foundClient.email || "",
        phone: foundClient.phone || "",
        city: foundClient.location || "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
<<<<<<< HEAD
      if (type === "img") setProfileFile(file);
      if (type === "cover") setCoverFile(file);
      const preview = URL.createObjectURL(file);
      setClientData((prev) => ({ ...prev, [type]: preview }));
    }
  };

  const handleSavePersonalData = async (e) => {
=======
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedClient = { ...clientData, [type]: reader.result };
        setClientData(updatedClient);

        const savedCustomers =
          JSON.parse(localStorage.getItem("sharedCustomers")) || [];
        const updatedList = savedCustomers.map((c) =>
          c.id === Number(id) ? updatedClient : c,
        );
        localStorage.setItem("sharedCustomers", JSON.stringify(updatedList));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePersonalData = (e) => {
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) newErrors.name = "يرجى إدخال الاسم";
    if (!formData.email) newErrors.email = "ادخل البريد الالكتروني";
    if (!formData.phone) newErrors.phone = "ادخل رقم الهاتف";
    if (!formData.city) newErrors.city = "ادخل المحافظه";

<<<<<<< HEAD
    if (formData.password || formData.newPassword || formData.confirmPassword) {
      if (!formData.password) newErrors.password = "ادخل كلمة السر الحالية";
      if (!formData.newPassword) newErrors.newPassword = "ادخل كلمة السر الجديدة";
      if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = "كلمة السر الجديدة وتأكيدها غير متطابقتين";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const config = { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } };

      const apiFormData = new FormData();
      apiFormData.append("FullName", formData.name);
      apiFormData.append("Email", formData.email);
      apiFormData.append("PhoneNumber", formData.phone);
      apiFormData.append("Governorate", formData.city);
      if (profileFile) apiFormData.append("ProfileFile", profileFile);
      if (coverFile) apiFormData.append("CoverPhotoFile", coverFile);

      await axios.put(`${API_BASE}/api/ClientProfile/update-profile`, apiFormData, config);

      if (formData.password && formData.newPassword) {
        await axios.post(`${API_BASE}/api/ClientProfile/change-password`, {
          currentPassword: formData.password,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }, config);
      }

      await loadClientData();
      setProfileFile(null);
      setCoverFile(null);
      // alert("تم تحديث البيانات بنجاح");
      setActiveTab("about");
    } catch (err) {
      console.error("خطأ في تحديث البيانات:", err);
      const msg = err.response?.data?.message || err.response?.data || "تعذر تحديث البيانات";
      // alert(typeof msg === "string" ? msg : "تعذر تحديث البيانات");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/api/ClientProfile/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsDeletedSuccessfully(true);
      localStorage.clear();
      setTimeout(() => {
        setShowDeleteConfirm(false);
        setIsDeletedSuccessfully(false);
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("خطأ في حذف الحساب:", err);
      // alert(err.response?.data?.message || "تعذر حذف الحساب");
    }
  };
=======
    const savedCustomers =
      JSON.parse(localStorage.getItem("sharedCustomers")) || [];
    const isNameTaken = savedCustomers.some(
      (c) => c.name === formData.name && c.id !== Number(id),
    );
    if (isNameTaken) newErrors.name = "هذا الاسم موجود بالفعل";
    const isEmailTaken = savedCustomers.some(
      (c) => c.email === formData.email && c.id !== Number(id),
    );
    if (isEmailTaken) newErrors.email = "هذا البريد الإلكتروني مستخدم من قبل";
    const isPhoneTaken = savedCustomers.some(
      (c) => c.phone === formData.phone && c.id !== Number(id),
    );
    if (isPhoneTaken) newErrors.phone = "رقم الهاتف هذا مسجل مسبقاً";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const updatedClient = {
        ...clientData,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.city,
      };
      const updatedList = savedCustomers.map((c) =>
        c.id === Number(id) ? updatedClient : c,
      );
      localStorage.setItem("sharedCustomers", JSON.stringify(updatedList));
      setClientData(updatedClient);
      alert("تم تحديث البيانات بنجاح");
      setActiveTab("about");
      };
    };
    const confirmDeleteAccount = () => {
      const savedCustomers = JSON.parse(localStorage.getItem("sharedCustomers")) || [];
      const updatedList = savedCustomers.filter((c) => c.id !== Number(id));
      localStorage.setItem("sharedCustomers", JSON.stringify(updatedList));
      
      setIsDeletedSuccessfully(true);
    
      setTimeout(() => {
        setShowDeleteConfirm(false);
        setIsDeletedSuccessfully(false);
        
        window.location.href = "/"; 
      }, 1000);
    };
    


  const reviews = [
    {
      id: 1,
      name: "احمد علي",
      job: "سباك",
      date: "15/2/2025",
      rating: 5,
      img: "/images/Client profile/icon1.svg",
    },
    {
      id: 2,
      name: "محمد محمود",
      job: "كهربائي",
      date: "5/3/2025",
      rating: 5,
      img: "/images/Client profile/icon2.svg",
    },
    {
      id: 3,
      name: "شركة مكة",
      job: "شركة نقل",
      date: "1/5/2025",
      rating: 4,
      img: "/images/Client profile/icon3.svg",
    },
    {
      id: 4,
      name: "علي محمود",
      job: "فني كاميرات",
      date: "1/5/2025",
      rating: 4,
      img: "/images/Client profile/icon1.svg",
    },
    {
      id: 5,
      name: "سامح حسن",
      job: "نجار",
      date: "10/5/2025",
      rating: 5,
      img: "/images/Client profile/icon2.svg",
    },
  ];

  const historyData = [
    {
      id: 1,
      name: "احمد علي",
      job: "سباك",
      icon: "/images/Client profile/Client icon1.svg",
    },
    {
      id: 2,
      name: "محمد محمود",
      job: "كهربائي",
      icon: "/images/Client profile/Client icon2.svg",
    },
    {
      id: 3,
      name: "شركة مكة",
      job: "شركة نقل",
      icon: "/images/Client profile/Client icon3.svg",
    },
    {
      id: 4,
      name: "علي محمود",
      job: "فني كاميرات",
      icon: "/images/Client profile/Client icon4.svg",
    },
    {
      id: 5,
      name: "ياسر محمد",
      job: "نقاش",
      icon: "/images/Client profile/Client icon1.svg",
    },
  ];
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

  const handleCloseModals = () => {
    setShowRateModal(false);
    setShowComplainModal(false);
    setShowEditReviewModal(false);
    setSelectedRating(0);
    setReviewText("");
    setComplainText("");
    setEditReviewText("");
  };

<<<<<<< HEAD
  if (loading)
=======
  if (!clientData)
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>جاري تحميل بيانات العميل...</h2>
      </div>
    );

<<<<<<< HEAD
  if (error || !clientData)
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#ff6b6b" }}>
        <h2>{error || "لم يتم العثور على بيانات العميل"}</h2>
      </div>
    );

=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  return (
    <div className="profile-container">
      <header
        className="profile-header"
        style={{
          backgroundImage: `url(${clientData.cover || "/images/Client profile/hero.svg"})`,
        }}
      >
        {activeTab === "edit" && (
<<<<<<< HEAD
          <label className="edit-cover-btn">
            <FaCamera />
            <span>تعديل صورة الغلاف</span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImageChange(e, "cover")}
            />
          </label>
        )}
=======
        <label className="edit-cover-btn">
          <FaCamera />
          <span>تعديل صورة الغلاف</span>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleImageChange(e, "cover")}
          />
        </label>
      )}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      </header>

      <div className="profile-identity-wrapper" data-aos="fade-left">
        <div className="identity-content">
          <div className="avatar-container">
            <img
<<<<<<< HEAD
              src={clientData.img || "/images/Client profile/Virtual.jpeg"}
=======
              src={
                clientData.img ||
                clientData.avatar ||
                "/images/Client profile/Virtual.jpeg"
              }
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              alt={clientData.name}
              className="main-avatar"
              onError={(e) => {
                e.target.src = "/images/Client profile/Virtual.jpeg";
              }}
            />
<<<<<<< HEAD
            {activeTab === "edit" && (
              <label className="edit-avatar-badge">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(e, "img")}
                />
              </label>
            )}
=======
            {activeTab === "edit"&&(
            <label className="edit-avatar-badge">
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageChange(e, "img")}
              />
            </label>
          )}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          </div>
          <div className="name-verify-block">
            <h2 className="client-name">
              {clientData.name}
<<<<<<< HEAD
              {clientData.verified && (
                <img
                  src="/images/Client profile/profilelogo1.svg"
                  alt="Verified"
                  className="verify-tick"
                />
              )}
=======
              <img
                src="/images/Client profile/profilelogo1.svg"
                alt="Verified"
                className="verify-tick"
              />
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              <img
                src="/images/Client profile/profilelogo2.svg"
                alt="Edit"
                className="edit-name-icon"
                onClick={() => setActiveTab("edit")}
              />
            </h2>
          </div>

          {activeTab === "edit" && (
            <button
              type="button"
              className="btn-delete-account"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <FaTrashAlt /> حذف الحساب
            </button>
          )}
        </div>
      </div>

      {activeTab !== "edit" && (
        <div className="profile-tabs">
          <button
            className={`tab-item ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            عن العميل
          </button>
          <button
            className={`tab-item ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            تقييمات
          </button>
        </div>
      )}

      {activeTab === "about" && (
        <div className="about-content-card" data-aos="fade-up">
          <div className="history-label-box">السجلات السابقه</div>
          <div className="history-list">
<<<<<<< HEAD
            {clientData.history && clientData.history.length > 0 ? (
              clientData.history.slice(0, visibleHistory).map((item) => (
                <div key={item.id} className="history-item-row">
                  <div className="history-user-info">
                    <img src={item.icon} alt="icon" className="category-icon" onError={(e) => { e.target.src = "/images/Client profile/Client icon1.svg"; }} />
                    <div className="user-text">
                      <h4>{item.name}</h4>
                      <p>{item.job}</p>
                    </div>
                  </div>
                  <div className="history-rating-side">
                    <button
                      className="small-rate-btn"
                      onClick={() => setShowRateModal(true)}
                    >
                      <span>تقييم </span>
                      <span>★★★</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", color: "#888", padding: "20px" }}>لا توجد سجلات سابقة</p>
            )}
          </div>
          {clientData.history && visibleHistory < clientData.history.length && (
=======
            {historyData.slice(0, visibleHistory).map((item) => (
              <div key={item.id} className="history-item-row">
                <div className="history-user-info">
                  <img src={item.icon} alt="icon" className="category-icon" />
                  <div className="user-text">
                    <h4>{item.name}</h4>
                    <p>{item.job}</p>
                  </div>
                </div>
                <div className="history-rating-side">
                  <button
                    className="small-rate-btn"
                    onClick={() => setShowRateModal(true)}
                  >
                    <span>تقييم </span>
                    <span>★★★</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {visibleHistory < historyData.length && (
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            <button
              className="show-more-arrow"
              onClick={() => setVisibleHistory(visibleHistory + 4)}
            >
              عرض المزيد ∨
            </button>
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="reviews-section-card" data-aos="zoom-in">
          <div className="rating-header-row">
            <h3 className="section-title">التقييمات</h3>
            <div className="rating-summary-box">
              <div className="bars-side">
                {[5, 4, 3, 2, 1].map((num) => (
                  <div key={num} className="bar-row">
                    <span className="bar-label">{num}</span>
                    <div className="bar-track">
                      <div
                        className="bar-level"
                        style={{ width: num === 5 ? "90%" : "5%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="score-side">
<<<<<<< HEAD
                <span className="big-score">{clientData.rating ? clientData.rating.toFixed(1) : "0.0"}</span>
=======
                <span className="big-score">4.8</span>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                <div className="stars-icons-rtl">
                  <FaStarHalfAlt />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
          </div>
          <div className="reviews-feed">
<<<<<<< HEAD
            {clientData.reviews && clientData.reviews.length > 0 ? (
              clientData.reviews.slice(0, visibleReviews).map((rev) => (
                <div key={rev.id} className="review-card-item">
                  <div className="user-meta">
                    <img src={rev.img} alt={rev.name} onError={(e) => { e.target.src = "/images/revewer (1).png"; }} />
                    <div className="user-text">
                      <h4>{rev.name}</h4>
                      <p>{rev.job}</p>
                    </div>
                  </div>
                  <div className="review-status">
                    <span className="date-stamp">{rev.date}</span>
                    <div className="stars-group">
                      {[...Array(5)].map((_, i) =>
                        i < rev.rating ? (
                          <FaStar key={i} />
                        ) : (
                          <FaRegStar key={i} />
                        ),
                      )}
                    </div>
                  </div>
                  {rev.comment && (
                    <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
                      {rev.comment}
                    </p>
                  )}
                  <div className="review-btns">
                    <button
                      className="btn-edit-rev"
                      onClick={() => setShowEditReviewModal(true)}
                    >
                      <FaEdit /> تعديل
                    </button>
                    <button
                      className="btn-complain"
                      onClick={() => setShowComplainModal(true)}
                    >
                      <FaExclamationTriangle /> شكوي
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", color: "#888", padding: "20px" }}>لا توجد تقييمات حتى الآن</p>
            )}
          </div>
          {clientData.reviews && visibleReviews < clientData.reviews.length && (
            <button
              className="load-more"
              onClick={() => setVisibleReviews(clientData.reviews.length)}
=======
            {reviews.slice(0, visibleReviews).map((rev) => (
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
                    {[...Array(5)].map((_, i) =>
                      i < rev.rating ? (
                        <FaStar key={i} />
                      ) : (
                        <FaRegStar key={i} />
                      ),
                    )}
                  </div>
                </div>
                <div className="review-btns">
                  <button
                    className="btn-edit-rev"
                    onClick={() => setShowEditReviewModal(true)}
                  >
                    <FaEdit /> تعديل
                  </button>
                  <button
                    className="btn-complain"
                    onClick={() => setShowComplainModal(true)}
                  >
                    <FaExclamationTriangle /> شكوي
                  </button>
                </div>
              </div>
            ))}
          </div>
          {visibleReviews < reviews.length && (
            <button
              className="load-more"
              onClick={() => setVisibleReviews(reviews.length)}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            >
              عرض كل التقييمات ↓
            </button>
          )}
        </div>
      )}

      {activeTab === "edit" && (
        <div className="edit-details-card" data-aos="fade-left">
          <div className="edit-nav-tab">التفاصيل شخصية</div>
          <h3 className="form-title">البيانات الشخصية</h3>
          <form
            className="personal-data-form"
            onSubmit={handleSavePersonalData}
          >
            <div className="input-group-wrapper">
              <input
                type="text"
                name="name"
                placeholder="الاسم الكامل"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
            <div className="input-group-wrapper">
              <input
                type="email"
                name="email"
                placeholder="البريد الالكتروني"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="error-msg">{errors.email}</span>
              )}
            </div>
            <div className="input-group-wrapper">
              <input
                type="tel"
                name="phone"
                placeholder="رقم الهاتف"
                className="form-input"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && (
                <span className="error-msg">{errors.phone}</span>
              )}
            </div>
            <div className="input-group-wrapper">
              <input
                type="text"
                name="city"
                placeholder="المحافظة"
                className="form-input"
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && <span className="error-msg">{errors.city}</span>}
            </div>
<<<<<<< HEAD

            <h3 className="form-title-pas" style={{ display: 'block', width: '100%', textAlign: 'right', marginRight: '-28%' }}>تغيير كلمة السر</h3>
            <div className="input-group-wrapper password-wrapper">

=======
       
          <h3 className="form-title-pas" style={{display:'block',width:'100%',textAlign:'right',marginRight:'-28%'}}>تغيير كلمة السر</h3>
            <div className="input-group-wrapper password-wrapper">
              
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="كلمه السر الحالية"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
<<<<<<< HEAD
                {showPass ? <FaEye /> : < FaEyeSlash />}
              </span>
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
              <button type="submit" className="btn-save" disabled={isSubmitting}>
                {isSubmitting ? "جاري الحفظ..." : "حفظ"}
=======
                {showPass ? <FaEye /> : < FaEyeSlash/>}
              </span>
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
              <button type="submit" className="btn-save">
                حفظ
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setActiveTab("about")}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {showRateModal && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="zoom-in">
            <button className="close-modal" onClick={handleCloseModals}>
              <FaTimes />
            </button>
            <h3>قيم الخدمة</h3>
            <div className="interactive-stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={
                    star <= selectedRating ? "star-active" : "star-inactive"
                  }
                  onClick={() => setSelectedRating(star)}
                />
              ))}
            </div>
            <textarea
              placeholder="اكتب تقييمك..."
              className="modal-textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <button
              className="modal-submit-btn"
              onClick={() => {
                if (selectedRating && reviewText) {
<<<<<<< HEAD
                  // alert("تم التقييم");
                  handleCloseModals();
                } else
                  alert("أكمل التقييم");
=======
                  alert("تم التقييم");
                  handleCloseModals();
                } else alert("أكمل التقييم");
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              }}
            >
              إرسال
            </button>
          </div>
        </div>
      )}

      {showEditReviewModal && (
        <div className="modal-overlay">
          <div className="modal-content edit-review-modal" data-aos="zoom-in">
            <button className="close-modal" onClick={handleCloseModals}>
              <FaTimes />
            </button>
            <h3 className="modal-title-custom">عدل تقييمك.</h3>
            <textarea
              placeholder="اكتب هنا..."
              className="modal-textarea-custom"
              value={editReviewText}
              onChange={(e) => setEditReviewText(e.target.value)}
            ></textarea>
            <button
              className="modal-submit-btn-custom"
              onClick={() => {
                if (editReviewText.trim() === "")
                  alert("من فضلك اكتب نص التقييم");
                else {
                  alert("تم تعديل التقييم بنجاح");
                  handleCloseModals();
                }
              }}
            >
              إرسال
            </button>
          </div>
        </div>
      )}

      {showComplainModal && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="zoom-in">
            <button className="close-modal" onClick={handleCloseModals}>
              <FaTimes />
            </button>
            <h3>قدم شكوتك</h3>
            <textarea
              placeholder="اكتب شكوتك هنا..."
              className="modal-textarea"
              value={complainText}
              onChange={(e) => setComplainText(e.target.value)}
            ></textarea>
            <button
              className="modal-submit-btn"
              onClick={() => {
                if (complainText.trim() === "")
                  alert("من فضلك اكتب نص الشكوى أولاً");
                else {
                  alert("تم إرسال الشكوى بنجاح");
                  handleCloseModals();
                }
              }}
            >
              إرسال
            </button>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          {!isDeletedSuccessfully ? (
            <div className="modal-content delete-modal-content" data-aos="zoom-in">
              <button className="close-modal" onClick={() => setShowDeleteConfirm(false)}>
                <FaTimes />
              </button>
              <h3 className="modal-title-delete">تنبيه حذف الحساب</h3>
              <p className="modal-p-delete">هل أنت متأكد من حذف الحساب نهائياً؟ لا يمكن التراجع عن هذا الإجراء.</p>
              <div className="delete-modal-buttons">
                <button className="btn-confirm-delete" onClick={confirmDeleteAccount}>نعم</button>
                <button className="btn-cancel-delete" onClick={() => setShowDeleteConfirm(false)}>إلغاء</button>
              </div>
            </div>
          ) : (
            <div className="modal-content delete-modal-content" data-aos="zoom-in">
              <div className="success-icon-wrapper">
                <FaCheckCircle size={80} color="#ff6b6b" />
              </div>
              <h3 className="success-msg-delete">تم حذف الحساب بنجاح</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default ClientProfile;
=======
export default ClientProfile;
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
