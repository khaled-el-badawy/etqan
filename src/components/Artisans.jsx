import React, { useEffect,useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import './Artisans.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios'; // استيراد أكسيوس

const Artisans = () => {
  const { jobId } = useParams(); // لقط الـ ID من الرابط
  const [artisansData, setArtisansData] = useState([]); // داتا فاضية في البداية
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
      } catch (error) {
        console.error("خطأ في جلب الحرفيين:", error);
      } finally {
        setLoading(false);
      }
    };

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
          <hr className="artisans-line" />
        </div>

        <div className="search-section" data-aos="zoom-in">
          <div className="search-wrapper">
            <input type="text" placeholder="ابحث عن السعر..."  value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
            <div className="search-icon-box">
              <img src="/images/Artisans/Artisanssearchicon.svg" alt="search" />
            </div>
          </div>
        </div>
      </section>

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
          <div className="load-more-container" data-aos="fade-up">
            <button className="load-more-btn">عرض المزيد ∨</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Artisans;
