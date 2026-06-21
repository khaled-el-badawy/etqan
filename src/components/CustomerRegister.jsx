import React, { useState, useRef, useEffect } from "react";
import "./CustomerRegister.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
=======
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

function CustomerRegister() {
  const navigate = useNavigate();
  const governorates = [
<<<<<<< HEAD
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "الغربية",
    "المنوفية", "البحيرة", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا",
    "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر",
    "الوادي الجديد", "مطروح", "شمال سيناء", "جنوب سيناء", "الإسماعيلية",
    "السويس", "بورسعيد", "دمياط", "القليوبية"
  ];

  // --- States ---
=======
    "القاهرة","الجيزة","الإسكندرية","الدقهلية","الشرقية","الغربية",
    "المنوفية","البحيرة","كفر الشيخ","الفيوم","بني سويف","المنيا",
    "أسيوط","سوهاج","قنا","الأقصر","أسوان","البحر الأحمر",
    "الوادي الجديد","مطروح","شمال سيناء","جنوب سيناء","الإسماعيلية",
    "السويس","بورسعيد","دمياط","القليوبية"
  ];

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [Governorate, setGovernorate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

=======
   const[isLoading, setIsLoading] = useState(false);
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  // قفل القائمة لما نضغط بره
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

<<<<<<< HEAD
  // --- Handlers ---
=======
  // الاسم
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const handleUsernameChange = (e) => {
    const val = e.target.value;
    if (/^[a-zA-Z\u0600-\u06FF\s]*$/.test(val)) setUsername(val);
  };

<<<<<<< HEAD
=======
  // البريد الإلكتروني
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (val && !emailRegex.test(val)) setEmailError("البريد الإلكتروني غير صالح");
    else setEmailError("");
  };

<<<<<<< HEAD
=======
  // رقم الهاتف
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;
    if (val.length > 11) return;
    setPhone(val);
  };

  const filteredGovernorates = governorates.filter((gov) =>
    gov.includes(searchTerm)
  );

