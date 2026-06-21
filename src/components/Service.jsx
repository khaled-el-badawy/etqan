<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import './Service.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Service = () => {
  const [dbServices, setDbServices] = useState([]); // لتخزين البيانات من الداتا بيز
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // مصفوفة الخدمات الـ 20 اللي أنت عايزهم بالظبط (نفس الترتيب والأيقونات والـ Delay)
  const servicesStaticData = [
    { title: "سباكة", icon: "/images/services/service1.svg", delay: "200" },
    { title: "نجارة", icon: "/images/services/service2.svg", delay: "200" },
    { title: "كهرباء", icon: "/images/services/service3.svg", delay: "300" },
    { title: "حداد", icon: "/images/services/service4.svg", delay: "400" },
    { title: "فني تكييفات", icon: "/images/services/service5.svg", delay: "100" },
    { title: "فني غاز", icon: "/images/services/service6.svg", delay: "200" },
    { title: "نقاش", icon: "/images/services/service7.svg", delay: "300" },
    { title: "محارة", icon: "/images/services/service8.svg", delay: "400" },
    { title: "عامل بناء", icon: "/images/services/service9.svg", delay: "100" },
    { title: "أمن وأنظمة ذكية", icon: "/images/services/service10.svg", delay: "200" },
    { title: "سيراميك", icon: "/images/services/service11.svg", delay: "300" },
    { title: "منجد", icon: "/images/services/service12.svg", delay: "400" },
    { title: "الومنتال", icon: "/images/services/service13.svg", delay: "100" },
    { title: "تكسير وإزالة", icon: "/images/services/service14.svg", delay: "200" },
    { title: "سواق نقل", icon: "/images/services/service15.svg", delay: "300" },
    { title: "صيانة أجهزة كهربائية", icon: "/images/services/service16.svg", delay: "400" },
    { title: "رش مبيدات", icon: "/images/services/service17.svg", delay: "100" },
    { title: "استشارات هندسية", icon: "/images/services/service18.svg", delay: "200" },
    { title: "تنظيف", icon: "/images/services/service19.svg", delay: "200" },
    { title: "فني تركيب دش", icon: "/images/services/service20.svg", delay: "300" },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchJobsFromDB = async () => {
      try {
        const res = await axios.get("https://etqanproject.runasp.net/api/Jobs");
        setDbServices(res.data); // البيانات الحقيقية (ID و Name)
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobsFromDB();
  }, []);

  // دالة البحث والفلترة
  const filteredServices = servicesStaticData.filter((service) =>
    service.title.includes(searchTerm)
  );

  // دالة التنقل: بتبحث عن الاسم في الداتا بيز وبتاخد الـ ID بتاعه
  const handleNavigate = (title) => {
    // بنعمل تطابق للاسم (مع مراعاة "سباك" و "سباكة")
    const match = dbServices.find(s =>
      s.name.includes(title) || title.includes(s.name)
    );

    if (match) {
      navigate(`/Artisans/${match.id}`);
    } else {
      console.warn("هذه الخدمة غير موجودة في قاعدة البيانات حالياً");
      // navigate(`/Artisans/0`); // اختيارياً
    }
  };

  return (
    <div className="service-page">
=======
import React, { useState } from 'react';
import './Service.css';
import { useNavigate } from 'react-router-dom'; // استيراد التنقل
const Service = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // استخدام التنقل

  const servicesData = [
    { id: 1, title: "سباك", icon: "/images/services/service1.svg", link: "/Artisans", delay: "200" },
    { id: 2, title: "نجارة", icon: "/images/services/service2.svg", link: "/Artisans", delay: "200" },
    { id: 3, title: "كهرباء", icon: "/images/services/service3.svg", link: "/Artisans", delay: "300" },
    { id: 4, title: "حداد", icon: "/images/services/service4.svg", link: "/Artisans", delay: "400" },
    { id: 5, title: "فني تكييفات", icon: "/images/services/service5.svg", link: "/Artisans", delay: "100" },
    { id: 6, title: "فني غاز", icon: "/images/services/service6.svg", link: "/Artisans", delay: "200" },
    { id: 7, title: "نقاش", icon: "/images/services/service7.svg", link: "/Artisans", delay: "300" },
    { id: 8, title: "محارة", icon: "/images/services/service8.svg", link: "/Artisans", delay: "400" },
    { id: 9, title: "عامل بناء", icon: "/images/services/service9.svg", link: "/Artisans", delay: "100" },
    { id: 10, title: "أمن وأنظمة ذكية", icon: "/images/services/service10.svg", link: "/Artisans", delay: "200" },
    { id: 11, title: "سيراميك", icon: "/images/services/service11.svg", link: "/Artisans", delay: "300" },
    { id: 12, title: "منجد", icon: "/images/services/service12.svg", link: "/Artisans", delay: "400" },
    { id: 13, title: "الومنتال", icon: "/images/services/service13.svg", link: "/Artisans", delay: "100" },
    { id: 14, title: "تكسير وإزالة", icon: "/images/services/service14.svg", link: "/Artisans", delay: "200" },
    { id: 15, title: "سواق نقل", icon: "/images/services/service15.svg", link: "/Artisans", delay: "300" },
    { id: 16, title: "صيانة أجهزة كهربائية", icon: "/images/services/service16.svg", link: "/Artisans", delay: "400" },
    { id: 17, title: "رش مبيدات", icon: "/images/services/service17.svg", link: "/Artisans", delay: "100" },
    { id: 18, title: "استشارات هندسية", icon: "/images/services/service18.svg", link: "/Artisans", delay: "200" },
    { id: 18, title: " تنظيف", icon: "/images/services/service19.svg", link: "/Artisans", delay: "200" },
    { id: 20, title: "فني تركيب دش", icon: "/images/services/service20.svg", link: "/Artisans", delay: "300" },
  ];
  
  const filteredServices = servicesData.filter((service) =>
    service.title.includes(searchTerm)
  );

  return (
    <div className="service-page">
      {/* القسم الأول: الهيرو سكشن */}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      <section className="service-hero">
        <div className="container hero-wrapper">
          <div className="hero-text" data-aos="fade-up">
            <h2>“ حيث تلتقي الخبرة بالجودة لتنفيذ كل احتياجاتك “</h2>
<<<<<<< HEAD
            <p>نقدم لك خدمات موثوقة يقدمها محترفون معتمدون</p>
=======
             <p>
                نقدم لك خدمات موثوقة يقدمها محترفون معتمدون
                </p>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          </div>
          <div className="hero-image" data-aos="fade-right" data-aos-duration="1500">
            <img src="/images/services/heroservice.svg" alt="Hero Service" />
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="search-section">
        <div className="container">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="ابحث عن خدمتك..."
=======
      {/* القسم الثاني: سكشن البحث */}
      <section className="search-section">
        <div className="container">
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="ابحث عن خدمتك..." 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">
<<<<<<< HEAD
              <img src="/images/services/searchicon.svg" alt="search" />
=======
            <img src="/images/services/searchicon.svg" alt="search" />
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
=======
      {/* القسم الثالث: سكشن الكروت */}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      <section className="service-grid-section">
        <div className="container">
          <div className="service-grid">
            {filteredServices.length > 0 ? (
<<<<<<< HEAD
              filteredServices.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigate(service.title)}
                  className="service-cards"
                  style={{ cursor: 'pointer' }}
                  data-aos="zoom-in-up"
=======
              filteredServices.map((service) => (
                <a 
                  key={service.id} 
                  onClick={() => navigate(`/Artisans/${service.id}`)} // الربط بالـ ID
                  href={service.link} 
                  className="service-cards" 
                  data-aos="zoom-in-up" 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  data-aos-delay={service.delay}
                >
                  <div className="cards-icon">
                    <img src={service.icon} alt={service.title} />
                  </div>
                  <h3>{service.title}</h3>
<<<<<<< HEAD
                </div>
=======
                </a>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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