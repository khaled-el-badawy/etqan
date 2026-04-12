import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Artisans.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Artisans = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const artisansData = [
    {
      id: 1,
      name: "أحمد علي",
      price: "150 ج",
      rate: "4.9",
      img: "/images/Artisans/Artisans1.svg",
    },
    {
      id: 2,
      name: "السيد محمد",
      price: "200 ج",
      rate: "4.9",
      img: "/images/Artisans/Artisans2.svg",
    },
    {
      id: 3,
      name: "محمود طه",
      price: "120 ج",
      rate: "4.9",
      img: "/images/Artisans/Artisans3.svg",
    },
    {
      id: 4,
      name: "علي محمد",
      price: "300 ج",
      rate: "4.9",
      img: "/images/Artisans/Artisans4.svg",
    },
    {
      id: 5,
      name: "محمد ابراهيم",
      price: "310 ج",
      rate: "4.9",
      img: "/images/Artisans/Artisans5.svg",
    },
    {
      id: 6,
      name: "خالد اسماعيل",
      price: "280 ج",
      rate: "4.9",
      img: "/images/Artisans/Artisans6.svg",
    },
    {
      id: 6,
      name: "خالد اسماعيل",
      price: "280 ج",
      rate: "4.9",
      img: "/images/Artisans/Artisans7.svg",
    },
    {
      id: 6,
      name: " ياسين احمد",
      price: "280 ج",
      rate: "4.9",
      img: "/images/Artisans/Artisans6.svg",
    },
    {
      id: 6,
      name: " شعبان عبدالرحيم",
      price: "280 ج",
      rate: "4.9",
      img: "/images/Artisans/Artisans6.svg",
    },
  ];

  return (
    <div className="artisans-page">
      <section className="top-section">
        <div className="artisans-hero" data-aos="fade-down">
          <img
            src="/images/Artisans/Artisanshero.svg"
            alt="Hero"
            className="hero-image"
          />
          <hr className="artisans-line" />
        </div>

        <div className="search-section" data-aos="zoom-in">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="ابحث عن السعر..."
              className="search-input"
            />
            <div className="search-icon-box">
              <img src="/images/Artisans/Artisanssearchicon.svg" alt="search" />
            </div>
          </div>
        </div>
      </section>

      <section className="artisans-main-wrapper">
        <div className="container">
          <div className="artisans-grid">
            {artisansData.map((item) => (
              <Link
                to={`/CraftmanProfile/${item.id}`}
                key={item.id}
                className="card-link"
              >
                <div className="artisan-card" data-aos="fade-up">
                  <div className="artisan-img-wrapper">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="artisan-info">
                    <h3>{item.name}</h3>
                    <p>سعر الخدمة: {item.price}</p>
                    <div className="rating">
                      <span>{item.rate}</span>
                      <span className="star-icon">★</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="load-more-container" data-aos="fade-up">
          <button className="load-more-btn">عرض المزيد ∨</button>
        </div>
      </section>
    </div>
  );
};

export default Artisans;
