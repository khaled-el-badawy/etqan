import React, { useState, useEffect } from 'react';
import './Dashartisans.css';
import { FaSearch, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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

  const [artisans, setArtisans] = useState(() => {
    const saved = localStorage.getItem('sharedArtisans');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'أحمد علي', location: 'الدقهلية', phone: '01034679766', email: 'ahmad@gmail.com', date: '2026-04-20', price: '150', job: 'كهربائي منازل وتشطيبات', nationalId: '29901011234567', rate: '4.9', img: '/images/Ellipse 321.png' },
      { id: 2, name: 'السيد محمد', location: 'القاهرة', phone: '01122334455', email: 'ali@gmail.com', date: '2026-04-21', price: '200', job: 'سباك', nationalId: '29805051234568', rate: '4.9', img: '/images/test.avif' },
      { id: 7, name: 'ياسر القاضي', location: 'الغربية', phone: '01200998877', email: 'yasser@gmail.com', date: '2026-04-25', price: '280', job: 'نقاش', nationalId: '29508081234569', rate: '4.9', img: '/images/Artisans/Artisans7.svg' },
    ];
  });

  const [formData, setFormData] = useState({
    name: '', email: '', birthDate: '', phone: '', nationalId: '', job: '', maritalStatus: '', password: '', confirmPassword: '', location: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    localStorage.setItem('sharedArtisans', JSON.stringify(artisans));
  }, [artisans]);

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الحرفي؟")) {
      const updatedArtisans = artisans.filter(item => item.id !== id);
      setArtisans(updatedArtisans);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name) newErrors.name = 'يرجى إدخال الاسم';
    if (!formData.email) newErrors.email = 'يرجى إدخال البريد الالكتروني';
    if (!formData.birthDate) newErrors.birthDate = 'يرجى إدخال تاريخ الميلاد';
    if (!formData.phone) newErrors.phone = 'يرجى إدخال رقم الهاتف';
    if (!formData.nationalId) newErrors.nationalId = 'يرجى إدخال الرقم القومي';
    if (!formData.job) newErrors.job = 'يرجى إدخال المهنة';
    if (!formData.location) newErrors.location = 'يرجى إدخال المحافظة';
    if (!formData.password) newErrors.password = 'يرجى إدخال كلمة السر';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'كلمة السر غير متطابقة';

    if (artisans.some(a => a.name === formData.name)) newErrors.name = 'هذا الاسم مسجل بالفعل';
    if (artisans.some(a => a.email === formData.email)) newErrors.email = 'البريد الالكتروني مسجل بالفعل';
    if (artisans.some(a => a.phone === formData.phone)) newErrors.phone = 'رقم الهاتف مسجل بالفعل';
    if (artisans.some(a => a.nationalId === formData.nationalId)) newErrors.nationalId = 'الرقم القومي مسجل بالفعل';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newArtisan = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      rate: '0.0',
      img: '/images/Virtual.jpeg' 
    };

    setArtisans([newArtisan, ...artisans]);
    alert('تم إضافة الحرفي بنجاح');
    setShowAddModal(false);
    setFormData({ name: '', email: '', birthDate: '', phone: '', nationalId: '', job: '', maritalStatus: '', password: '', confirmPassword: '', location: '' });
  };

  const filteredArtisans = artisans
    .filter(artisan => artisan.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
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
            onChange={(e) => {setSearchTerm(e.target.value); setVisibleCount(7);}} 
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
            {filteredArtisans.slice(0, visibleCount).map((artisan, index) => (
              <tr key={artisan.id} data-aos="fade-up">
                <td className="count-col">{index + 1}</td>
                <td>{artisan.name}</td>
                <td>{artisan.location}</td>
                <td>{artisan.phone}</td>
                <td className="email-text">{artisan.email}</td>
                <td className="actions-btns">
                  <button className="view-btn" onClick={() => navigate(`/CraftmanProfile/${artisan.id}`)}>عرض</button>
                  <button className="delete-btn" onClick={() => handleDelete(artisan.id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleCount < filteredArtisans.length && (
        <div className="footer-action">
          <button className="show-all-btn-styled" onClick={() => setVisibleCount(visibleCount + 7)}>
             عرض المزيد من الحرفيين ↓
          </button>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content-new" data-aos="zoom-in">
            <h2 className="modal-title-new">إضافة حرفي</h2>
            <form className="modal-form-new" onSubmit={handleSave}>
              <div className="form-row-new">
                <div className="input-group-valid">
                    <input type="text" name="name" placeholder="الاسم" value={formData.name} onChange={handleInputChange} />
                    {errors.name && <span className="error-text-msg">{errors.name}</span>}
                </div>
                <div className="input-group-valid">
                    <input type="email" name="email" placeholder="البريد الالكتروني" value={formData.email} onChange={handleInputChange} />
                    {errors.email && <span className="error-text-msg">{errors.email}</span>}
                </div>
                <div className="input-group-valid">
                    <input type="text" name="birthDate" placeholder="تاريخ الميلاد" value={formData.birthDate} onChange={handleInputChange} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                    {errors.birthDate && <span className="error-text-msg">{errors.birthDate}</span>}
                </div>
              </div>

              <div className="form-row-new">
                <div className="input-group-valid">
                    <input type="text" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleInputChange} />
                    {errors.phone && <span className="error-text-msg">{errors.phone}</span>}
                </div>
                <div className="input-group-valid">
                    <input type="text" name="nationalId" placeholder="الرقم القومي" value={formData.nationalId} onChange={handleInputChange} />
                    {errors.nationalId && <span className="error-text-msg">{errors.nationalId}</span>}
                </div>
                <div className="input-group-valid">
                    <input type="text" name="job" placeholder="المهنة" value={formData.job} onChange={handleInputChange} />
                    {errors.job && <span className="error-text-msg">{errors.job}</span>}
                </div>
              </div>

              <div className="form-row-new">
                <div className="input-group-valid">
                    <input type="text" name="location" placeholder="المحافظة" value={formData.location} onChange={handleInputChange} />
                    {errors.location && <span className="error-text-msg">{errors.location}</span>}
                </div>
                <div className="input-group-valid">
                    <div className="password-input-wrapper">
                      <input type={showPass ? "text" : "password"} name="password" placeholder="كلمة السر" value={formData.password} onChange={handleInputChange} />
                      <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
                          {showPass ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errors.password && <span className="error-text-msg">{errors.password}</span>}
                </div>
                <div className="input-group-valid">
                    <div className="password-input-wrapper">
                      <input type={showConfirmPass ? "text" : "password"} name="confirmPassword" placeholder="تأكيد كلمة السر" value={formData.confirmPassword} onChange={handleInputChange} />
                      <span className="eye-icon" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                          {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errors.confirmPassword && <span className="error-text-msg">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="modal-btns-new">
                <button type="submit" className="confirm-btn-new">حفظ</button>
                <button type="button" className="cancel-btn-new" onClick={() => setShowAddModal(false)}>الغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashartisans;