import React, { useState, useRef } from "react";
import "./CompanyRegister.css";
import { FiEye, FiEyeOff, FiFolderPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CompanyRegister() {
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
    setEmailError(val && !emailRegex.test(val) ? "البريد الإلكتروني غير صالح" : "");
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

  const passwordsNotMatch = confirmPassword.length > 0 && password !== confirmPassword;
  
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
    password !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword;

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
                phone[0] !== "0" ||
                (phone.length >= 3 &&
                  !["010", "011", "012", "015"].includes(phone.substring(0, 3))) ? (
                  <ul className="phone-errors">
                    {phone.length > 0 && phone.length < 11 && (
                      <li>رقم الهاتف يجب أن يكون 11 رقم</li>
                    )}
                    {phone.length >= 1 && phone[0] !== "0" && (
                      <li>رقم الهاتف يجب أن يبدأ بالرقم 0</li>
                    )}
                    {phone.length >= 3 &&
                      !["010", "011", "012", "015"].includes(
                        phone.substring(0, 3)
                      ) && (
                        <li>رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015</li>
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
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </span>
                {passwordsNotMatch && (
                  <p className="password-error-msg">
                    يجب أن تكون كلمة السر مطابقة
                  </p>
                )}
              </div>
            </div>

            {/* زر التسجيل */}
              <Link
                        to={isFormValid ? "/CompanyOTP" : "#"}
                        className={`link-button ${!isFormValid ? "disabled" : ""}`}
                        style={{
                          pointerEvents: !isFormValid ? "none" : "auto",
                          opacity: !isFormValid ? 0.5 : 1,
                        }}
                      >
                        تسجيل
                      </Link>

            <h4 className="h4-login">
              هل لديك حساب ؟{" "}
              <Link to="/CompanyLogin" className="Link">
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