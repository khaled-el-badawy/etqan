import React, { useState, useEffect } from "react";
import "./Dashcustomer.css";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashcustomer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [visibleCount, setVisibleCount] = useState(7);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. دالة جلب العملاء من الباك-إند ---
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      // نبعت الـ search والـ pagination للباك إند
      const response = await axios.get(
        `https://etqanproject.runasp.net/api/AdminDashboard/customers?search=${searchTerm}&pageSize=50`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // عمل Mapping للبيانات عشان تمشي مع أسماء الأعمدة عندك
      const mappedData = response.data.data.map((c) => ({
        id: c.id,
        name: c.fullName,
        location: c.governorate || "غير محدد",
        phone: c.phoneNumber,
        email: c.email,
        date: c.createdAt,
      }));

      setCustomers(mappedData);
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    fetchCustomers();
  }, [searchTerm]); // تحديث البيانات عند البحث فوراً

  // --- 2. دالة الحذف (Soft Delete) من الباك-إند ---
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://etqanproject.runasp.net/api/AdminDashboard/customers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // تحديث اللستة في الفرونت إند بعد الحذف الناجح
        setCustomers(customers.filter((c) => c.id !== id));
        // alert("تم حذف العميل بنجاح");
      } catch (error) {
        // alert("حدث خطأ أثناء الحذف، تأكد من صلاحياتك");
      }
    }
  };

  // الترتيب (Sorting) الداخلي
  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "location") return a.location.localeCompare(b.location);
    return new Date(b.date) - new Date(a.date); // الأحدث أولاً
  });

  const displayedCustomers = sortedCustomers.slice(0, visibleCount);

  return (
    <div className="dashcustomer-page" data-aos="fade-up">
      <div className="top-header-row">
        <h1 className="page-title">إدارة العملاء</h1>
        <div className="top-actions-left">
          <div className="filter-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">الأحدث انضماماً</option>
              <option value="name">الترتيب الأبجدي</option>
              <option value="location">المحافظة</option>
            </select>
          </div>
          {/* ملاحظة: إضافة عميل جديد تتم عادة عبر صفحة الـ Register، لكن الزر موجود للتصميم */}
          <button className="add-btn-main">
            <FaPlus /> إضافة عميل
          </button>
        </div>
      </div>

      <div className="search-section-wrapper">
        <div className="search-input-box">
          <input
            type="text"
            placeholder="البحث عن عميل بالاسم أو الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon-left" />
        </div>
      </div>

      <div className="table-main-wrapper">
        {loading ? (
          <div className="loading-text">جاري جلب بيانات "إتقان"...</div>
        ) : (
          <table className="customers-data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>الاسم</th>
                <th>المحافظة</th>
                <th>رقم الهاتف</th>
                <th>البريد الالكتروني</th>
                <th>اجراءات</th>
              </tr>
            </thead>
            <tbody>
              {displayedCustomers.map((customer, index) => (
                <tr key={customer.id} data-aos="fade-up">
                  <td className="count-col">{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.location}</td>
                  <td>{customer.phone}</td>
                  <td className="email-text">{customer.email}</td>
                  <td className="actions-btns">
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/Clientprofile/${customer.id}`)}
                    >
                      عرض
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(customer.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {visibleCount < customers.length && (
        <div className="footer-action">
          <button
            className="show-all-btn-styled"
            onClick={() => setVisibleCount(visibleCount + 7)}
          >
            عرض المزيد ↓
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashcustomer;