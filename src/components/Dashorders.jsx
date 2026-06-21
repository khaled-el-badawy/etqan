import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { FaSearch, FaSync } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import axios from 'axios';
=======
import {  FaSearch } from "react-icons/fa";
import {  IoCheckmarkCircle } from "react-icons/io5";
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Dashorders.css';

<<<<<<< HEAD
=======
const allOrdersData = [
  { id: "#131", img: "/images/Dashorders/Dashordersicon1.svg", name: "شنيور فك وربط milwaukee لاسلكي ببطارية", qty: 2, price: 11900, date: "2026 / 4 / 13 ", status: "تم الشحن", customer: "أحمد فوزي", phone: "01034679766", address: "القاهرة - مدينة نصر" },
  { id: "#148", img: "/images/Dashorders/Dashordersicon2.svg", name: "طقم شنيور makita متكامل مع شنطة وشاحن", qty: 1, price: 9990, date: "2026 / 4 / 29", status: "قيد التنفيذ", customer: "يوسف علي", phone: "01039237166", address: "المنصورة - حي الجامعة" },
  { id: "#150", img: "/images/Dashorders/Dashordersicon1.svg", name: "صاروخ تقطيع خرسانة Bosch محترف", qty: 3, price: 15000, date: "2026 / 5 / 5", status: "تم الشحن", customer: "محمد جابر", phone: "0128834455", address: "الإسكندرية - سموحة" },
  { id: "#162", img: "/images/Dashorders/Dashordersicon2.svg", name: "مفك كهربائي صغير للموبايلات", qty: 5, price: 1200, date: " 2026 / 5 / 19", status: "قيد التنفيذ", customer: "سارة محمود", phone: "01566778899", address: "الجيزة - الدقي" },
];

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
const Dashorders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(2);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const filteredOrders = allOrdersData.filter(order =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  );

  return (
    <div className="etqan-dash-orders-page">
      <div className="etqan-container">
        <h2 className="etqan-main-title" data-aos="fade-right">إدارة الطلبات</h2>

        <div className="etqan-search-section-wrapper" data-aos="fade-left">
          <div className="etqan-search-input-box">
            <FaSearch className="etqan-search-icon-left" />
<<<<<<< HEAD
            <input
              type="text"
              placeholder="بحث برقم الطلب أو العميل..."
=======
            <input 
              type="text" 
              placeholder="بحث عن منتج أو عميل..." 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              className="etqan-search-input-field"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="etqan-orders-wrapper">
<<<<<<< HEAD
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
=======
          {filteredOrders.slice(0, visibleCount).map((order, index) => (
            <div className="etqan-order-card-box" key={index} data-aos="zoom-in">
              <div className="etqan-table-responsive">
                <table className="etqan-custom-table">
                  <thead>
                    <tr>
                      <th>رقم الطلب</th>
                      <th>صورة المنتج</th>
                      <th>اسم المنتج</th>
                      <th>الكمية</th>
                      <th>السعر</th>
                      <th>تاريخ الطلب</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="etqan-center-cell">{order.id}</td>
                      <td className="etqan-center-cell">
                        <img src={order.img} alt="product" className="etqan-p-img" />
                      </td>
                      <td className="etqan-p-name etqan-center-cell">{order.name}</td>
                      <td className="etqan-center-cell">{order.qty}</td>
                      <td className="etqan-p-price etqan-center-cell">{order.price} ج.م</td>
                      <td className="etqan-center-cell">{order.date}</td>
                    </tr>
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
                  <label>العنوان</label>
                  <p>{order.address}</p>
                </div>
                <div className="etqan-info-item">
                  <label>حالة الطلب</label>
                  <div className={`etqan-status-wrapper ${order.status === "تم الشحن" ? "etqan-status-success" : "etqan-status-warning"}`}>
                    <span>{order.status}</span>
                    {order.status === "تم الشحن" && < IoCheckmarkCircle className="etqan-check-icon" />}
                  </div>
                </div>
              </div>

              <button className="etqan-btn-update">تحديث حالة الطلب</button>
            </div>
          ))}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        </div>

        {visibleCount < filteredOrders.length && (
          <button className="etqan-load-more-btn" onClick={() => setVisibleCount(prev => prev + 2)}>
            <span className="etqan-arrow">↓</span> عرض الكل
          </button>
        )}
      </div>
<<<<<<< HEAD
    </div >
=======
    </div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  );
};

export default Dashorders;