import React from "react";
import "./Companies.css";
import { useNavigate } from "react-router-dom";

export default function Companies() {
  const navigate = useNavigate();

  return (
    <div className="companies-container">

      {/* HEADER */}
      <div className="header" data-aos="fade-right">
        <h1>دليل الشركات</h1>
        <p>بوابتك للوصول إلى شركات موثوقة وخدمات بمعايير دقيقة</p>

        <div className="divider">
          <span></span>
          <div className="dots">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <span></span>
        </div>
      </div>

      {/* ROW 1 */}
      <div className="row row-top" data-aos="fade-up">

        <div className="card c2"
          onClick={() => navigate("/providers", {
              state: {
                  type: "construction_waste",
                  title: "نقل مخلفات البناء",
                },
          }
          
        )}>
          <div className="icon">
            <img src="/images/icon2.png" alt="" />
          </div>

          <h3>نقل مخلفات البناء</h3>
          <p>شركات متخصصة في نقل مخلفات البناء بسرعة وأمان</p>

          <button
            className="arrow"
          >
            →
          </button>

          <span className="dot"></span>
          <span className="curve"></span>
        </div>

        <div className="card c1"
          onClick={() => navigate("/providers", {
                 state: {
                  type: "sand_gravel",
                  title: "نقل الرمل والزلط",
                },
          }
          
        )}>
          <div className="icon">
            <img src="/images/icon1.png" alt="" />
          </div>

          <h3>نقل الرمل والزلط</h3>
          <p>خدمات نقل مواد البناء بجودة عالية وتوصيل سريع</p>

          <button
            className="arrow"
          >
            →
          </button>

          <span className="dot"></span>
          <span className="curve"></span>
        </div>

      </div>

      {/* ROW 2 */}
      <div className="row row-bottom" data-aos="fade-up">

        <div className="card c3"
          onClick={() => navigate("/providers", {
            state: {
                  type: "equipment",
                  title: "تأجير قلابات ولودر",
                },
          }

          )}
        >
          <div className="icon">
            <img src="/images/icon3.png" alt="" />
          </div>

          <h3>تأجير قلابات ولودر</h3>
          <p>تأجير أحدث المعدات الثقيلة للمشروعات</p>

          <button
            className="arrow"
          >
            →
          </button>

          <span className="dot"></span>
          <span className="curve"></span>
        </div>

        <div className="card c4"
          onClick={() => navigate("/providers", {
              state: {
                  type: "construction",
                  title: "مقاولات وبناء",
                },
          }
          
        )}>
          <div className="icon">
            <img src="/images/icon4.png" alt="" />
          </div>

          <h3>مقاولات وبناء</h3>
          <p>تنفيذ المشاريع بجودة عالية واحترافية</p>

          <button
            className="arrow"
          >
            →
          </button>

          <span className="dot"></span>
          <span className="curve"></span>
        </div>

        <div className="card c5"
          onClick={() => navigate("/providers", {
              state: {
                  type: "furniture",
                  title: "نقل الأثاث",
                },
          }
          
        )}>
          <div className="icon">
            <img src="/images/icon5.png" alt="" />
          </div>

          <h3>نقل الأثاث</h3>
          <p>خدمات نقل الأثاث باحترافية وأمان كامل</p>

          <button
            className="arrow"
          >
            →
          </button>

          <span className="dot"></span>
          <span className="curve"></span>
        </div>

      </div>

    </div>
  );
}