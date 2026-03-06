import React, { useState } from 'react';
import './Service.css';

const Service = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const servicesData = [
    { id: 1, title: "سباك", icon: "/images/services/service1.svg", link: "/carpentry-page", delay: "200" },
    { id: 2, title: "نجارة", icon: "/images/services/service2.svg", link: "/carpentry-page", delay: "200" },
    { id: 3, title: "كهرباء", icon: "/images/services/service3.svg", link: "/electricity-page", delay: "300" },
    { id: 4, title: "حداد", icon: "/images/services/service4.svg", link: "/smith-page", delay: "400" },
    { id: 5, title: "فني تكييفات", icon: "/images/services/service5.svg", link: "/ac-page", delay: "100" },
    { id: 6, title: "فني غاز", icon: "/images/services/service6.svg", link: "/gas-page", delay: "200" },
    { id: 7, title: "نقاش", icon: "/images/services/service7.svg", link: "/painter-page", delay: "300" },
    { id: 8, title: "محارة", icon: "/images/services/service8.svg", link: "/plaster-page", delay: "400" },
    { id: 9, title: "عامل بناء", icon: "/images/services/service9.svg", link: "/builder-page", delay: "100" },
    { id: 10, title: "أمن وأنظمة ذكية", icon: "/images/services/service10.svg", link: "/security-page", delay: "200" },
    { id: 11, title: "سيراميك", icon: "/images/services/service11.svg", link: "/ceramic-page", delay: "300" },
    { id: 12, title: "منجد", icon: "/images/services/service12.svg", link: "/upholstery-page", delay: "400" },
    { id: 13, title: "الومنتال", icon: "/images/services/service13.svg", link: "/alumetal-page", delay: "100" },
    { id: 14, title: "تكسير وإزالة", icon: "/images/services/service14.svg", link: "/demolition-page", delay: "200" },
    { id: 15, title: "سواق نقل", icon: "/images/services/service15.svg", link: "/driver-page", delay: "300" },
    { id: 16, title: "صيانة أجهزة كهربائية", icon: "/images/services/service16.svg", link: "/appliance-page", delay: "400" },
    { id: 17, title: "رش مبيدات", icon: "/images/services/service17.svg", link: "/pesticide-page", delay: "100" },
    { id: 18, title: "استشارات هندسية", icon: "/images/services/service18.svg", link: "/engineering-page", delay: "200" },
    { id: 18, title: " تنظيف", icon: "/images/services/service19.svg", link: "/engineering-page", delay: "200" },
    { id: 20, title: "فني تركيب دش", icon: "/images/services/service20.svg", link: "/dish-page", delay: "300" },
  ];
  
  const filteredServices = servicesData.filter((service) =>
    service.title.includes(searchTerm)
  );

  return (
    <div className="service-page">
      {/* القسم الأول: الهيرو سكشن */}
      <section className="service-hero">
        <div className="container hero-wrapper">
          <div className="hero-text" data-aos="fade-up">
            <h2>“ حيث تلتقي الخبرة بالجودة لتنفيذ كل احتياجاتك “</h2>
             <p>
                نقدم لك خدمات موثوقة يقدمها محترفون معتمدون
                </p>
          </div>
          <div className="hero-image" data-aos="fade-right" data-aos-duration="1500">
            <img src="/images/services/heroservice.svg" alt="Hero Service" />
          </div>
        </div>
      </section>

      {/* القسم الثاني: سكشن البحث */}
      <section className="search-section">
        <div className="container">
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="ابحث عن خدمتك..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">
            <img src="/images/services/searchicon.svg" alt="search" />
            </div>
          </div>
        </div>
      </section>

      {/* القسم الثالث: سكشن الكروت */}
      <section className="service-grid-section">
        <div className="container">
          <div className="service-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <a 
                  key={service.id} 
                  href={service.link} 
                  className="service-cards" 
                  data-aos="zoom-in-up" 
                  data-aos-delay={service.delay}
                >
                  <div className="cards-icon">
                    <img src={service.icon} alt={service.title} />
                  </div>
                  <h3>{service.title}</h3>
                </a>
              ))
            ) : (
              <div className="no-results">لا توجد نتائج تطابق بحثك</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;