<<<<<<< HEAD
=======
  // قواعد الباسورد
  const [isFocused, setIsFocused] = useState(false);
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const rules = {
    firstCapital: /^[A-Z]/,
    specialChar: /[!@#$%^&*()/\\]/,
    minLength: /.{8,}/,
  };
  const checkRule = (rule) => rule.test(password);

  const passwordsNotMatch = confirmPassword.length > 0 && password !== confirmPassword;

<<<<<<< HEAD
=======
  // التحقق من رقم الهاتف كامل الشروط
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const isPhoneValid =
    phone.length === 11 &&
    phone[0] === "0" &&
    ["010", "011", "012", "015"].includes(phone.substring(0, 3));

  const isFormValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    emailError === "" &&
    isPhoneValid &&
    Governorate.trim() !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword;
<<<<<<< HEAD

  // --- الربط بالباك-إند (The Logic Integration) ---
  const handleRegister = async (e) => {
    e.preventDefault(); // منع الريفرش التلقائي
    if (!isFormValid) return;

    setIsLoading(true);

    // البيانات بالأسماء اللي الـ DTO في C# مستنيها
    const registerData = {
      fullName: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phone,
      governorate: Governorate
    };

    try {
      // 🚀 إرسال الطلب للـ API بتاع الـ OTP
      const response = await axios.post("https://etqanproject.runasp.net/api/ClientAccount/register-step1-send-otp", registerData);

      if (response.status === 200) {
        // ✅ نجاح: نبعت الداتا والبريد لصفحة الـ OTP
        // alert("تم إرسال كود التحقق إلى بريدك الإلكتروني");
        navigate("/login-otp/customer", {
          state: {
            email: email,
            registrationData: registerData // عشان نكمل التسجيل بعد كود الـ OTP
          }
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // عرض الخطأ اللي جاي من Identity (زي: الإيميل مستخدم قبل كدة)
        // alert(error.response.data.message || "حدث خطأ أثناء التسجيل، تأكد من البيانات.");
      } else {
        // alert("فشل الاتصال بالسيرفر، تأكد من تشغيل الـ .NET API.");
      }
    } finally {
      setIsLoading(false);
    }
  };

=======
   
  
  // --- دالة الربط بـ Axios (طريقتنا) ---
  const handleRegister = async () => {
    setIsLoading(true);
    const registerData = {
      fullName: username, // الباك إند مستني fullName
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phone, // الباك إند مستني phoneNumber
      governorate: Governorate // الباك إند مستني governorate
    };

    try {
      // إرسال للـ ClientAccountController
    const response = await axios.post("https://jeanette-unhumanistic-makayla.ngrok-free.dev/api/ClientAccount/register-step1-send-otp", registerData);

      if (response.status === 200) {
        // التوجه لصفحة الـ OTP مع تحديد الـ Role كـ customer
        navigate("/login-otp/customer", { state: { email: email } });
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "حدث خطأ في البيانات");
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
    <div className="customer-register-page-container">
      <motion.div
        className="form-section"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }} >
        <div className="form-fields">
<<<<<<< HEAD
          <form onSubmit={handleRegister}>
            <h1>مرحباً بك</h1>
            <h3>قم بإنشاء حسابك لبدء استخدام الخدمة</h3>

=======
          <form>
            <h1>مرحباً بك</h1>
            <h3>قم بإنشاء حسابك لبدء استخدام الخدمة</h3>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            <div className="fields-row">
              <div className="field-container">
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
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
              <div className="field-container">
                <input
                  type="text"
                  placeholder="رقم الهاتف"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
                {(phone.length > 0 && phone.length < 11) ||
<<<<<<< HEAD
                  phone[0] !== "0" ||
                  (phone.length >= 3 && !["010", "011", "012", "015"].includes(phone.substring(0, 3))) ? (
                  <ul className="phone-errors">
                    {phone.length > 0 && phone.length < 11 && <li>رقم الهاتف يجب أن يكون 11 رقم</li>}
                    {phone.length >= 1 && phone[0] !== "0" && <li>رقم الهاتف يجب أن يبدأ بالرقم 0</li>}
                    {phone.length >= 3 && !["010", "011", "012", "015"].includes(phone.substring(0, 3)) && (
                      <li>رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015</li>
                    )}
=======
                phone[0] !== "0" ||
                (phone.length >= 3 &&
                  !["010", "011", "012", "015"].includes(phone.substring(0, 3))) ? (
                  <ul className="phone-errors">
                    {phone.length > 0 && phone.length < 11 && <li>رقم الهاتف يجب أن يكون 11 رقم</li>}
                    {phone.length >= 1 && phone[0] !== "0" && <li>رقم الهاتف يجب أن يبدأ بالرقم 0</li>}
                    {phone.length >= 3 &&
                      !["010", "011", "012", "015"].includes(phone.substring(0, 3)) && (
                        <li>رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015</li>
                      )}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  </ul>
                ) : null}
              </div>

<<<<<<< HEAD
              <div className="searchable-dropdown" ref={dropdownRef}>
=======
              <div className="searchable-dropdown">
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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
                {showDropdown && searchTerm && (
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

<<<<<<< HEAD
=======
              {/* كلمة السر */}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              <div className="field-container password-field-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة السر"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
<<<<<<< HEAD
                  required
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                />
                <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
                {isFocused && (
                  <div className="password-rules">
                    <p style={{ color: checkRule(rules.firstCapital) ? "rgb(114,114,243)" : "rgb(235,138,138)" }}>• يجب أن يبدأ بحرف Capital</p>
<<<<<<< HEAD
                    <p style={{ color: checkRule(rules.specialChar) ? "rgb(114,114,243)" : "rgb(235,138,138)" }}>• يجب أن يحتوي على رمز خاص (!@#$)</p>
                    <p style={{ color: checkRule(rules.minLength) ? "rgb(114,114,243)" : "rgb(235,138,138)" }}>• يجب أن يكون 8 أحرف على الأقل</p>
=======
                    <p style={{ color: checkRule(rules.specialChar) ? "rgb(114,114,243)" : "rgb(235,138,138)" }}>• يجب أن يحتوي على !@#$%</p>
                    <p style={{ color: checkRule(rules.minLength) ? "rgb(114,114,243)" : "rgb(235,138,138)" }}>• يجب أن يكون على الأقل 8 أحرف</p>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  </div>
                )}
              </div>

              <div className="field-container password-field-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="تأكيد كلمة السر"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
<<<<<<< HEAD
                  required
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                />
                <span className="eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </span>
<<<<<<< HEAD
                {passwordsNotMatch && <p className="password-error-msg">كلمة السر غير متطابقة</p>}
              </div>
            </div>

            <button
              type="submit"
              className={`link-button ${!isFormValid ? "disabled" : ""}`}
=======
                {passwordsNotMatch && <p className="password-error-msg">يجب أن تكون كلمة السر مطابقة</p>}
              </div>
            </div>

  
                 <button
              type="button"
              className={`link-button ${!isFormValid ? "disabled" : ""}`}
              onClick={handleRegister}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              disabled={!isFormValid || isLoading}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                opacity: !isFormValid ? 0.5 : 1,
<<<<<<< HEAD
                width: "100%", cursor: isLoading ? "wait" : "pointer"
              }}
            >
              {isLoading ? "جاري المعالجة..." : "إنشاء حساب"}
            </button>

=======
                width: "100%", cursor: "pointer"
              }}
            >
              {isLoading ? "جاري إنشاء الحساب..." : "تسجيل"}
            </button>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            <h4 className="h4-customer-login">
              هل لديك حساب ؟ <Link to="/login/customer" className="Link">تسجيل الدخول</Link>
            </h4>
          </form>
        </div>

        <div className="image">
          <motion.img
            src="/images/Frame 19.svg"
            initial={{ x: "20%", y: 0, opacity: 0 }}
            animate={{ x: 0, y: [0, -10, 0], opacity: 1 }}
<<<<<<< HEAD
            transition={{
              x: { duration: 1.8, ease: "easeOut" },
              y: { duration: 3, ease: "easeInOut", repeat: Infinity },
              opacity: { duration: 1.8, ease: "easeOut" }
            }}
=======
            transition={{ x: { duration: 1.8, ease: "easeOut" }, y: { duration: 3, ease: "easeInOut", repeat: Infinity }, opacity: { duration: 1.8, ease: "easeOut" } }}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          />
        </div>
      </motion.div>
    </div>
  );
}

export default CustomerRegister;