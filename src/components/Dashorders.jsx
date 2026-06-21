import React, { useState, useEffect } from 'react';
import { FaSearch, FaSync } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Dashorders.css';

const Dashorders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(2);

  // --- States الربط الحقيقي ---
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. دالة جلب الطلبات من السيرفر
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://etqanproject.runasp.net/api/AdminDashboard/orders?pageSize=50`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // تحويل داتا الباك-إند لتناسب الـ UI بتاعك
      const mappedOrders = res.data.data.map(o => ({
        id: `#${o.id}`,
        customer: o.clientName,
        phone: o.clientPhone,
        address: "مكتوم في الطلب", // الباك إند حالياً مش بيبعت العنوان في الـ Select
        totalPrice: o.totalPrice,
        date: o.orderDate,
        status: o.isServiceOrder ? "خدمة فنية" : "تم الشحن",
        // جلب أول منتج في الطلب للعرض في الجدول الصغير
        items: o.items && o.items.length > 0 ? o.items : [{ productName: "منتج عام", quantity: 1, unitPrice: o.totalPrice }]
      }));

      setOrders(mappedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchOrders();
  }, []);

  // الفلترة بالاسم أو العميل
  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.includes(searchTerm)
  );

  return (
    <div className="etqan-dash-orders-page">
      <div className="etqan-container">
        <h2 className="etqan-main-title" data-aos="fade-right">إدارة الطلبات</h2>

        <div className="etqan-search-section-wrapper" data-aos="fade-left">
          <div className="etqan-search-input-box">
            <FaSearch className="etqan-search-icon-left" />
            <input
              type="text"
              placeholder="بحث برقم الطلب أو العميل..."
              className="etqan-search-input-field"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="etqan-orders-wrapper">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}><FaSync className="spinner-icon" /> جاري تحميل الطلبات...</div>
          ) : (
            filteredOrders.slice(0, visibleCount).map((order, index) => (
              <div className="etqan-order-card-box" key={index} data-aos="zoom-in">
                <div className="etqan-table-responsive">
                  <table className="etqan-custom-table">
                    <thead>
                      <tr>
                        <th>رقم الطلب</th>
                        <th>اسم المنتج</th>
                        <th>الكمية</th>
                        <th>سعر الوحدة</th>
                        <th>التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="etqan-center-cell">{idx === 0 ? order.id : ""}</td>
                          <td className="etqan-p-name etqan-center-cell">{item.productName}</td>
                          <td className="etqan-center-cell">{item.quantity}</td>
                          <td className="etqan-p-price etqan-center-cell">{item.unitPrice} ج.م</td>
                          <td className="etqan-center-cell">{idx === 0 ? order.date : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="etqan-order-info-grid">
                  <div className="etqan-info-item">
                    <label>اسم العميل</label>
                    <p>{order.customer}</p>
                  </div>
                  <div className="etqan-info-item">
                    <label>رقم الهاتف</label>
                    <p>{order.phone}</p>
                  </div>
                  <div className="etqan-info-item">
                    <label>إجمالي الحساب</label>
                    <p style={{ fontWeight: 'bold', color: '#40798C' }}>{order.totalPrice} ج.م</p>
                  </div>
                  <div className="etqan-info-item">
                    <label>حالة الطلب</label>
                    <div className={`etqan-status-wrapper ${order.status === "تم الشحن" ? "etqan-status-success" : "etqan-status-warning"}`}>
                      <span>{order.status}</span>
                      {order.status === "تم الشحن" && < IoCheckmarkCircle className="etqan-check-icon" />}
                    </div>
                  </div>
                </div>

                <button className="etqan-btn-update" onClick={() => {/* alert("سيتم تفعيل تحديث الحالة قريباً") */ }}>تحديث حالة الطلب</button>
              </div>
            ))
          )}
        </div>

        {visibleCount < filteredOrders.length && (
          <button className="etqan-load-more-btn" onClick={() => setVisibleCount(prev => prev + 2)}>
            <span className="etqan-arrow">↓</span> عرض الكل
          </button>
        )}
      </div>
    </div >
  );
};

export default Dashorders;