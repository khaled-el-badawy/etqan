import React from "react";
import "./Company.css";
import { FaChevronLeft } from "react-icons/fa";

const company = [
  {
    id: 1,
    title: "نقل مخلفات البناء",
    desc: "خدمات نقل الطوب المتكسر ومخلفات الهدم بسرعة وأمان.",
    author: "خدمة نقل",
    color: "blue",
  },
  {
    id: 2,
    title: "نقل الرمل والزلط",
    desc: "توصيل جميع أنواع مواد البناء للمواقع في الوقت المحدد.",
    author: "خدمة نقل",
    color: "purple",
  },
  {
    id: 3,
    title: "تأجير قلابات ولوادر",
    desc: "توفير معدات نقل ثقيلة لجميع أعمال المقاولات.",
    author: "خدمة نقل",
    color: "pink",
  },
];

export default function Company() {
  return (
    <div className="company-container">

      {/* ✅ HEADER */}
      <div className="transport-header">
        <div className="header-content">

          <div className="title-section">
            {/* <span className="icon">🚚</span> */}
            <h1>شركات النقل</h1>
          </div>

          <p className="subtitle">
            تصفح قائمة شركات النقل المعتمدة <br/>واختر الأنسب لإحتياجات الشحن والتوصيل الخاصة بك.
          </p>

        </div>
      </div>

      {/* Cards */}
      {company.map((company) => (
        <div className={`company-card ${company.color}`} key={company.id}>
          
          <div className="left">
            <div className="dot"></div>
            <div className="circle"></div>

            {/* <div className="icon">
              💻
            </div> */}
          </div>

          <div className="content">
            <h2>{company.title}</h2>
            <p>{company.desc}</p>
            <span>{company.author}</span>
          </div>

          <div className="arrow">
            <FaChevronLeft />
          </div>
        </div>
      ))}
    </div>
  );
}