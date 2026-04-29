import React from "react";
import "./Providers.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight, FaStar } from "react-icons/fa";

export default function Providers() {

  const navigate = useNavigate();

  const goToProfile = (card) => {
    navigate(`/CompanyProfile/${card.id}`, { state: { card } });
  };

  const location = useLocation();
  const type = location.state?.type;

  const cards = [
    {
      id: 1,
      title: "شركة ابناء سيناء",
      desc: "للتجارة والمقاولات العامة",
      rating: 0,
    },
    {
      id: 2,
      title: "شركة ابو الوفا",
      desc: "للتطوير العقاري والمقاولات ",
      rating: 0,
    },
    {
      id: 3,
      title: "شركة المقاولون العرب",
      desc: " للمقاولات العامة و تنفيذ المشروعات الإنشائية",
      rating: 0,
    },
    {
      id: 4,
      title: "شركة حسن علام",
      desc: " للمقاولات العامة و تنفيذ المشروعات ",
      rating: 0,
    },
    {
      id: 5,
      title: "شركة الإنجاز",
      desc: "للمقاولات العامة والتوريدات العمومية",
      rating: 0,
    },
  ];

  const titlesMap = {
    construction: "المقاولات والبناء",
    construction_waste: "نقل مخلفات البناء",
    sand_gravel: "نقل الرمل والزلط",
    equipment: "تأجير قلابات ولودر",
    furniture: "نقل الأثاث",
  };

  const renderRating = (rating) => {
    return (
      <div className="rating">
        <FaStar color="#f5b50a" />
        <span>{rating}</span>
      </div>
    );
  };

  return (
    <div className="providers-container">

      <div className="header" data-aos="fade-right">
        <h1>
          {type ?` شركات ${titlesMap[type]}` : "كل الشركات"}
        </h1>
        <p>نوفر لك دليلًا متكاملًا لأفضل الشركات المتخصصة لتلبية احتياجاتك بكفاءة واحترافية</p>
      </div>

      {/* ✅ الصح هنا */}
      <div className="cards" data-aos="fade-up">

        {cards.map((card, index) => (
          <div
            className={`card card${index + 1}`}
            key={card.id}
            onClick={() => goToProfile(card)}
            style={{ cursor: "pointer" }}
          >

            <span className="dot"></span>

            <div className="content">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>

              {renderRating(card.rating)}
            </div>

            <div className="arrow">
              <FaArrowRight />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}