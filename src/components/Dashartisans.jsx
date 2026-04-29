import React, { useState, useEffect } from 'react';
import './Dashartisans.css';
import { FaSearch, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Dashartisans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [visibleCount, setVisibleCount] = useState(7); 
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    phone: '',
    nationalId: '',
    job: '',
    maritalStatus: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // داتا تجريبية لاختبار البحث والترتيب
  const initialArtisans = [
    { id: 1, name: 'محمد احمد', location: 'الدقهلية', phone: '01034679766', email: 'ahmad@gmail.com', date: '2026-04-20' },
    { id: 2, name: 'احمد علي', location: 'القاهرة', phone: '01122334455', email: 'ali@gmail.com', date: '2026-04-21' },
    { id: 3, name: 'سيد محمد', location: 'المنصورة', phone: '01255667788', email: 'sayed@gmail.com', date: '2026-04-19' },
    { id: 4, name: 'محمود جابر', location: 'الاسكندرية', phone: '01599887766', email: 'mahmoud@gmail.com', date: '2026-04-22' },
    { id: 5, name: 'ابراهيم حسن', location: 'الجيزة', phone: '01011223344', email: 'hassan@gmail.com', date: '2026-04-18' },
    { id: 6, name: 'كمال ياسين', location: 'الشرقية', phone: '01155443322', email: 'kamal@gmail.com', date: '2026-04-17' },
    { id: 7, name: 'ياسر القاضي', location: 'الغربية', phone: '01200998877', email: 'yasser@gmail.com', date: '2026-04-25' },
    { id: 8, name: 'خالد سليم', location: 'بورسعيد', phone: '01044556677', email: 'khaled@gmail.com', date: '2026-04-26' },
    { id: 9, name: 'سامي زين', location: 'اسيوط', phone: '01533221100', email: 'sami@gmail.com', date: '2026-04-27' },
    { id: 9, name: 'سامي زين', location: 'اسيوط', phone: '01533221100', email: 'sami@gmail.com', date: '2026-04-27' },
  ];

  const filteredArtisans = initialArtisans
    .filter(artisan => artisan.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'location') return a.location.localeCompare(b.location);
      return new Date(b.date) - new Date(a.date); 
    });

  
  const displayedArtisans = filteredArtisans.slice(0, visibleCount);

  const handleSave = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name) newErrors.name = 'يرجى إدخال الاسم';
    if (!formData.email) newErrors.email = 'يرجى إدخال البريد الالكتروني';
    if (!formData.birthDate) newErrors.birthDate = 'يرجى إدخال تاريخ الميلاد';
    if (!formData.nationalId) newErrors.nationalId = 'يرجى إدخال الرقم القومي';
    if (!formData.job) newErrors.job = 'يرجى إدخال المهنة';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'يرجى إدخال الحالة الاجتماعية';
    if (!formData.password) newErrors.password = 'يرجى إدخال كلمة السر';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'يرجى تأكيد كلمة السر';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'كلمة السر غير متطابقة';

    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!formData.phone) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'رقم غير صحيح (010,011,012,015)';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('تم إضافة الحرفي بنجاح');
      setShowAddModal(false);
      setFormData({ 
        name: '',
        email: '', 
        birthDate: '', 
        phone: '', 
        nationalId: '', 
        job: '', 
        maritalStatus: '', 
        password: '', 
        confirmPassword: ''
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className="dashartisans-page" data-aos="fade-up">
      <div className="top-header-row">
        <h1 className="page-title">الحرفيين</h1>
        <div className="top-actions-left">
          <div className="filter-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">ترتيب حسب</option>
              <option value="name">الاسم</option>
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
            {displayedArtisans.map((artisan, index) => (
              <tr key={index} data-aos="fade-up">
                <td className="count-col">{index + 1}</td>
                <td>{artisan.name}</td>
                <td>{artisan.location}</td>
                <td>{artisan.phone}</td>
                <td className="email-text">{artisan.email}</td>
                <td className="actions-btns">
                  <button className="view-btn">عرض</button>
                  <button className="delete-btn">حذف</button>
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
                    <input 
                    type="text" 
                    name="name" 
                    placeholder="الاسم" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    />
                    {errors.name && <span className="error-text-msg">{errors.name}</span>}
                </div>
                <div className="input-group-valid">
                    <input 
                    type="email" 
                    name="email" 
                    placeholder="البريد الالكتروني" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    />
                    {errors.email && <span className="error-text-msg">{errors.email}</span>}
                </div>
                <div className="input-group-valid">
                    <input 
                    type="text"
                    name="birthDate" 
                    placeholder="تاريخ الميلاد" 
                    value={formData.birthDate} 
                    onChange={handleInputChange} 
                    onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                    {errors.birthDate && <span className="error-text-msg">{errors.birthDate}</span>}
                </div>
              </div>

              <div className="form-row-new">
                <div className="input-group-valid">
                    <input 
                    type="text" 
                    name="phone" 
                    placeholder="رقم الهاتف" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    />
                    {errors.phone && <span className="error-text-msg">{errors.phone}</span>}
                </div>
                <div className="input-group-valid">
                    <input 
                    type="text" 
                    name="nationalId" 
                    placeholder="الرقم القومي" 
                    value={formData.nationalId} 
                    onChange={handleInputChange} />
                    {errors.nationalId && <span className="error-text-msg">{errors.nationalId}</span>}
                </div>
                <div className="input-group-valid">
                    <input 
                    type="text" 
                    name="job" 
                    placeholder="المهنة" 
                    value={formData.job} 
                    onChange={handleInputChange} 
                    />
                    {errors.job && <span className="error-text-msg">{errors.job}</span>}
                </div>
              </div>

              <div className="form-row-new">
                <div className="input-group-valid">
                    <input 
                    type="text" 
                    name="maritalStatus" 
                    placeholder="الحالة الاجتماعية" 
                    value={formData.maritalStatus} 
                    onChange={handleInputChange} 
                    />
                    {errors.maritalStatus && <span className="error-text-msg">{errors.maritalStatus}</span>}
                </div>
                <div className="input-group-valid">
                    <div className="password-input-wrapper">
                      <input 
                      type={showPass ? "text" : "password"} 
                      name="password" 
                      placeholder="كلمة السر"
                      value={formData.password} 
                      onChange={handleInputChange} 
                      />
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