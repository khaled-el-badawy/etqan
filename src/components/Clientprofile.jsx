import React, { useEffect, useState } from 'react';
import './ClientProfile.css';
import { FaStar, FaStarHalfAlt, FaRegStar, FaEdit, FaExclamationTriangle } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ClientProfile = () => {
  
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const reviews = [
    { id: 1, name: "احمد علي", job: "سباك", date: "15/2/2025", rating: 5, img: "/images/Client profile/icon1.svg" },
    { id: 2, name: "محمد محمود", job: "كهربائي", date: "5/3/2025", rating: 5, img: "/images/Client profile/icon2.svg" },
    { id: 3, name: "شركة مكة", job: "شركة نقل", date: "1/5/2025", rating: 4, img: "/images/Client profile/icon3.svg" },
    { id: 4, name: "علي محمود", job: "فني كاميرات", date: "1/5/2025", rating: 4, img: "/images/Client profile/icon1.svg" },
  ];

  
  const historyData = [
    { id: 1, name: "احمد علي", job: "سباك", icon: "/images/Client profile/Client icon1.svg" }, 
    { id: 2, name: "محمد محمود", job: "كهربائي", icon: "/images/Client profile/Client icon2.svg" },
    { id: 3, name: "شركة مكة", job: "شركة نقل", icon: "/images/Client profile/Client icon3.svg" },
    { id: 4, name: "علي محمود", job: "فني كاميرات", icon: "/images/Client profile/Client icon4.svg" },
  ];

  return (
    <div className="profile-container">
    
      <header className="profile-header" style={{ backgroundImage: `url('/images/Client profile/hero.svg')` }}>
      </header>

   
      <div className="profile-identity-wrapper" data-aos="fade-left">
        <div className="identity-content">
          <div className="avatar-container">
            <img src="/images/Client profile/client.svg" alt="Client" className="main-avatar" />
          </div>
          <div className="name-verify-block">
            <h2 className="client-name">
              محمد السيد
              <img src="/images/Client profile/profilelogo1.svg" alt="Verified" className="verify-tick" />
              <img 
                src="/images/Client profile/profilelogo2.svg" 
                alt="Edit" 
                className="edit-name-icon" 
                title="تعديل البيانات" 
                onClick={() => setActiveTab('edit')}
              />
            </h2>
          </div>
        </div>
      </div>

      {activeTab !== 'edit' && (
        <div className="profile-tabs">
          <button 
            className={`tab-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            عن العميل
          </button>
          <button 
            className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            تقييمات
          </button>
        </div>
      )}

      {/* --- 1. صفحة عن العميل --- */}
      {activeTab === 'about' && (
        <div className="about-content-card" data-aos="fade-up">
            <div className="history-label-box">السجلات السابقه</div>
            <div className="history-list">
                {historyData.map((item) => (
                    <div key={item.id} className="history-item-row">
                        <div className="history-user-info">
                            <img src={item.icon} alt="icon" className="category-icon" />
                            <div className='user-text'>
                                <h4 >{item.name}</h4>
                                <p>{item.job}</p>
                            </div>
                        </div>
                        <div className="history-rating-side">
                            <button className="small-rate-btn">
                            <span>تقييم </span>
                            <span>★★★</span>
                              </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="show-more-arrow">عرض المزيد ∨</button>
        </div>
      )}

      {/* --- 2. صفحة التقييمات --- */}
      {activeTab === 'reviews' && (
        <div className="reviews-section-card" data-aos="zoom-in">
          <div className="rating-header-row">
            <h3 className="section-title">التقييمات</h3>
            <div className="rating-summary-box">
               <div className="bars-side">
                  {[5, 4, 3, 2, 1].map(num => (
                    <div key={num} className="bar-row">
                      <span className="bar-label">{num}</span>
                      <div className="bar-track">
                        <div className="bar-level" style={{ width: num === 5 ? '90%' : num === 4 ? '15%' : '5%' }}></div>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="score-side">
                  <span className="big-score">4.8</span>
                  <div className="stars-icons-rtl">
                    <FaStarHalfAlt />
                    <FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
               </div>
            </div>
          </div>
          <div className="reviews-feed">
            {reviews.map((rev) => (
              <div key={rev.id} className="review-card-item">
                <div className="user-meta">
                  <img src={rev.img} alt={rev.name} />
                  <div className="user-text">
                    <h4>{rev.name}</h4>
                    <p>{rev.job}</p>
                  </div>
                </div>
                <div className="review-status">
                  <span className="date-stamp">{rev.date}</span>
                  <div className="stars-group">
                    {[...Array(5)].map((_, i) => (
                      i < rev.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                    ))}
                  </div>
                </div>
                <div className="review-btns">
                  <button className="btn-edit-rev"><FaEdit /> تعديل</button>
                  <button className="btn-complain"><FaExclamationTriangle /> شكوي</button>
                </div>
              </div>
            ))}
          </div>
          <button className="load-more">عرض كل التقييمات ↓</button>
        </div>
      )}

      {/* --- 3. صفحة التفاصيل الشخصية --- */}
      {activeTab === 'edit' && (
        <div className="edit-details-card" data-aos="fade-left">
            <div className="edit-nav-tab">التفاصيل شخصية</div>
            <h3 className="form-title">البيانات الشخصية</h3>
            <form className="personal-data-form">
                <input type="email" placeholder="البريد الالكتروني" className="form-input" />
                <input type="tel" placeholder="رقم الهاتف" className="form-input" />
                <input type="text" placeholder="المحافظة" className="form-input" />
                <input type="password" placeholder="تغيير كلمه السر" className="form-input" />
                
                <div className="form-buttons">
                    <button type="submit" className="btn-save">حفظ</button>
                    <button type="button" className="btn-cancel" onClick={() => setActiveTab('about')}>إلغاء</button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};

export default ClientProfile;