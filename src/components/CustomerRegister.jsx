import React, { useState, useRef, useEffect } from "react";
import "./CustomerRegister.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CustomerRegister() {
  const governorates = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الدقهلية",
    "الشرقية",
    "الغربية",
    "المنوفية",
    "البحيرة",
    "كفر الشيخ",
    "الفيوم",
    "بني سويف",
    "المنيا",
    "أسيوط",
    "سوهاج",
    "قنا",
    "الأقصر",
    "أسوان",
    "البحر الأحمر",
    "الوادي الجديد",
    "مطروح",
    "شمال سيناء",
    "جنوب سيناء",
    "الإسماعيلية",
    "السويس",
    "بورسعيد",
    "دمياط",
    "القليوبية",
  ];
  const jobDropdownRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [Governorate, setGovernorate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nationalIdError, setNationalIdError] = useState("");
  const [emailError, setEmailError] = useState("");

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

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    if (/^[a-zA-Zء-ي\s]*$/.test(val)) {
      setUsername(val);
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (val && !emailRegex.test(val)) {
      setEmailError("البريد الإلكتروني غير صالح");
    } else {
      setEmailError("");
    }
  };

  const handleNationalIdChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 11) {
      setNationalId(val);
      setNationalIdError("");
    }
  };

  const filteredGovernorates = governorates.filter((gov) =>
    gov.includes(searchTerm),
  );
  // التحقق من الباسورد
  const [isFocused, setIsFocused] = useState(false); // لتتبع التركيز

  // قواعد الباسورد
  const rules = {
    firstCapital: /^[A-Z]/, // أول حرف Capital
    specialChar: /[!@#$%^&*()/\\]/, // رمز خاص
    minLength: /.{8,}/, // على الأقل 8 أحرف
  };

  const checkRule = (rule) => rule.test(password);

  const isFormValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    emailError === "" &&
    nationalId.trim() !== "" &&
    nationalId.length === 11 &&
    Governorate.trim() !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword;

  const passwordsNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="customer-register-page-container">
      <motion.div
        className="form-section"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <h1>مرحباً بك</h1>
        <h3>قم بإنشاء حسابك لبدء استخدام الخدمة</h3>

        <div className="form-fields">
          <form>
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
                <p className="error-msg">{emailError}</p>
              </div>

              <div className="field-container">
                <input
                  type="text"
                  placeholder="رقم الهاتف"
                  value={nationalId}
                  onChange={handleNationalIdChange}
                  required
                />
                <p className="error-msg">
                  {nationalId.length > 0 && nationalId.length < 11
                    ? "رقم الهاتف يجب أن يكون 11 رقم"
                    : ""}
                </p>
              </div>

              <div className="searchable-dropdown">
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

              <div className="field-container password-field-container">
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
                  <div
                    className="password-rules"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        color: checkRule(rules.firstCapital)
                          ? "rgb(114, 114, 243)"
                          : "rgb(235, 138, 138)",
                        margin: 0,
                        fontSize: "0.85rem",
                      }}
                    >
                      <ul>
                        <li>يجب ان يكون أول حرف Capital</li>
                      </ul>
                    </p>
                    <p
                      style={{
                        color: checkRule(rules.specialChar)
                          ? "rgb(114, 114, 243)"
                          : "rgb(235, 138, 138)",
                        margin: 0,
                        fontSize: "0.85rem",
                      }}
                    >
                      <ul>
                        <li>يجب أن يحتوي على !@#$%</li>
                      </ul>
                    </p>
                    <p
                      style={{
                        color: checkRule(rules.minLength)
                          ? "rgb(114, 114, 243)"
                          : "rgb(235, 138, 138)",
                        margin: 0,
                        fontSize: "0.85rem",
                      }}
                    >
                      <ul>
                        <li>يجب ان يكون على الأقل 8 أحرف</li>
                      </ul>
                    </p>
                  </div>
                )}
              </div>

              <div className="field-container password-field-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="تأكيد كلمة السر"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <span
                  className="eye"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            <Link
              to={isFormValid ? "/CustomerOTP" : "#"}
              className={`link-button ${!isFormValid ? "disabled" : ""}`}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                opacity: !isFormValid ? 0.5 : 1,
              }}
            >
              تسجيل
            </Link>

            <h4 className="h4-customer-login">
              هل لديك حساب ؟{" "}
              <Link to="/CustomerLogin" className="Link">
                تسجيل الدخول
              </Link>
            </h4>
          </form>
        </div>
      </motion.div>

      <motion.img
        src="/images/Frame 19.svg"
        initial={{ x: "20%", y: 0, opacity: 0 }}
        animate={{ x: 0, y: [0, -10, 0], opacity: 1 }}
        transition={{
          x: { duration: 1.8, ease: "easeOut" },
          y: { duration: 3, ease: "easeInOut", repeat: Infinity },
          opacity: { duration: 1.8, ease: "easeOut" },
        }}
        style={{
          height: "100%",
          objectFit: "cover",
          display: "block",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default CustomerRegister;
