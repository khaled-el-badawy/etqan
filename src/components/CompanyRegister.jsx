<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
=======
import React, { useState, useRef } from "react";
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
import "./CompanyRegister.css";
import { FiEye, FiEyeOff, FiFolderPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import axios from "axios";
=======
import axios from "axios"; 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

function CompanyRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const fileInputRef = useRef(null);
  const [commercialFile, setCommercialFile] = useState(null);
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);

  const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "الغربية", "المنوفية", "البحيرة", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد", "مطروح", "شمال سيناء", "جنوب سيناء", "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "القليوبية",
  ];

  const companyTypes = [
    "نقل الأثاث",
    "مقاولات وبناء",
    "تأجير قلابات ولودر",
    "نقل الرمل والزلط",
    "نقل مخلفات البناء",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [Governorate, setGovernorate] = useState("");

  const [jobSearchTerm, setJobSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const jobDropdownRef = useRef(null);

  const filteredGovernorates = governorates.filter((gov) => gov.includes(searchTerm));
  const filteredJobs = companyTypes.filter((job) => job.includes(jobSearchTerm));

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (jobDropdownRef.current && !jobDropdownRef.current.contains(event.target)) {
        setShowJobDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
=======
  const[isLoading, setIsLoading] = useState(false);
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

  // اسم الشركة
  const handleUsernameChange = (e) => {
    const val = e.target.value;
    if (/^[a-zA-Z\u0600-\u06FF\s]*$/.test(val)) {
      setUsername(val);
    }
  };

  // البريد الالكتروني
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
<<<<<<< HEAD
    setEmailError(
      val && !emailRegex.test(val) ? "البريد الإلكتروني غير صالح" : "",
    );
=======
    setEmailError(val && !emailRegex.test(val) ? "البريد الإلكتروني غير صالح" : "");
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  };

  // رقم الهاتف
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;
    if (val.length > 11) return;
    setPhone(val);
  };

  const [isFocused, setIsFocused] = useState(false);

  const rules = {
    firstCapital: /^[A-Z]/,
    specialChar: /[!@#$%^&*()/\\]/,
    minLength: /.{8,}/,
  };

  const checkRule = (rule) => rule.test(password);

<<<<<<< HEAD
  const passwordsNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;

=======
  const passwordsNotMatch = confirmPassword.length > 0 && password !== confirmPassword;
  
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  // التحقق من رقم الهاتف كامل الشروط
  const isPhoneValid =
    phone.length === 11 &&
    phone[0] === "0" &&
    ["010", "011", "012", "015"].includes(phone.substring(0, 3));

  const isFormValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    emailError === "" &&
    isPhoneValid &&
    commercialFile !== null &&
<<<<<<< HEAD
    Governorate !== "" &&
    selectedJob !== "" &&
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    password !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword;

<<<<<<< HEAD
  // --- دالة الربط بـ Axios المعدلة لحقن الحقول الجديدة ---
  const handleRegister = async () => {
    setIsLoading(true);

=======
  
    // --- دالة الربط بـ Axios لرفع البيانات والملف ---
  const handleRegister = async () => {
    setIsLoading(true);
    // 1. استخدام FormData لأننا بنرفع ملف (Multipart Form Data)
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    const formData = new FormData();
    formData.append("CompanyName", username);
    formData.append("Email", email);
    formData.append("PhoneNumber", phone);
    formData.append("Password", password);
    formData.append("ConfirmPassword", confirmPassword);
<<<<<<< HEAD
    formData.append("CommercialRegisterFile", commercialFile);

    // 🎯 الزتونة: ربط الحقول الجديدة لتبعت نفس الأسامي اللي مستنيها الـ DTO في الباك إيند
    formData.append("CompanyType", selectedJob); // نوع الشركة المختار
    formData.append("Governorate", Governorate); // المحافظة المختارة

    try {
      // ملحوظة: لو بتجرب لوكال غير الرابط لـ https://localhost:5036 تبعا للبورت بتاعك
      const response = await axios.post(
        "https://etqanproject.runasp.net/api/CompanyAccount/register-step1-send-otp",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (response.status === 200) {
=======
    formData.append("CommercialRegisterFile", commercialFile); // الملف الحقيقي

    try {
      const response = await axios.post(
        "http://localhost:5036/api/CompanyAccount/register-step1-send-otp",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert("تم إرسال كود التحقق بنجاح");
        // التوجه لصفحة الـ OTP وتحديد الـ Role كـ company
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        navigate("/login-otp/company", { state: { email: email } });
      }
    } catch (error) {
      if (error.response) {
<<<<<<< HEAD
        alert(error.response.data.message || "حدث خطأ أثناء التسجيل، تأكد من إدخال كافة البيانات");
      } else {
        alert("فشل الاتصال بالسيرفر، تأكد من تشغيل الـ .NET API");
      }
    } finally {
      setIsLoading(false);
    }
  };

=======
        alert(error.response.data.message || "حدث خطأ أثناء التسجيل");
      } else {
        alert("فشل الاتصال بالسيرفر، تأكد من تشغيل الـ .NET API");
      }
    }
      finally{
        setIsLoading(false);
      
    }
  };
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  return (
    <div className="company-page-container">
      <motion.div
        className="form-section"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <div className="form-fields">
          <form>
            <h1>مرحباً بك</h1>
            <h3>قم بإنشاء حسابك لبدء استخدام الخدمة</h3>

            <div className="fields-row">
              {/* اسم الشركة */}
              <div className="field-container">
                <input
                  type="text"
                  placeholder="اسم الشركة"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>

              {/* رقم الهاتف */}
              <div className="field-container">
                <input
                  type="text"
                  placeholder="رقم الهاتف"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />

                {/* رسائل الخطأ للهاتف */}
                {(phone.length > 0 && phone.length < 11) ||
<<<<<<< HEAD
                  phone[0] !== "0" ||
                  (phone.length >= 3 &&
                    !["010", "011", "012", "015"].includes(
                      phone.substring(0, 3),
                    )) ? (
=======
                phone[0] !== "0" ||
                (phone.length >= 3 &&
                  !["010", "011", "012", "015"].includes(phone.substring(0, 3))) ? (
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  <ul className="phone-errors">
                    {phone.length > 0 && phone.length < 11 && (
                      <li>رقم الهاتف يجب أن يكون 11 رقم</li>
                    )}
                    {phone.length >= 1 && phone[0] !== "0" && (
                      <li>رقم الهاتف يجب أن يبدأ بالرقم 0</li>
                    )}
                    {phone.length >= 3 &&
                      !["010", "011", "012", "015"].includes(
<<<<<<< HEAD
                        phone.substring(0, 3),
                      ) && (
                        <li>
                          رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015
                        </li>
=======
                        phone.substring(0, 3)
                      ) && (
                        <li>رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015</li>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                      )}
                  </ul>
                ) : null}
              </div>

              {/* البريد الالكتروني */}
              <div className="field-container">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && <p className="error-msg">{emailError}</p>}
              </div>

              {/* رفع السجل التجاري */}
              <div
                className="field-container file-upload-container"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="text"
                  placeholder="السجل التجاري"
                  value={commercialFile ? commercialFile.name : ""}
                  readOnly
                />
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => setCommercialFile(e.target.files[0])}
                />
                <div className="folder-wrapper">
                  <FiFolderPlus className="folder-icon" />
                  <span className="plus-icon">+</span>
                </div>
              </div>

<<<<<<< HEAD
              {/* المحافظة */}
              <div className="field-container" ref={dropdownRef}>
                <input
                  type="text"
                  placeholder="المحافظة"
                  required
                  value={Governorate || searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                    setGovernorate("");
                  }}
                  onFocus={() => setShowDropdown(true)}
                />

                {showDropdown && (
                  <ul className="dropdown-list">
                    {filteredGovernorates.length > 0 ? (
                      filteredGovernorates.map((gov, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setGovernorate(gov);
                            setSearchTerm("");
                            setShowDropdown(false);
                          }}
                        >
                          {gov}
                        </li>
                      ))
                    ) : (
                      <li className="no-result">لا توجد نتائج</li>
                    )}
                  </ul>
                )}
              </div>

              {/* نوع الشركة */}
              <div className="field-container" ref={jobDropdownRef}>
                <input
                  type="text"
                  placeholder=" نوع الشركة"
                  value={selectedJob || jobSearchTerm}
                  onChange={(e) => {
                    setJobSearchTerm(e.target.value);
                    setSelectedJob("");
                    setShowJobDropdown(true);
                  }}
                  onFocus={() => setShowJobDropdown(true)}
                />
                {showJobDropdown && (
                  <ul className="dropdown-list">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((j, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSelectedJob(j);
                            setJobSearchTerm("");
                            setShowJobDropdown(false);
                          }}
                        >
                          {j}
                        </li>
                      ))
                    ) : (
                      <li className="no-result">لا توجد نتائج</li>
                    )}
                  </ul>
                )}
              </div>

=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              {/* كلمة السر */}
              <div className="CompanyRegister-field-container CompanyRegister-password-field-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة السر"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <span
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>

                {isFocused && (
                  <div className="password-rules">
<<<<<<< HEAD
                    <p style={{ color: checkRule(rules.firstCapital) ? "rgb(114,114,243)" : "rgb(235,138,138)" }}>
                      • يجب أن يبدأ بحرف Capital
                    </p>
                    <p style={{ color: checkRule(rules.specialChar) ? "rgb(114,114,243)" : "rgb(235,138,138)" }}>
                      • يجب أن يحتوي على !@#$%
                    </p>
                    <p style={{ color: checkRule(rules.minLength) ? "rgb(114,114,243)" : "rgb(235,138,138)" }}>
=======
                    <p
                      style={{
                        color: checkRule(rules.firstCapital)
                          ? "rgb(114,114,243)"
                          : "rgb(235,138,138)",
                      }}
                    >
                      • يجب أن يبدأ بحرف Capital
                    </p>
                    <p
                      style={{
                        color: checkRule(rules.specialChar)
                          ? "rgb(114,114,243)"
                          : "rgb(235,138,138)",
                      }}
                    >
                      • يجب أن يحتوي على !@#$%
                    </p>
                    <p
                      style={{
                        color: checkRule(rules.minLength)
                          ? "rgb(114,114,243)"
                          : "rgb(235,138,138)",
                      }}
                    >
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                      • يجب أن يكون على الأقل 8 أحرف
                    </p>
                  </div>
                )}
              </div>

              {/* تأكيد كلمة السر */}
              <div className="CompanyRegister-field-container CompanyRegister-password-field-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="تأكيد كلمة السر"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="eye"
<<<<<<< HEAD
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
=======
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </span>
                {passwordsNotMatch && (
                  <p className="password-error-msg">
<<<<<<< HEAD
                    Must match password
=======
                    يجب أن تكون كلمة السر مطابقة
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  </p>
                )}
              </div>
            </div>

            {/* زر التسجيل */}
<<<<<<< HEAD
            <button
              type="button"
              className={`link-button ${!isFormValid ? "disabled" : ""}`}
              onClick={handleRegister}
              disabled={!isFormValid || isLoading}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                opacity: !isFormValid ? 0.5 : 1,
                width: "100%",
                cursor: "pointer",
=======
         
            
                      <button
              type="button"
              className={`link-button ${!isFormValid ? "disabled" : ""}`}
              onClick={handleRegister}
              disabled={!isFormValid|| isLoading}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                opacity: !isFormValid ? 0.5 : 1,
                width: "100%", cursor: "pointer"
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              }}
            >
              {isLoading ? "جاري إنشاء الحساب..." : "تسجيل"}
            </button>
<<<<<<< HEAD

=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            <h4 className="h4-login">
              هل لديك حساب ؟{" "}
              <Link to="/login/company" className="Link">
                تسجيل الدخول
              </Link>
            </h4>
          </form>
        </div>

        {/* صورة جانبية */}
        <div className="image">
          <motion.img
            src="/images/Frame 20.svg"
            initial={{ x: "20%", opacity: 0 }}
            animate={{
              x: 0,
              y: [0, -10, 0],
              opacity: 1,
            }}
            transition={{
              x: { duration: 1.8, ease: "easeOut" },
              y: { duration: 3, ease: "easeInOut", repeat: Infinity },
              opacity: { duration: 1.8 },
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default CompanyRegister;