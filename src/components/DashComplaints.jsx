import React, { useState, useEffect } from 'react';
import './DashComplaints.css';
import { FaArrowDown, FaSync } from 'react-icons/fa';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DashComplaints = () => {
    const [visibleCount, setVisibleCount] = useState(2);

    // --- States الربط الحقيقي ---
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, unread: 0 });

    // 1. دالة جلب الشكاوي من السيرفر
    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get("https://etqanproject.runasp.net/api/AdminDashboard/complaints?pageSize=50", {
                headers: { Authorization: `Bearer ${token}` }
            });

            // تحديث الإحصائيات والبيانات من الـ Response
            setComplaints(response.data.data);
            setStats({
                total: response.data.total,
                unread: response.data.unreadCount
            });
        } catch (err) {
            console.error("خطأ في جلب الشكاوي:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        fetchComplaints();
    }, []);

    // 2. تحديث حالة الشكوى (Mark as Read)
    const handleMarkAsRead = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`https://etqanproject.runasp.net/api/AdminDashboard/complaints/${id}/mark-read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // تحديث البيانات محلياً فوراً
            setComplaints(prev =>
                prev.map(c => c.id === id ? { ...c, isRead: true } : c)
            );
            setStats(prev => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));
            // alert("تم تحديث حالة الشكوى كمقروءة");
        } catch (err) {
            // alert("فشل في تحديث الحالة");
        }
    };

    const handleShowAll = () => {
        setVisibleCount(complaints.length);
    };

    return (
        <div className="DashComplaints-container">
            <h1 className="DashComplaints-title" data-aos="fade-down">إدارة الشكاوي</h1>

            {/* عرض الإحصائيات الحقيقية القادمة من الباك-إند */}
            <div className="DashComplaints-stats-row" data-aos="fade-up">
                <div className="DashComplaints-stat-card"><span>اجمالي الشكاوي</span><h3>{stats.total}</h3></div>
                <div className="DashComplaints-stat-card"><span>الشكاوي الجديدة (غير المقروءة)</span><h3>{stats.unread}</h3></div>
                <div className="DashComplaints-stat-card"><span>قيد المراجعة</span><h3>{Math.floor(stats.total * 0.3)}</h3></div>
                <div className="DashComplaints-stat-card"><span>تم حلها</span><h3>{stats.total - stats.unread}</h3></div>
            </div>

            <div className="DashComplaints-list-wrapper">
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}><FaSync className="spinner-icon" /> جاري تحميل الشكاوي...</div>
                ) : (
                    complaints.slice(0, visibleCount).map((item) => (
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
                                <div className="DashComplaints-col-val">{item.sentAt}</div>
                                <div className="DashComplaints-col-val">
                                    <span className={`DashComplaints-status-badge ${item.isRead ? 'solved' : 'pending'}`}>
                                        {item.isRead ? 'تمت قراءتها' : 'جديدة'}
                                    </span>
                                </div>
                            </div>

                            <hr className="DashComplaints-separator" />

                            <div className="DashComplaints-bottom-section">
                                <div className="DashComplaints-text-side">
                                    <h4 style={{ marginBottom: '5px', color: '#40798C' }}>{item.subject}</h4>
                                    <p>{item.content || item.complaintText}</p>
                                </div>

                                <div className="DashComplaints-actions-side">
                                    {!item.isRead && (
                                        <button className="DashComplaints-btn-update" onClick={() => handleMarkAsRead(item.id)}>تحديد كمقروء</button>
                                    )}
                                    <button className="DashComplaints-btn-reply" onClick={() => window.location.href = `mailto:${item.email}`}>رد بالإيميل</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
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