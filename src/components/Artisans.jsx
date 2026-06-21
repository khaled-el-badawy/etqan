<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
=======
import React, { useEffect,useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
import './Artisans.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Artisans = () => {
<<<<<<< HEAD
  const { jobId } = useParams(); // لقط الـ ID من الرابط (مثلاً: 9 للمنجد)
  const [artisansData, setArtisansData] = useState([]);
=======
  const { jobId } = useParams(); // لقط الـ ID من الرابط
  const [artisansData, setArtisansData] = useState([]); // داتا فاضية في البداية
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
<<<<<<< HEAD
    // تشغيل الأنيميشن عند فتح الصفحة
    AOS.init({ duration: 1000, once: true });

    const fetchArtisans = async () => {
      try {
        setLoading(true);
        // نداء الباك إند لجلب الحرفيين التابعين لهذه المهنة
        const response = await axios.get(`https://etqanproject.runasp.net//api/Jobs/${jobId}/artisans`);

        // تحويل البيانات لتناسب التصميم (Mapping)
        const formattedData = response.data.map(a => ({
          id: a.id,          // معرف الحرفي الفريد (ApplicationUserId)
          name: a.name,      // اسمه بالكامل
          price: a.price || "حسب الاتفاق",
          rate: a.rate || "4.8",
          img: a.img || "/images/Artisans/user-default.png"
        }));

        setArtisansData(formattedData);
=======
    // تشغيل الأنيميشن
    AOS.init({
      duration: 1000,
      once: true,
    });

    // دالة جلب البيانات من الباك إند
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(`http://localhost:5036/api/Jobs/${jobId}/artisans`);
        setArtisansData(response.data);
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      } catch (error) {
        console.error("خطأ في جلب الحرفيين:", error);
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    if (jobId) fetchArtisans();
  }, [jobId]);

  // دالة البحث المفلترة (آمنة من الـ Undefined)
  const filteredArtisans = artisansData.filter(a =>
    (a.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="artisans-page">
      {/* القسم العلوي: الهيرو والبحث */}
      <section className="top-section">
        <div className="artisans-hero" data-aos="fade-down">
          <img src="/images/Artisans/Artisanshero.svg" alt="Hero" className="hero-image" />
=======
    fetchArtisans();
  }, [jobId]); // لو الـ ID اتغير، اطلب الداتا تاني
  return (
    <div className="artisans-page">
      <section className="top-section">
        <div className="artisans-hero" data-aos="fade-down">
          <img
            src="/images/Artisans/Artisanshero.svg"
            alt="Hero"
            className="hero-image"
          />
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          <hr className="artisans-line" />
        </div>

        <div className="search-section" data-aos="zoom-in">
          <div className="search-wrapper">
<<<<<<< HEAD
            <input
              type="text"
              placeholder="ابحث عن حرفي بالاسم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
=======
            <input 
              type="text" 
              placeholder="ابحث عن الحرفي أو السعر..."  
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="search-input" 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            />
            <div className="search-icon-box">
              <img src="/images/Artisans/Artisanssearchicon.svg" alt="search" />
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* سكشن عرض الكروت */}
      <section className="artisans-main-wrapper">
        <div className="container">
          {loading ? (
            <p style={{ textAlign: 'center', padding: '50px' }}>جاري البحث عن أمهر الحرفيين...</p>
          ) : (
            <div className="artisans-grid">
              {filteredArtisans.length > 0 ? (
                filteredArtisans.map((item) => (
                  /* ✅ الزتونة هنا: الرابط يوجه لـ CraftmanProfile مع تمرير الـ ID */
                  <Link to={`/CraftmanProfile/${item.id}`} key={item.id} className="card-link">
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
                ))
              ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
                  <h3>عذراً، لا يوجد حرفيون متاحون لهذه المهنة حالياً</h3>
                </div>
              )}
            </div>
          )}
        </div>

        {/* زر عرض المزيد يظهر فقط إذا كان هناك داتا كافية */}
        {artisansData.length > 6 && (
=======
       <section className="artisans-main-wrapper">
             <div className="container">
               {loading ? (
                 <p style={{textAlign: 'center', padding: '50px'}}>جاري تحميل المحترفين...</p>
               ) : (
                 <div className="artisans-grid">
                   {artisansData.length > 0 ? (
                     artisansData.map((item) => (
                       <Link to={`/ProProfile/${item.id}`} key={item.id} className="card-link">
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
                     ))
                   ) : (
                     <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '50px'}}>
                       <h3>لا يوجد حرفيون متاحون لهذه الخدمة حالياً</h3>
                     </div>
                   )}
                 </div>
               )}
             </div>



        {artisansData.length > 0 && (
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          <div className="load-more-container" data-aos="fade-up">
            <button className="load-more-btn">عرض المزيد ∨</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Artisans;