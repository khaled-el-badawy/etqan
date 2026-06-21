import React, { useState, useEffect } from 'react';
import './DashRatings.css';
<<<<<<< HEAD
import { FaStar, FaArrowUp, FaArrowDown, FaCalendarAlt, FaClock, FaSync } from 'react-icons/fa';
import axios from 'axios';
=======
import { FaStar, FaArrowUp, FaArrowDown, FaCalendarAlt, FaClock } from 'react-icons/fa';
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
import AOS from 'aos';
import 'aos/dist/aos.css';

const DashRatings = () => {
    const [filter, setFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(4);

<<<<<<< HEAD
    // --- States الربط الحقيقي ---
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. دالة جلب التقييمات من السيرفر
    const fetchRatings = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            // جلب 50 تقييم كمثال لتشغيل الفلترة الداخلية
            const res = await axios.get("https://etqanproject.runasp.net/api/AdminDashboard/ratings?pageSize=50", {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Mapping للبيانات عشان تمشي مع تصميمك
            const mappedData = res.data.data.map(r => ({
                id: r.id,
                name: r.reviewerName,
                rating: r.rating,
                comment: r.comment || "بدون تعليق",
                date: r.createdAt, // الباك إند بيبعت YYYY-MM-DD
                time: "10:00 am", // افتراضي لأن الباك إند حالياً بيبعت التاريخ بس
                img: r.reviewerPicture || '/images/Ratingsicon/Ratingsicon1.svg',
                target: r.artisanName || r.companyName // عشان تعرف التقييم ده لمين
            }));

            setRatings(mappedData);
        } catch (err) {
            console.error("Error fetching ratings:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        fetchRatings();
    }, []);

    // 2. منطق الفلترة (نفس اللوجيك بتاعك بس على الداتا الحقيقية)
    const filteredRatings = ratings.filter(item => {
        if (filter === 'best') return item.rating >= 4; // عدلتها لـ 4 عشان يبقى "أفضل" فعلاً
=======
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
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        if (filter === 'worst') return item.rating < 2.5;
        return true;
    });

    return (
        <div className="ratings-main-page" data-aos="fade-up">
<<<<<<< HEAD
            <h1 className="ratings-title">التقييمات الحقيقية</h1>

            <div className="ratings-filter-tabs">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => { setFilter('all'); setVisibleCount(4); }}>الكل</button>
                <button className={filter === 'best' ? 'active' : ''} onClick={() => { setFilter('best'); setVisibleCount(4); }}>أفضل التقييمات</button>
                <button className={filter === 'worst' ? 'active' : ''} onClick={() => { setFilter('worst'); setVisibleCount(4); }}>أقل التقييمات</button>
            </div>

            <div className="ratings-records-box">
                <div className="records-header">سجل الآراء والتقييمات الواردة من المستخدمين</div>

                <div className="records-list">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}><FaSync className="spinner-icon" /> جاري التحميل...</div>
                    ) : filteredRatings.length > 0 ? (
                        filteredRatings.slice(0, visibleCount).map((item) => (
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
                                        <p style={{ fontSize: '11px', color: '#40798C' }}>تقييم لـ: {item.target}</p>
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
                                    <button className="add-to-home-btn" onClick={() => {/* alert("سيتم العرض في الصفحة الرئيسية قريباً") */ }}>إضافة إلى الصفحة الرئيسية</button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '30px' }}>لا توجد تقييمات تطابق هذا الفلتر حالياً</div>
                    )}
                </div>
            </div>

            {
                visibleCount < filteredRatings.length && (
                    <div className="load-more-section">
                        <button className="load-more-btn" onClick={() => setVisibleCount(visibleCount + 4)}>
                            عرض المزيد ↓
                        </button>
                    </div>
                )
            }
        </div >
=======
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
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    );
};

export default DashRatings;