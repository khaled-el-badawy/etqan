import React, { useState, useEffect, useRef } from 'react';
import './Dashcompanies.css';
import { FaSearch, FaPlus, FaCloudUploadAlt, FaFileAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Dashcompanies = () => {
    const [compSearch, setCompSearch] = useState('');
    const [compSort, setCompSort] = useState('all');
    const [compVisible, setCompVisible] = useState(7);
    const [compModal, setCompModal] = useState(false);
    
    const [compForm, setCompForm] = useState({ 
        cName: '', cPhone: '', cEmail: '', cRegister: null, cPass: '', cConfirm: '' 
    });
    const [compErrors, setCompErrors] = useState({});
    const compFileRef = useRef(null);

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);

    const compInitialData = [
        { id: 1, name: 'شركة الندى', phone: '01034679766', email: 'alnada@gmail.com', type: 'دهانات وتشتشطيبات' },
        { id: 2, name: 'شركة الصقر لنقل الرمل', phone: '01244556677', email: 'alsaqr@gmail.com', type: 'نقل الرمل والزلط' },
        { id: 3, name: 'مؤسسة السلام للقلابات', phone: '01188990011', email: 'alsalam@gmail.com', type: 'تأجير قلابات ولودر' },
        { id: 4, name: 'الشركة العربية للمخلفات', phone: '01566778899', email: 'arabia@gmail.com', type: 'شركة نقل مخلفات البناء' },
        { id: 5, name: 'توب فينش للدهانات', phone: '01011223344', email: 'topfinish@gmail.com', type: 'دهانات وتشطيبات' },
        { id: 6, name: 'المتحدة للمقاولات', phone: '01277889900', email: 'united@gmail.com', type: 'نقل الرمل والزلط' },
        { id: 7, name: 'مودرن لودر', phone: '01133445566', email: 'modern@gmail.com', type: 'تأجير قلابات ولودر' },
        { id: 8, name: 'كايرو كلين', phone: '01522334455', email: 'clean@gmail.com', type: 'شركة نقل مخلفات البناء' },
    ];

    const compFiltered = compInitialData
        .filter(c => {
            const matchSearch = c.name.includes(compSearch);
            if (compSort === 'all') return matchSearch;
            return matchSearch && c.type === compSort;
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
            errs.cPhone = "برجاء ادخال الرقم";
        }
        if (!compForm.cRegister) errs.cRegister = "برجاء اختيار السجل التجاري";
        if (!compForm.cPass) errs.cPass = "برجاء إدخال كلمة السر";
        if (compForm.cPass !== compForm.cConfirm) errs.cConfirm = "كلمة السر غير متطابقة";

        setCompErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const compHandleSave = (e) => {
        e.preventDefault();
        if (compValidate()) {
            alert("تم الإضافة بنجاح");
            setCompModal(false);
            setCompForm({ cName: '', cPhone: '', cEmail: '', cRegister: null, cPass: '', cConfirm: '' });
            setShowPass(false);
            setShowConfirmPass(false);
        }
    };

    return (
        <div className="c-panel-main-page" data-aos="fade-up">
            <div className="c-panel-top-row">
                <h1 className="c-panel-title">الشركات</h1>
                <div className="c-panel-top-actions">
                    <div className="c-panel-filter">
                        <select value={compSort} onChange={(e) => {setCompSort(e.target.value); setCompVisible(7);}}>
                            <option value="all">الكل</option>
                            <optgroup label="── نوع الشركة ──">
                                <option value="شركة نقل مخلفات البناء">شركة نقل مخلفات البناء</option>
                                <option value="نقل الرمل والزلط">نقل الرمل والزلط</option>
                                <option value="تأجير قلابات ولودر">تأجير قلابات ولودر</option>
                                <option value="دهانات وتشطيبات">دهانات وتشطيبات</option>
                            </optgroup>
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
                        onChange={(e) => {setCompSearch(e.target.value); setCompVisible(7);}}
                    />
                    <FaSearch className="c-panel-search-icon" />
                </div>
            </div>

            <div className="c-panel-table-container">
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
                                    {comp.name} <br/> 
                                    <span className="c-panel-type-tag">{comp.type}</span>
                                </td>
                                <td data-label="رقم الهاتف">{comp.phone}</td>
                                <td data-label="البريد الالكتروني">{comp.email}</td>
                                <td data-label="السجل التجاري"><FaFileAlt className="c-panel-file-ico" /></td>
                                <td data-label="اجراءات" className="c-panel-actions">
                                    <button className="c-panel-btn-view">عرض</button>
                                    <button className="c-panel-btn-del">حذف</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {compVisible < compFiltered.length && (
                <div className="c-panel-load-more">
                    <button className="c-panel-more-btn" onClick={() => setCompVisible(compVisible + 7)}>
                        عرض المزيد من الشركات ↓
                    </button>
                </div>
            )}

            {compModal && (
                <div className="c-panel-overlay">
                    <div className="c-panel-modal" data-aos="zoom-in">
                        <h2 className="c-panel-modal-title">إضافة شركة جديدة</h2>
                        <form onSubmit={compHandleSave}>
                            <div className="c-panel-form-grid">
                                <div className="c-panel-input-group">
                                    <input type="text" placeholder="اسم الشركة" onChange={(e) => setCompForm({...compForm, cName: e.target.value})} />
                                    {compErrors.cName && <span className="c-panel-err">{compErrors.cName}</span>}
                                </div>
                                <div className="c-panel-input-group">
                                    <input type="email" placeholder="البريد الالكتروني" onChange={(e) => setCompForm({...compForm, cEmail: e.target.value})} />
                                    {compErrors.cEmail && <span className="c-panel-err">{compErrors.cEmail}</span>}
                                </div>
                                <div className="c-panel-input-group">
                                    <input type="text" placeholder="رقم الهاتف" onChange={(e) => setCompForm({...compForm, cPhone: e.target.value})} />
                                    {compErrors.cPhone && <span className="c-panel-err">{compErrors.cPhone}</span>}
                                </div>
                                <div className="c-panel-input-group c-panel-file-box" onClick={() => compFileRef.current.click()}>
                                    <div className="c-panel-file-custom">
                                        <span>{compForm.cRegister ? compForm.cRegister.name : "السجل التجاري"}</span>
                                        <FaCloudUploadAlt />
                                    </div>
                                    <input type="file" ref={compFileRef} hidden onChange={(e) => setCompForm({...compForm, cRegister: e.target.files[0]})} />
                                    {compErrors.cRegister && <span className="c-panel-err">{compErrors.cRegister}</span>}
                                </div>
                                <div className="c-panel-input-group">
                                    <div className="c-panel-pass-wrapper">
                                        <input type={showPass ? "text" : "password"} placeholder="كلمة السر" onChange={(e) => setCompForm({...compForm, cPass: e.target.value})} />
                                        <span className="c-panel-eye-btn" onClick={() => setShowPass(!showPass)}>
                                            {showPass ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    {compErrors.cPass && <span className="c-panel-err">{compErrors.cPass}</span>}
                                </div>
                                {/* حقل تأكيد كلمة السر مع العين */}
                                <div className="c-panel-input-group">
                                    <div className="c-panel-pass-wrapper">
                                        <input type={showConfirmPass ? "text" : "password"} placeholder="تأكيد كلمة السر" onChange={(e) => setCompForm({...compForm, cConfirm: e.target.value})} />
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