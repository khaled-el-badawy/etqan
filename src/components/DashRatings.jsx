import React, { useState, useEffect } from 'react';
import './DashRatings.css';
import { FaStar, FaArrowUp, FaArrowDown, FaCalendarAlt, FaClock } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DashRatings = () => {
    const [filter, setFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);

    const ratingsData = [
        { id: 1, name: 'إبراهيم محمد', rating: 5, comment: 'الموقع سهل جداً، وصلت للحرفي اللي محتاجه بسرعة، والشغل اتعمل كويس وفي ميعاده', date: '12/10/2025', time: '10:36 am', img: '/images/Ratingsicon/Ratingsicon1.svg' },
        { id: 2, name: 'أحمد مصطفى', rating: 1, comment: 'الموقع بطيء وفيه مشاكل كتير، كل شوية بيعلق ومش بعرف أعمل طلب بسهولة', date: '12/10/2025', time: '10:36 am', img: '/images/Ratingsicon/Ratingsicon2.svg' },
        { id: 3, name: 'محمود جابر', rating: 4, comment: 'تجربة جيدة جداً، استجابة سريعة من خدمة العملاء والحرفيين محترفين', date: '11/10/2025', time: '09:00 am', img: '/images/Ratingsicon/Ratingsicon3.svg' },
        { id: 4, name: 'سيد علي', rating: 2, comment: 'الأسعار مرتفعة قليلاً مقارنة بالسوق، والتطبيق يحتاج لتحديث', date: '10/10/2025', time: '11:15 pm', img: '/images/Ratingsicon/Ratingsicon1.svg' },
        { id: 5, name: 'إبراهيم محمد', rating: 5, comment: 'الموقع سهل جداً، وصلت للحرفي اللي محتاجه بسرعة، والشغل اتعمل كويس وفي ميعاده', date: '12/10/2025', time: '10:36 am', img: '/images/Ratingsicon/Ratingsicon2.svg' },
        { id: 6, name: 'أحمد مصطفى', rating: 1.5, comment: 'الموقع بطيء وفيه مشاكل كتير، كل شوية بيعلق ومش بعرف أعمل طلب بسهولة', date: '12/10/2025', time: '10:36 am', img: '/images/Ratingsicon/Ratingsicon3.svg' },
        { id: 7, name: 'علي حسن', rating: 4.5, comment: 'ممتاز جداً وأنصح الجميع بالتعامل معهم', date: '09/10/2025', time: '08:20 am', img: '/images/Ratingsicon/Ratingsicon1.svg' },
        { id: 8, name: 'كمال ياسين', rating: 2, comment: 'التجربة لم تكن موفقة هذه المرة', date: '08/10/2025', time: '05:40 pm', img: '/images/Ratingsicon/Ratingsicon2.svg' },
    ];

    const filteredRatings = ratingsData.filter(item => {
        if (filter === 'best') return item.rating >= 2.5;
        if (filter === 'worst') return item.rating < 2.5;
        return true;
    });

    return (
        <div className="ratings-main-page" data-aos="fade-up">
            <h1 className="ratings-title">التقييمات</h1>
            
            <div className="ratings-filter-tabs">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => {setFilter('all'); setVisibleCount(4);}}>الكل</button>
                <button className={filter === 'best' ? 'active' : ''} onClick={() => {setFilter('best'); setVisibleCount(4);}}>أفضل التقييمات</button>
                <button className={filter === 'worst' ? 'active' : ''} onClick={() => {setFilter('worst'); setVisibleCount(4);}}>أقل التقييمات</button>
            </div>

            <div className="ratings-records-box">
                <div className="records-header">سجل الآراء والتقييمات الواردة</div>
                
                <div className="records-list">
                    {filteredRatings.slice(0, visibleCount).map((item) => (
                        <div key={item.id} className="rating-card" data-aos="fade-up">
                            
                            <div className="card-user-side">
                                <div className="user-avatar-wrapper">
                                    <img src={item.img} alt={item.name} className="user-img" />
                                    {item.rating >= 2.5 ? (
                                        <div className="status-icon best-icon"><FaArrowUp /></div>
                                    ) : (
                                        <div className="status-icon worst-icon"><FaArrowDown /></div>
                                    )}
                                </div>
                                <div className="user-info-text">
                                    <h4>{item.name}</h4>
                                    <div className="stars-row">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < Math.floor(item.rating) ? "star-gold" : "star-gray"} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card-content-side">
                                <p className="comment-text">{item.comment}</p>
                                <div className="comment-meta">
                                    <span><FaCalendarAlt className="meta-icon" /> {item.date}</span>
                                    <span><FaClock className="meta-icon" /> {item.time}</span>
                                </div>
                            </div>

                            <div className="card-left-side">
                                <button className="add-to-home-btn">إضافة إلى الصفحة الرئيسية</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {visibleCount < filteredRatings.length && (
                <div className="load-more-section">
                    <button className="load-more-btn" onClick={() => setVisibleCount(visibleCount + 4)}>
                        عرض الكل ↓
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashRatings;