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
import { FaArrowDown, FaArrowUp, FaCalendarAlt } from "react-icons/fa";
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
      aboutInfo: "كهربائي متخصص في جميع أعمال الكهرباء المنزلية والتجارية، أعمل بدقة واهتمام بأدق التفاصيل، مع الالتزام التام بمعايير الأمان وجودة التنفيذ، وهدفي الأساسي هو تقديم خدمة مضمونة ترضي العميل.",
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
      "/images/work (1).png", "/images/work (2).png", "/images/work (6).png", "/images/work (7).png", "/images/work (8).png", "/images/work (9).png", "/images/work (1).png", "/images/work (2).png", "/images/work (6).png", "/images/work (7).png", "/images/work (8).png", "/images/work (9).png", "/images/work (2).png",
    ],
    reviews: [
      { id: 1, ctaftName: "محمد رفعت", date: "21/8/2025", rating: 5, comment: "الحرفي وصل في الموعد المحدد بالضبط، وكان محترم جدًا في التعامل. فحص المشكلة الأول وشرح لي سببها قبل ما يبدأ الشغل، وبعدها نفّذ الإصلاح بسرعة ونظافة. بصراحة تجربة مريحة وموثوقة", avatar: "/images/revewer (1).png" },
      { id: 2, ctaftName: "أحمد السيد", date: "21/8/2025", rating: 4, comment: "عجبني جدًا أسلوب التعامل، كان صبور وشرح لي كل خطوة قبل التنفيذ. عرض عليّ أكثر من حل وخلاني أختار الأنسب، وده خلاني أحس بثقة كبيرة في الخدمة.", avatar: "/images/revewer (2).png" },
      { id: 3, ctaftName: "سارة جمال", date: "21/8/2025", rating: 5, comment: "كنت محتاجة الإصلاح يتم بسرعة، والحرفي لبّى الطلب في نفس اليوم. الشغل كان مرتب ومحترف، وحسّيت إن فيه اهتمام حقيقي بالتفاصيل.", avatar: "/images/revewer (3).png" },
    ],
  },
];

/* =======================
   Profile Summary
======================= */
function ProfileSummary({ craftman, editMode, setEditMode, setShowRequestModal, setShowConfirmModal, isAccountActive, profileImg, setProfileImg, coverImg, setCoverImg }) {
  const allRatings = craftman.reviews?.map((review) => review.rating) || [];
  const avgRating = allRatings.length > 0 ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length : 0;

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
      <div className="coverBox" data-aos="fade-down" style={{ backgroundColor: isAccountActive ? 'transparent' : '#f0f2f5' }}>
        {(isAccountActive || coverImg) && <img src={coverImg || craftman.cover} alt="cover" />}
        {editMode && (
          <label className="edit-avatar-label">
            <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, "cover")} />
            تعديل صورة الغلاف <MdPhotoCamera />
          </label>
        )}
      </div>

      <section className="profile-summary">
        <div className="profile-info">
          <div className="prson-data">
            <div className="profile-avatar" data-aos="fade-up" style={{ backgroundColor: isAccountActive ? 'transparent' : '#e0e0e0', borderRadius: '50%', overflow: 'hidden' }}>
              {(isAccountActive || profileImg) && <img className="avatar" src={profileImg || craftman.avatar} alt={craftman.ctaftName} />}
              {editMode && (
                <label className="edit-avatar-label">
                  <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, "profile")} />
                  <MdPhotoCamera />
                </label>
              )}
            </div>
            <div className="craftman-info" data-aos="fade-left">
              <h2>
                {craftman.verified && <img src="/images/Verification.png" alt="Verified" className="verified-badge" />}
                {craftman.ctaftName}
              </h2>
              {isAccountActive && <p>{craftman.job}</p>}
              {isAccountActive && (
                <span><img src="/images/star.png" alt="Star" className="star-icon" /> {avgRating.toFixed(1)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="action-btns">
          {isAccountActive && (
             editMode ? (
              <button className="btn-delete-account" onClick={() => setShowConfirmModal(true)} style={{ backgroundColor: '#ff6b6b', color: '#fff', border: 'none', padding: '24px 18px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                <FaTrashAlt /> حذف الحساب
              </button>
            ) : (
              <>
                <button className="edit-profile-btn" onClick={() => setEditMode(true)}><MdModeEdit /></button>
                <button className="request-service-btn" onClick={() => setShowRequestModal(true)}>طلب خدمة</button>
              </>
            )
          )}
        </div>
      </section>
    </>
  );
}

/* =======================
   Profile Section
======================= */
function ProfileSection({ craftman, editMode, setEditMode, isAccountActive, setIsAccountActive }) {
  const [activeMainTab, setActiveMainTab] = useState("about");
  const [activeSideTab, setActiveSideTab] = useState("basic-info");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // States الحقول
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showCurrentPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const DOB_MASK = "--/--/----";
  const [dob, setDob] = useState("");
  const dobRef = useRef(null);
  const dobDateRef = useRef(null);

  const handleDobChange = (e) => {
    const typed = e.nativeEvent.data;
    if (!typed || !/^[0-9]$/.test(typed)) return;
    const digits = dob.replace(/[^0-9]/g, "") + typed;
    if (digits.length > 8) return;
    const slots = [0, 1, 3, 4, 6, 7, 8, 9];
    const mask = DOB_MASK.split("");
    for (let i = 0; i < digits.length; i++) mask[slots[i]] = digits[i];
    setDob(mask.join(""));
  };

  const handlePriceBlur = () => {
    let value = parseInt(price);
    if (!isNaN(value)) setPrice(value < 5 ? 5 : Math.ceil(value / 5) * 5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAccountActive(true);
    setEditMode(false);
  };

  const allRatings = craftman.reviews?.map((review) => review.rating) || [];
  const avgRating = allRatings.length > 0 ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length : 0;
  const displayedReviews = showAllReviews ? craftman.reviews : craftman.reviews?.slice(0, 3);

  const renderSideContent = () => {
    switch (activeSideTab) {
      case "basic-info": return (
        <ul className="basic-info-content">
          <li className="about-info"><FaUser className="icon" /> {craftman.about.aboutInfo}</li>
          <li className="experience"><MdAccessTime className="icon" /> {craftman.about.experience}</li>
          <li className="area"><MdLocationPin className="icon" /> {craftman.about.area}</li>
          <li className="completed-orders"><MdWork className="icon" /> {`عدد الطلبات المنفذة : ${craftman.about.completedOrders} طلب`}</li>
        </ul>
      );
      case "services": return (
        <ul className="services-content">
          {craftman.services.map((s, i) => <li key={i}><PiScrewdriverFill className="icon" /> {s}</li>)}
        </ul>
      );
      case "work-info": return (
        <ul className="work-info-content">
          <li><BsPin className="icon" /> {`نطاق الخدمة : ${craftman.workInfo.area}`}</li>
          <li><MdAccessTime className="icon" /> {`ساعات العمل : ${craftman.workInfo.workingHours}`}</li>
          <li><ImSpinner3 className="icon" /> {`سرعة الاستجابة : ${craftman.workInfo.speedOfResponse}`}</li>
          <li><AiOutlineExclamationCircle className="icon" /> {`خدمة الطوارئ : ${craftman.workInfo.emergencyService}`}</li>
        </ul>
      );
      default: return null;
    }
  };

  if (editMode) {
    return (
      <div className="edit-form-container">
        <h2>{isAccountActive ? "تعديل الملف الشخصي" : "إكمال بيانات الحرفي"}</h2>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-group top">
            <h3>البيانات الشخصية</h3>
            <input type="text" placeholder="الاسم" defaultValue={craftman.ctaftName} required />
            <div className="dob-field-wrapper">
              <input type="text" placeholder="تاريخ الميلاد" value={dob} onChange={handleDobChange} ref={dobRef} />
              <span className="dob-calendar-icon" onClick={()=>dobDateRef.current.showPicker()}><FaCalendarAlt /></span>
              <input type="date" ref={dobDateRef} style={{display:'none'}} onChange={(e)=>setDob(e.target.value)} />
            </div>
            <select><option value="">الحالة الاجتماعية</option><option>متزوج</option><option>أعزب</option><option>ارمل</option><option>مطلق</option></select>
            <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="tel" placeholder="رقم الهاتف" value={phone} onChange={(e)=>setPhone(e.target.value)} maxLength={11} />
            <input type="text" placeholder="المحافظة" defaultValue={craftman.about.area} />
          </div>
          <div className="form-group middle">
            <h3>البيانات الأساسية</h3>
            <input type="text" placeholder="عن الحرفي" defaultValue={craftman.job} />
            <input type="text" placeholder="سنوات الخبرة" defaultValue={craftman.about.experience} />
            <input type="text" placeholder="الخدمات" />
          </div>
          <div className="form-group bottom">
            <h3>معلومات العمل</h3>
            <input type="text" placeholder="نطاق الخدمة" defaultValue={craftman.workInfo.area} />
            <input type="number" placeholder="سعر الخدمة" value={price} onChange={(e)=>setPrice(e.target.value)} onBlur={handlePriceBlur} />
            <input type="text" placeholder="مواعيد العمل" defaultValue={craftman.workInfo.workingHours} />
            <select><option value="">خدمة الطوارئ</option><option>متاحة</option><option>غير متاحة</option></select>
          </div>
          <div className="form-group password">
            <h3>تغيير كلمة السر</h3>
            <div className="password-field">
              <input type={showCurrentPassword ? "text" : "password"} placeholder="كلمة السر الحالية" value={password} onChange={(e)=>setPassword(e.target.value)} />
              <span className="password-eye" onClick={()=>setShowPassword(!showCurrentPassword)}>{showCurrentPassword ? <FiEye /> : <FiEyeOff />}</span>
            </div>
            <div className="password-field">
              <input type={showNewPassword ? "text" : "password"} placeholder="كلمة السر الجديدة" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
              <span className="password-eye" onClick={()=>setShowNewPassword(!showNewPassword)}>{showNewPassword ? <FiEye /> : <FiEyeOff />}</span>
            </div>
            <div className="password-field">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="تأكيد كلمة السر" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
              <span className="password-eye" onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FiEye /> : <FiEyeOff />}</span>
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

  return (
    <div className="profile-wrapper">
       {!isAccountActive ? (
        <div className="activation-required-section">
          <div className="activation-content">
            <FaUserCheck className="activation-icon" />
            <h3>أهلاً بك في منصتنا <img src="/images/hand.svg" alt="hand" style={{ width: '50px' }}/></h3>
            <p className="no-wrap-text">يرجى إكمال تفعيل حسابك وإضافة بياناتك المهنية لتظهر للعملاء بشكل احترافي.</p>
            <button className="activate-btn" onClick={() => setEditMode(true)}>فعل حسابك الآن</button>
          </div>
        </div>
      ) : (
        <>
          <div className="main-tabs">
            <button className={activeMainTab === "about" ? "active" : ""} onClick={() => setActiveMainTab("about")}>عن الحرفي</button>
            <button className={activeMainTab === "works" ? "active" : ""} onClick={() => setActiveMainTab("works")}>الأعمال</button>
            <button className={activeMainTab === "reviews" ? "active" : ""} onClick={() => setActiveMainTab("reviews")}>تقييمات</button>
          </div>
          {activeMainTab === "about" && (
            <div className="about-section">
              <div className="side-tabs" data-aos="fade-up">
                <button className={activeSideTab === "basic-info" ? "active" : ""} onClick={() => setActiveSideTab("basic-info")}>المعلومات الأساسية</button>
                <button className={activeSideTab === "services" ? "active" : ""} onClick={() => setActiveSideTab("services")}>الخدمات</button>
                <button className={activeSideTab === "work-info" ? "active" : ""} onClick={() => setActiveSideTab("work-info")}>معلومات العمل</button>
              </div>
              <div className="side-content">{renderSideContent()}</div>
            </div>
          )}
          {activeMainTab === "works" && (
            <div className="portfolio-section">
              <div className="portfolio-grid">
                <label className="work-item upload-box"><input type="file" accept="image/*" hidden /><img src="/images/upload.png" alt="upload" className="upload-icon" /></label>
                {craftman.worksImages.map((img, i) => <div key={i} className="work-item" onClick={() => setSelectedImage(img)}><img src={img} alt="work" className="work-image" /></div>)}
              </div>
            </div>
          )}
          {activeMainTab === "reviews" && (
            <div className="reviews-section">
              <h1 className="reviews-title">التقييمات وآراء العملاء</h1>
              <div className="rating-summary">
                <div className="rating-summary-box">
                  <div className="rating-score"><h2>{avgRating.toFixed(1)}</h2><div className="review-stars">{[...Array(5)].map((_, i) => <span key={i} className={i < Math.round(avgRating) ? "filled" : ""}>★</span>)}</div></div>
                  <div className="rating-bars">{[5, 4, 3, 2, 1].map((star, i) => {
                    const count = craftman.reviews.filter(r => r.rating === star).length;
                    const percent = craftman.reviews.length > 0 ? (count / craftman.reviews.length) * 100 : 0;
                    return <div key={i} className="rating-bar"><span>{star}</span><div className="bar"><div className="fill" style={{ width: `${percent}%` }}></div></div></div>;
                  })}</div>
                </div>
              </div>
              <hr />
              {craftman.reviews.length > 0 ? displayedReviews.map((r, i) => (
                <div key={i} className="review-card"><div className="review-card-content"><div className="review-header"><div className="review-avatar"><img src={r.avatar} alt="" /></div><h4>{r.ctaftName}</h4></div><div className="rate-and-date"><span>{r.date}</span><div className="review-stars">{[...Array(5)].map((_, si) => <span key={si} className={si < r.rating ? "filled" : ""}>★</span>)}</div></div></div><p className="comment">{r.comment}</p></div>
              )) : <p className="no-reviews">لا توجد تقييمات حالياً</p>}
              {craftman.reviews.length > 3 && <div className="show-all-reviews"><button onClick={() => setShowAllReviews(!showAllReviews)}>{showAllReviews ? <FaArrowUp /> : <FaArrowDown />}<span>{showAllReviews ? "عرض أقل" : "عرض كل التقييمات"}</span></button></div>}
            </div>
          )}
        </>
      )}
      {selectedImage && <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}><div className="image-modal-content"><button className="close-btn" onClick={() => setSelectedImage(null)}>×</button><img src={selectedImage} alt="preview" /></div></div>}
    </div>
  );
}

/* ================= REQUEST MODAL ================= */
function RequestServiceModal({ craftmanName, onClose }) {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const egyptianGovernorates = ["القاهرة", "الجيزة", "الدقهلية", "المنصورة", "الشرقية"];
  const handleSubmit = (e) => { e.preventDefault(); setShowSuccessMsg(true); setTimeout(() => onClose(), 1500); };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {showSuccessMsg ? <div className="success-toast-container"><div className="success-icon">✓</div><p>تم إرسال طلبك بنجاح</p></div> : 
          <form className="request-form" onSubmit={handleSubmit}>
            <h2 className="modal-title">{craftmanName}</h2>
            <div className="form-group-modal"><label>اسم العميل</label><input type="text" placeholder="أدخل اسمك" required /></div>
            <div className="form-group-modal"><label>المحافظة</label><select required><option value="">اختر المحافظة</option>{egyptianGovernorates.map(g=><option key={g} value={g}>{g}</option>)}</select></div>
            <div className="form-group-modal"><label>العنوان</label><input type="text" placeholder="العنوان بالتفصيل" required /></div>
            <div className="form-group-modal"><label>وصف الخدمة</label><input type="text" placeholder="وصف الخدمة" required /></div>
            <div className="modal-btns"><button type="submit" className="confirm-btn">إرسال الطلب</button><button type="button" className="cancel-btn" onClick={onClose}>إلغاء</button></div>
             <button type="button" className="close-btn" onClick={onClose}>×</button>
          </form>
        }
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

  useEffect(() => { AOS.init({ duration: 1000 }); }, []);

  const handleDeleteAccount = () => {
    setShowConfirmModal(false);
    setShowDeleteToast(true);
    setTimeout(() => { window.location.href = "/"; }, 2000);
  };

  const craftman = handiesData.find((e) => e.id === Number(id));
  if (!craftman) return <p>Not Found</p>;

  return (
    <div className="professional-profile-container">
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-box delete-confirm-modal">
            <h3>تنبيه حذف الحساب</h3><p>هل أنت متأكد من حذف الحساب نهائياً؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="modal-btns">
              <button className="confirm-btn" style={{ backgroundColor: '#ff6b6b' }} onClick={handleDeleteAccount}>نعم</button>
              <button className="cancel-btn" onClick={() => setShowConfirmModal(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteToast && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="success-toast-container" style={{ background: '#fff', padding: '30px', borderRadius: '15px' }}>
            <div className="success-icon" style={{ backgroundColor: '#ff6b6b' }}>✓</div>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>تم حذف الحساب بنجاح</p>
          </div>
        </div>
      )}

      {showRequestModal && <RequestServiceModal craftmanName={craftman.ctaftName} onClose={() => setShowRequestModal(false)} />}

      <ProfileSummary
        craftman={craftman} editMode={editMode} setEditMode={setEditMode} 
        setShowRequestModal={setShowRequestModal} setShowConfirmModal={setShowConfirmModal} 
        isAccountActive={isAccountActive} profileImg={profileImg} setProfileImg={setProfileImg} 
        coverImg={coverImg} setCoverImg={setCoverImg}
      />

      <ProfileSection
        craftman={craftman} editMode={editMode} setEditMode={setEditMode} 
        isAccountActive={isAccountActive} setIsAccountActive={setIsAccountActive}
      />
    </div>
  );
};

export default ProfilePage;