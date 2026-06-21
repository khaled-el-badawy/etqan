import React, { useState, useEffect, useRef } from 'react';
import './Dashcompanies.css';
import { FaSearch, FaPlus, FaCloudUploadAlt, FaFileAlt, FaEye, FaEyeSlash, FaSync } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Dashcompanies = () => {
    const navigate = useNavigate();
    const [compSearch, setCompSearch] = useState('');
    const [compSort, setCompSort] = useState('all');
    const [compVisible, setCompVisible] = useState(7);
    const [compModal, setCompModal] = useState(false);

    // --- States الربط الحقيقي ---
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [compForm, setCompForm] = useState({
        cName: '', cPhone: '', cEmail: '', cRegister: null, cPass: '', cConfirm: ''
    });
    const [compErrors, setCompErrors] = useState({});
    const compFileRef = useRef(null);

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // 1. جلب بيانات الشركات من السيرفر
    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            // نبعت الـ search للباك إند
            const res = await axios.get(`https://etqanproject.runasp.net/api/AdminDashboard/companies?search=${compSearch}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // تحويل البيانات لتناسب التصميم بتاعك
            const mappedData = res.data.data.map(c => ({
                id: c.id,
                name: c.companyName,
                phone: c.phoneNumber,
                email: c.email,
                type: "شركة مقاولات", // أو أي وصف افتراضي لو مش مبعوت
                register: c.commercialRegister
            }));

            setCompanies(mappedData);
        } catch (err) {
            console.error("خطأ في جلب الشركات:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        fetchCompanies();
    }, [compSearch]); // تحديث عند البحث

    // 2. دالة الحذف الحقيقي
    const handleDelete = async (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذه الشركة نهائياً؟")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`https://etqanproject.runasp.net/api/AdminDashboard/companies/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCompanies(companies.filter(c => c.id !== id));
                // alert("تم حذف الشركة بنجاح");
            } catch (err) {
                // alert("فشل في حذف الشركة");
            }
        }
    };

    const compFiltered = companies
        .filter(c => {
            if (compSort === 'all') return true;
            return c.type === compSort;
        })
        .sort((a, b) => compSort === 'all' ? a.name.localeCompare(b.name) : 0);

    const compValidate = () => {
        let errs = {};
        const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
        if (!compForm.cName) errs.cName = "برجاء إدخال اسم الشركة";
        if (!compForm.cEmail) errs.cEmail = "برجاء إدخال البريد الإلكتروني";
        if (!compForm.cPhone) {
            errs.cPhone = "برجاء إدخال رقم الهاتف";
        } else if (!phoneRegex.test(compForm.cPhone)) {
            errs.cPhone = "رقم غير صحيح";
        }
        if (!compForm.cPass) errs.cPass = "برجاء إدخال كلمة السر";
        if (compForm.cPass !== compForm.cConfirm) errs.cConfirm = "كلمة السر غير متطابقة";

        setCompErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const compHandleSave = async (e) => {
        e.preventDefault();
        if (compValidate()) {
            // هنا المفروض نبعت FormData للباك إند للإضافة
            // alert("تم إرسال طلب إضافة الشركة للباك إند");
            setCompModal(false);
        }
    };

    return (
        <div className="c-panel-main-page" data-aos="fade-up">
            <div className="c-panel-top-row">
                <h1 className="c-panel-title">الشركات</h1>
                <div className="c-panel-top-actions">
                    <div className="c-panel-filter">
                        <select value={compSort} onChange={(e) => { setCompSort(e.target.value); setCompVisible(7); }}>
                            <option value="all">الكل</option>
                            <option value="شركة نقل مخلفات البناء">شركة نقل مخلفات البناء</option>
                            <option value="نقل الرمل والزلط">نقل الرمل والزلط</option>
                            <option value="تأجير قلابات ولودر">تأجير قلابات ولودر</option>
                        </select>
                    </div>
                    <button className="c-panel-add-btn" onClick={() => setCompModal(true)}>
                        <FaPlus /> إضافة شركة
                    </button>
                </div>
            </div>

            <div className="c-panel-search-box">
                <div className="c-panel-search-inner">
                    <input
                        type="text"
                        placeholder="البحث عن شركة ..."
                        value={compSearch}
                        onChange={(e) => { setCompSearch(e.target.value); setCompVisible(7); }}
                    />
                    <FaSearch className="c-panel-search-icon" />
                </div>
            </div>

            <div className="c-panel-table-container">
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}><FaSync className="spinner-icon" /> جاري التحميل...</div>
                ) : (
                    <table className="c-panel-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>اسم الشركة</th>
                                <th>رقم الهاتف</th>
                                <th>البريد الالكتروني</th>
                                <th>السجل التجاري</th>
                                <th>اجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compFiltered.slice(0, compVisible).map((comp, idx) => (
                                <tr key={comp.id} data-aos="fade-up">
                                    <td data-label="#">{idx + 1}</td>
                                    <td data-label="اسم الشركة">
                                        {comp.name} <br />
                                        <span className="c-panel-type-tag">{comp.type}</span>
                                    </td>
                                    <td data-label="رقم الهاتف">{comp.phone}</td>
                                    <td data-label="البريد الالكتروني">{comp.email}</td>
                                    <td data-label="السجل التجاري">
                                        {comp.register ? <FaFileAlt className="c-panel-file-ico" style={{ color: '#40798C' }} /> : "لا يوجد"}
                                    </td>
                                    <td data-label="اجراءات" className="c-panel-actions">
                                        <button className="c-panel-btn-view" onClick={() => navigate(`/CompanyProfile/${comp.id}`)}>عرض</button>
                                        <button className="c-panel-btn-del" onClick={() => handleDelete(comp.id)}>حذف</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {compVisible < compFiltered.length && (
                <div className="c-panel-load-more">
                    <button className="c-panel-more-btn" onClick={() => setCompVisible(compVisible + 7)}>
                        عرض المزيد من الشركات ↓
                    </button>
                </div>
            )}

            {/* المودال يظل كما هو تماماً بتصميمه الأصلي */}
            {compModal && (
                <div className="c-panel-overlay">
                    <div className="c-panel-modal" data-aos="zoom-in">
                        <h2 className="c-panel-modal-title">إضافة شركة جديدة</h2>
                        <form onSubmit={compHandleSave}>
                            <div className="c-panel-form-grid">
                                <div className="c-panel-input-group">
                                    <input type="text" placeholder="اسم الشركة" onChange={(e) => setCompForm({ ...compForm, cName: e.target.value })} />
                                    {compErrors.cName && <span className="c-panel-err">{compErrors.cName}</span>}
                                </div>
                                <div className="c-panel-input-group">
                                    <input type="email" placeholder="البريد الالكتروني" onChange={(e) => setCompForm({ ...compForm, cEmail: e.target.value })} />
                                    {compErrors.cEmail && <span className="c-panel-err">{compErrors.cEmail}</span>}
                                </div>
                                <div className="c-panel-input-group">
                                    <input type="text" placeholder="رقم الهاتف" onChange={(e) => setCompForm({ ...compForm, cPhone: e.target.value })} />
                                    {compErrors.cPhone && <span className="c-panel-err">{compErrors.cPhone}</span>}
                                </div>
                                <div className="c-panel-input-group c-panel-file-box" onClick={() => compFileRef.current.click()}>
                                    <div className="c-panel-file-custom">
                                        <span>{compForm.cRegister ? compForm.cRegister.name : "السجل التجاري"}</span>
                                        <FaCloudUploadAlt />
                                    </div>
                                    <input type="file" ref={compFileRef} hidden onChange={(e) => setCompForm({ ...compForm, cRegister: e.target.files[0] })} />
                                </div>
                                <div className="c-panel-input-group">
                                    <div className="c-panel-pass-wrapper">
                                        <input type={showPass ? "text" : "password"} placeholder="كلمة السر" onChange={(e) => setCompForm({ ...compForm, cPass: e.target.value })} />
                                        <span className="c-panel-eye-btn" onClick={() => setShowPass(!showPass)}>
                                            {showPass ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>
                                <div className="c-panel-input-group">
                                    <div className="c-panel-pass-wrapper">
                                        <input type={showConfirmPass ? "text" : "password"} placeholder="تأكيد كلمة السر" onChange={(e) => setCompForm({ ...compForm, cConfirm: e.target.value })} />
                                        <span className="c-panel-eye-btn" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                            {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    {compErrors.cConfirm && <span className="c-panel-err">{compErrors.cConfirm}</span>}
                                </div>
                            </div>
                            <div className="c-panel-modal-btns">
                                <button type="submit" className="c-panel-confirm">حفظ</button>
                                <button type="button" className="c-panel-cancel" onClick={() => setCompModal(false)}>إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashcompanies;