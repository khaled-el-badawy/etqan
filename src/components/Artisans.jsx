<<<<<<< HEAD
import React, { useEffect,useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
=======
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
>>>>>>> fb4d3f43fa13f5f538fc60575b3fb5ace2d9560b
import './Artisans.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios'; // استيراد أكسيوس

const Artisans = () => {
<<<<<<< HEAD
  const { jobId } = useParams(); // لقط الـ ID من الرابط
  const [artisansData, setArtisansData] = useState([]); // داتا فاضية في البداية
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
=======
  const [searchTerm, setSearchTerm] = useState("");
  
  const [artisans, setArtisans] = useState(() => {
    const saved = localStorage.getItem('sharedArtisans');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'أحمد علي', price: '150 ج', rate: '4.9', img: '/images/Artisans/Artisans1.svg' },
      { id: 2, name: 'السيد محمد', price: '200 ج', rate: '4.9', img: '/images/Artisans/Artisans2.svg' },
      { id: 3, name: 'محمود طه', price: '120 ج', rate: '4.9', img: '/images/Artisans/Artisans3.svg' },
      { id: 4, name: 'علي محمد', price: '300 ج', rate: '4.9', img: '/images/Artisans/Artisans4.svg' },
      { id: 5, name: 'محمد ابراهيم', price: '310 ج', rate: '4.9', img: '/images/Artisans/Artisans5.svg' },
      { id: 6, name: 'خالد اسماعيل', price: '280 ج', rate: '4.9', img: '/images/Artisans/Artisans6.svg' },
      { id: 7, name: 'ياسين احمد', price: '280 ج', rate: '4.9', img: '/images/Artisans/Artisans6.svg' },
      { id: 8, name: 'شعبان عبدالرحيم', price: '280 ج', rate: '4.9', img: '/images/Artisans/Artisans6.svg' },
    ];
  });
>>>>>>> fb4d3f43fa13f5f538fc60575b3fb5ace2d9560b

  useEffect(() => {
    // تشغيل الأنيميشن
    AOS.init({
      duration: 1000,
      once: true,
    });
<<<<<<< HEAD

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
=======
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sharedArtisans');
      if (saved) setArtisans(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredName = artisans.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price.toString().includes(searchTerm)
  );

>>>>>>> fb4d3f43fa13f5f538fc60575b3fb5ace2d9560b
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
              placeholder="ابحث عن الحرفي أو السعر..."  
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