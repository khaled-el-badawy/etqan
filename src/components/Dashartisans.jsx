import React, { useState, useEffect } from 'react';
import './Dashartisans.css';
import { FaSearch, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Dashartisans = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [visibleCount, setVisibleCount] = useState(7);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // --- 1. الـ State الأساسية للبيانات (تبدأ بمصفوفة فارغة) ---
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 2. دالة جلب بيانات الحرفيين من الـ AdminDashboardController ---
  const fetchArtisans = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://etqanproject.runasp.net/api/AdminDashboard/artisans?search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Mapping البيانات عشان تطابق الـ UI عندك
      const mappedData = res.data.data.map(a => ({
        id: a.id,
        name: a.fullName,
        location: a.governorate,
        phone: a.phoneNumber,
        email: a.email,
        date: a.createdAt, // التاريخ الحقيقي للانضمام
        job: a.jobName,
        rate: a.averageRating
      }));

      setArtisans(mappedData);
    } catch (err) {
      console.error("خطأ في جلب بيانات الحرفيين:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    fetchArtisans();
  }, [searchTerm]); // التحديث عند البحث

  // --- 3. دالة الحذف الحقيقي من الداتا بيز ---
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الحرفي؟")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://etqanproject.runasp.net/api/AdminDashboard/artisans/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setArtisans(artisans.filter(item => item.id !== id));
        // alert("تم الحذف بنجاح");
      } catch (err) {
        // alert("فشل الحذف، تأكد من اتصالك بالسيرفر");
      }
    }
  };

  const [formData, setFormData] = useState({
    name: '', email: '', birthDate: '', phone: '', nationalId: '', job: '', maritalStatus: '', password: '', confirmPassword: '', location: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // الميثود دي بتعمل Sort داخلي للداتا اللي جاية من الباك إند
  const sortedArtisans = [...artisans].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'location') return a.location.localeCompare(b.location);
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="dashartisans-page" data-aos="fade-up">
      <div className="top-header-row">
        <h1 className="page-title">الحرفيين</h1>
        <div className="top-actions-left">
          <div className="filter-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="all"> الكل</option>
              <option value="name">الابجدية</option>
              <option value="location">المحافظة</option>
            </select>
          </div>
          <button className="add-btn-main" onClick={() => setShowAddModal(true)}>
            <FaPlus /> إضافة حرفي
          </button>
        </div>
      </div>

      <div className="search-section-wrapper">
        <div className="search-input-box">
          <input
            type="text"
            placeholder="البحث عن حرفي"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(7); }}
          />
          <FaSearch className="search-icon-left" />
        </div>
      </div>

      <div className="table-main-wrapper">
        <table className="artisans-data-table">
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
            {sortedArtisans.slice(0, visibleCount).map((artisan, index) => (
              <tr key={artisan.id} data-aos="fade-up">
                <td className="count-col">{index + 1}</td>
                <td>{artisan.name}</td>
                <td>{artisan.location}</td>
                <td>{artisan.phone}</td>
                <td className="email-text">{artisan.email}</td>
                <td className="actions-btns">
                  {/* زرار العرض مربوط بالـ ID الحقيقي من الداتا بيز */}
                  <button className="view-btn" onClick={() => navigate(`/CraftmanProfile/${artisan.id}`)}>عرض</button>
                  <button className="delete-btn" onClick={() => handleDelete(artisan.id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleCount < sortedArtisans.length && (
        <div className="footer-action">
          <button className="show-all-btn-styled" onClick={() => setVisibleCount(visibleCount + 7)}>
            عرض المزيد من الحرفيين ↓
          </button>
        </div>
      )}

      {/* المودال يظل كما هو بتصميمه الأصلي */}
      {showAddModal && (
        <div className="modal-overlay">
          {/* ... محتوى المودال بدون أي تغيير في التنسيق ... */}
        </div>
      )}
    </div>
  );
};

export default Dashartisans;