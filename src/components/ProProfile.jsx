import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// animation library
import AOS from "aos";
import "aos/dist/aos.css";
// styles
import "./ProProfile.css";
// icons
import {
  MdModeEdit,
  MdAccessTime,
  MdLocationPin,
  MdWork,
} from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { BsFillPinFill } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { PiScrewdriverFill } from "react-icons/pi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

/* =======================
   Mock Data
======================= */
const handiesData = [
  {
    id: 1,
    name: "محمد مصطفى",
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
      completedOrders: "+120",
    },
    //services
    services: [
      "تأسيس كهرباء الشقق والفيلات",
      "صيانة الأعطال الكهربائية",
      "تركيب وحدات الإضاءة",
      "فحص الأعطال ومعالجة القفلات",
    ],
    //work info
    workInfo: {
      area: " القاهرة - الجيزة - 6 أكتوبر - الشيخ زايد",
      workingHours: "من 9 صباحًا حتى 9 مساءً",
      speedOfResponse: "خلال ساعة",
      emergencyService: "متاحة",
    },
    ////////////////////////////// works images
    worksImages: [
      "/images/work (1).png",
      "/images/work (2).png",
      "/images/work (3).png",
      "/images/work (4).png",
      "/images/work (5).png",
      "/images/work (6).png",
      "/images/work (7).png",
      "/images/work (8).png",
      "/images/work (9).png",
      "/images/work (1).png",
      "/images/work (2).png",
      "/images/work (3).png",
      "/images/work (4).png",
      "/images/work (5).png",
      "/images/work (6).png",
      "/images/work (7).png",
      "/images/work (8).png",
      "/images/work (9).png",
      "/images/work (4).png",
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
        rating: 2,
        comment:
          "الحرفي وصل في الموعد المحدد بالضبط، وكان محترم جدًا في التعامل. فحص المشكلة الأول وشرح لي سببها قبل ما يبدأ الشغل، وبعدها نفّذ الإصلاح بسرعة ونظافة. بصراحة تجربة مريحة وموثوقة",
        avatar: "/images/revewer (1).png",
      },
      {
        id: 2,
        name: "أحمد السيد",
        date: "21/8/2025",
        rating: 3,
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
    //work info
    workInfo: {
      area: "المنصورة احمد ماهر - المنصورة - الدقهلية",
      workingHours: "من 9 صباحًا حتى 5 مساءً",
      speedOfResponse: "اقل من ساعة",
      emergencyService: "متاحة",
    },
    // works images
    worksImages: [
      "/images/work (2).png",
      "/images/work (2).png",
      "/images/work (2).png",
      "/images/work (2).png",
      "/images/work (2).png",
      "/images/work (2).png",
    ],
    reviews: [],
  },
];

/* =======================
   Profile Summary
======================= */
function ProfileSummary({ handy }) {
  const allRatings = handy.reviews?.map((review) => review.rating) || [];
  // حساب التقييمات عشان نطلع المتوسط ونحسب النسبة لكل تقييم في بار التقييمات

  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length
      : 0;

  return (
    <>
      <div className="coverBox" data-aos="fade-down">
        <img src={handy.cover} alt="cover" />
      </div>

      <section className="profile-summary">
        <div className="profile-info">
          <div className="prson-data">
            {/* avatar لازم يكون هنا داخل prson-data */}
            <div className="profile-avatar" data-aos="fade-up">
              <img src={handy.avatar} alt={handy.name} />
            </div>

            <div className="handy-info" data-aos="fade-left">
              <h2>
                {handy.verified && (
                  <img
                    src="/images/Verification.png"
                    alt="Verified"
                    className="verified-badge"
                    style={{ display: handy.verified ? "block" : "none" }}
                  />
                )}
                {handy.name}
              </h2>

              <p>{handy.job}</p>
              <span>
                <img src="/images/star.png" alt="Star" className="star-icon" />{" "}
                {avgRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="action-btns" data-aos="fade-right">
          <button>
            <MdModeEdit />
          </button>
          <button>طلب خدمة</button>
        </div>
      </section>
    </>
  );
}

/* =======================
   Tabs
======================= */
function ProfileSection({ handy }) {
  const [activeMainTab, setActiveMainTab] = useState("about");
  const [activeSideTab, setActiveSideTab] = useState("basic-info");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  // حساب التقييمات عشان نطلع المتوسط ونحسب النسبة لكل تقييم في بار التقييمات
  const allRatings = handy.reviews?.map((review) => review.rating) || [];
  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length
      : 0;
  const displayedReviews = showAllReviews
    ? handy.reviews
    : handy.reviews?.slice(0, 3);

  const renderSideContent = () => {
    switch (activeSideTab) {
      case "basic-info":
        return (
          <ul className="basic-info-content">
            <li className="about-info">
              <FaUser className="icon" />
              {handy.about.aboutInfo}
            </li>
            <li className="experience">
              <MdAccessTime className="icon" />
              {handy.about.experience}
            </li>
            <li className="area">
              <MdLocationPin className="icon" />
              {handy.about.area}
            </li>
            <li className="completed-orders">
              <MdWork className="icon" />
              {`عدد الطلبات المنفذة : ${handy.about.completedOrders}`}
            </li>
          </ul>
        );

      case "services":
        return (
          <ul className="services-content">
            {handy.services.map((service, index) => {
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
              <BsFillPinFill className="icon" />
              {`نطاق الخدمة : ${handy.workInfo.area}`}
            </li>
            <li>
              <MdAccessTime className="icon" />
              {`ساعات العمل : ${handy.workInfo.workingHours}`}
            </li>
            <li>
              <ImSpinner3 className="icon" />
              {`سرعة الاستجابة : ${handy.workInfo.speedOfResponse}`}
            </li>
            <li>
              <AiOutlineExclamationCircle className="icon" />
              {`خدمة الطوارئ : ${handy.workInfo.emergencyService}`}
            </li>
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className="profile-wrapper">
      {/* ================= MAIN HORIZONTAL TABS ================= */}
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

      {/* CONTENT */}
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

          {/* Left Content */}
          <div className="side-content">{renderSideContent()}</div>
        </div>
      )}

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
            {handy.worksImages.map((image, index) => (
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
                  const count = handy.reviews
                    ? handy.reviews.filter((review) => review.rating === star)
                        .length
                    : 0;

                  const percent =
                    handy.reviews && handy.reviews.length > 0
                      ? (count / handy.reviews.length) * 100
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
          {handy.reviews && handy.reviews.length > 0 ? (
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
          {handy.reviews.length > 3 && (
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const handy = handiesData.find((e) => e.id === Number(id));

  if (!handy)
    return (
      // يمكنك تحسين هذا الجزء بإضافة صورة أو رابط للعودة إلى الصفحة الرئيسية
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Not Found
      </p>
    );

  return (
    <div className="professional-profile-container">
      <ProfileSummary handy={handy} />
      <ProfileSection handy={handy} />
    </div>
  );
};

export default ProfilePage;
