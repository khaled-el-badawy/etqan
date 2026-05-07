import React, { useState, useEffect } from 'react';
import './DashComplaints.css';
import { FaArrowDown } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DashComplaints = () => {
    const initialComplaints = [
        {
            id: 21,
            name: "يوسف محمد",
            email: "youssef@gmail.com",
            date: "13 / 4 / 2026",
            status: "قيد المراجعة",
            text: "الموقع بيحمل ببطئ جداً خاصة لما أحاول أدخل على صفحة العروض ، أنا جربت كذا متصفح والمشكلة مستمرة ، ياريت تشوفوا حل بسرعة لأن دا بيضيع وقتي وبيمنعني من إتمام الطلبات"
        },
        {
            id: 20,
            name: "محمود رضا",
            email: "mahmoud@gmail.com",
            date: "23 / 3 / 2026",
            status: "تم حلها",
            text: "الإشعارات بتوصل متأخرة جداً ، الحرفي بيبعت لي رسالة على الشات الداخلي للموقع ومش بيوصلني تنبيه إلا بعد ساعات وده بيأخر التواصل بينا"
        },
        {
            id: 19,
            name: "أحمد علي",
            email: "ahmed@gmail.com",
            date: "10 / 3 / 2026",
            status: "جديدة",
            text: "هناك مشكلة في تحديث بيانات الملف الشخصي، تظهر رسالة خطأ عند محاولة حفظ التغييرات."
        }
    ];

    const [visibleCount, setVisibleCount] = useState(2);
    const [complaints] = useState(initialComplaints);

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);

    const handleShowAll = () => {
        setVisibleCount(complaints.length);
    };

    return (
        <div className="DashComplaints-container">
            <h1 className="DashComplaints-title" data-aos="fade-down">إدارة الشكاوي</h1>

            <div className="DashComplaints-stats-row" data-aos="fade-up">
                <div className="DashComplaints-stat-card"><span>اجمالي الشكاوي</span><h3>32</h3></div>
                <div className="DashComplaints-stat-card"><span>الشكاوي الجديدة</span><h3>5</h3></div>
                <div className="DashComplaints-stat-card"><span>قيد المراجعة</span><h3>12</h3></div>
                <div className="DashComplaints-stat-card"><span>تم حلها</span><h3>15</h3></div>
            </div>

            <div className="DashComplaints-list-wrapper">
                {complaints.slice(0, visibleCount).map((item) => (
                    <div className="DashComplaints-card" key={item.id} data-aos="zoom-in-up">
                        
                        <div className="DashComplaints-table-header">
                            <div className="DashComplaints-col">رقم الشكوى</div>
                            <div className="DashComplaints-col">الاسم</div>
                            <div className="DashComplaints-col">البريد الالكتروني</div>
                            <div className="DashComplaints-col">تاريخ التقديم</div>
                            <div className="DashComplaints-col">حالة الشكوى</div>
                        </div>

                        <div className="DashComplaints-table-row">
                            <div className="DashComplaints-col-val"><span className="id-box">{item.id}</span></div>
                            <div className="DashComplaints-col-val">{item.name}</div>
                            <div className="DashComplaints-col-val">{item.email}</div>
                            <div className="DashComplaints-col-val">{item.date}</div>
                            <div className="DashComplaints-col-val">
                                <span className={`DashComplaints-status-badge ${item.status === 'تم حلها' ? 'solved' : 'pending'}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>

                        <hr className="DashComplaints-separator" />

                        <div className="DashComplaints-bottom-section">
                            <div className="DashComplaints-text-side">
                                <p>{item.text}</p>
                            </div>

                            <div className="DashComplaints-actions-side">
                                <button className="DashComplaints-btn-update">تحديث الحالة</button>
                                <button className="DashComplaints-btn-reply">رد</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < complaints.length && (
                <div className="DashComplaints-footer-action">
                    <button className="DashComplaints-show-all-btn" onClick={handleShowAll}>
                         عرض الكل <FaArrowDown />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashComplaints;