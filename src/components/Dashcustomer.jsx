import React, { useState, useEffect } from "react";
import "./Dashcustomer.css";
import { FaSearch, FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashcustomer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [visibleCount, setVisibleCount] = useState(7);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("sharedCustomers");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        name: "محمد احمد",
        location: "الدقهلية",
        phone: "01034679766",
        email: "ahmad@gmail.com",
        date: "2026-04-20",
      },
      {
        id: 2,
        name: " علي خالد",
        location: "القاهرة",
        phone: "01122334455",
        email: "ali@gmail.com",
        date: "2026-04-21",
      },
      {
        id: 3,
        name: " رضا السعيد",
        location: "اسيوط",
        phone: "01255667788",
        email: "reda@gmail.com",
        date: "2026-04-22",
      },
      {
        id: 4,
        name: " السيد محمد",
        location: "قنا",
        phone: "01566778899",
        email: "sayed@gmail.com",
        date: "2026-04-23",
      },
    ];
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    localStorage.setItem("sharedCustomers", JSON.stringify(customers));
  }, [customers]);

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name) newErrors.name = "يرجى إدخال الاسم";
    if (!formData.email) newErrors.email = "يرجى إدخال البريد الالكتروني";
    if (!formData.location) newErrors.location = "يرجى إدخال المحافظة";
    if (!formData.password) newErrors.password = "يرجى إدخال كلمة السر";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "يرجى تأكيد كلمة السر";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "كلمة السر غير متطابقة";

    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!formData.phone) {
      newErrors.phone = "يرجى إدخال رقم الهاتف";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "رقم غير صحيح (يجب 11 رقم ويبدأ بـ 010,011,012,015)";
    }

    if (!newErrors.name && customers.some((c) => c.name === formData.name)) {
      newErrors.name = "هذا الاسم مستخدم من قبل";
    }
    if (!newErrors.email && customers.some((c) => c.email === formData.email)) {
      newErrors.email = "هذا البريد الالكتروني مسجل مسبقاً";
    }
    if (!newErrors.phone && customers.some((c) => c.phone === formData.phone)) {
      newErrors.phone = "رقم الهاتف هذا موجود بالفعل";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newCustomer = {
        id:
          customers.length > 0
            ? Math.max(...customers.map((c) => c.id)) + 1
            : 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        img: "/images/Client profile/Virtual.jpg",
        date: new Date().toISOString().split("T")[0],
      };

      setCustomers([newCustomer, ...customers]);
      alert("تم الإضافة بنجاح");
      setShowAddModal(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const filteredCustomers = customers
    .filter((c) => c.name.includes(searchTerm))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "location") return a.location.localeCompare(b.location);
      return new Date(a.date) - new Date(b.date);
    });

  const displayedCustomers = filteredCustomers.slice(0, visibleCount);

  return (
    <div className="dashcustomer-page" data-aos="fade-up">
      <div className="top-header-row">
        <h1 className="page-title">العملاء</h1>
        <div className="top-actions-left">
          <div className="filter-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="all">الكل</option>
              <option value="name">الابجدية</option>
              <option value="location">المحافظة</option>
            </select>
          </div>
          <button
            className="add-btn-main"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> إضافة عميل
          </button>
        </div>
      </div>

      <div className="search-section-wrapper">
        <div className="search-input-box">
          <input
            type="text"
            placeholder="البحث عن عميل"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(7);
            }}
          />
          <FaSearch className="search-icon-left" />
        </div>
      </div>

      <div className="table-main-wrapper">
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
            {displayedCustomers.map((customer) => (
              <tr key={customer.id} data-aos="fade-up">
                <td className="count-col">{customer.id}</td>
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
      </div>

      {visibleCount < filteredCustomers.length && (
        <div className="footer-action">
          <button
            className="show-all-btn-styled"
            onClick={() => setVisibleCount(visibleCount + 7)}
          >
            عرض كل العملاء ↓
          </button>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content-new" data-aos="zoom-in">
            <h2 className="modal-title-new">إضافة عميل</h2>
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
                  {errors.name && (
                    <span className="error-text-msg">{errors.name}</span>
                  )}
                </div>
                <div className="input-group-valid">
                  <input
                    type="email"
                    name="email"
                    placeholder="البريد الالكتروني"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <span className="error-text-msg">{errors.email}</span>
                  )}
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
                  {errors.phone && (
                    <span className="error-text-msg">{errors.phone}</span>
                  )}
                </div>
                <div className="input-group-valid">
                  <input
                    type="text"
                    name="location"
                    placeholder="المحافظة"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                  {errors.location && (
                    <span className="error-text-msg">{errors.location}</span>
                  )}
                </div>
              </div>

              <div className="form-row-new">
                <div className="input-group-valid">
                  <div className="password-input-wrapper">
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="كلمة السر"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <span
                      className="eye-icon"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && (
                    <span className="error-text-msg">{errors.password}</span>
                  )}
                </div>

                <div className="input-group-valid">
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="تأكيد كلمة السر"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <span
                      className="eye-icon"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                    >
                      {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-text-msg">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <div className="modal-btns-new">
                <button type="submit" className="confirm-btn-new">
                  حفظ
                </button>
                <button
                  type="button"
                  className="cancel-btn-new"
                  onClick={() => {
                    setShowAddModal(false);
                    setErrors({});
                  }}
                >
                  الغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashcustomer;
