import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Artisans.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Artisans = () => {
  const { jobId } = useParams(); // لقط الـ ID من الرابط (مثلاً: 9 للمنجد)
  const [artisansData, setArtisansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
      } catch (error) {
        console.error("خطأ في جلب الحرفيين:", error);
      } finally {
        setLoading(false);
      }
    };

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
          <hr className="artisans-line" />
        </div>

        <div className="search-section" data-aos="zoom-in">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="ابحث عن حرفي بالاسم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="search-icon-box">
              <img src="/images/Artisans/Artisanssearchicon.svg" alt="search" />
            </div>
          </div>
        </div>
      </section>

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
          <div className="load-more-container" data-aos="fade-up">
            <button className="load-more-btn">عرض المزيد ∨</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Artisans;