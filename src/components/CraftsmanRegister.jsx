import React, { useState, useRef, useEffect } from "react";
import "./CraftsmanRegister.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CraftsmanRegister() {
  // قائمة المهن
  const jobsList = [
    "حداد",
    "نجارة",
    "فني تكييفات",
    "سباكة",
    "كهرباء",
    "سيراميك",
    "فني كاميرات",
    "عامل بناء",
    "نقاش",
    "فني غاز",
    "سواق نقل",
    "تكسير وإزالة",
    "الومنتال",
    "منجد",
    "أمن وأنظمة ذكية",
    "محارة",
    "تنظيف",
    "استشارات هندسية",
    "رش مبيدات",
    "صيانة اجهزة كهربائية",
    "فني تركيب دش",
  ];

  const [selectedJob, setSelectedJob] = useState("");
  const [jobSearchTerm, setJobSearchTerm] = useState("");
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const jobDropdownRef = useRef(null);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        jobDropdownRef.current &&
        !jobDropdownRef.current.contains(event.target)
      ) {
        setShowJobDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredJobs = jobsList.filter((j) => j.includes(jobSearchTerm));

  // الحقول
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nationalIdError, setNationalIdError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // التحقق من الاسم
  const handleUsernameChange = (e) => {
    const val = e.target.value;
    if (/^[a-zA-Zء-ي\s]*$/.test(val)) {
      setUsername(val);
    }
  };

  // التحقق من البريد الإلكتروني
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

  // التحقق من الباسورد
  const [isFocused, setIsFocused] = useState(false); // لتتبع التركيز

  // قواعد الباسورد
  const rules = {
    firstCapital: /^[A-Z]/, // أول حرف Capital
    specialChar: /[!@#$%^&*()/\\]/, // رمز خاص
    minLength: /.{8,}/, // على الأقل 8 أحرف
  };

  const checkRule = (rule) => rule.test(password);

  // التحقق من الرقم القومي
  const handleNationalIdChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 14) {
      setNationalId(val);
    }
  };

  

const isFormValid =
  username.trim() !== "" &&
  email.trim() !== "" &&
  emailError === "" &&
  age !== "" &&
  age >= 18 &&
  maritalStatus !== "" &&
  nationalId.trim() !== "" &&
  nationalId.length === 14 &&
  selectedJob.trim() !== "" &&
  password !== "" &&
  confirmPassword !== "" &&
  password === confirmPassword;

  const passwordsNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;
   const [age, setAge] = useState("");
const [maritalStatus, setMaritalStatus] = useState("");
  return (
    <div className="craftsman-page-container">
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
       {/* العمر */}
<div className="field-container">
  <input
    type="number"
    placeholder="العمر"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    min="18"
    required
  />
  {age && age < 18 && (
    <p className="error-msg">يجب ألا يقل العمر عن 18 سنة</p>
  )}
</div>

{/* الحالة الاجتماعية */}
<div className="field-container">
  <select
    value={maritalStatus}
    onChange={(e) => setMaritalStatus(e.target.value)}
    required
  >
    <option value=""  >
      الحالة الاجتماعية
    </option>
    <option value="اعزب">أعزب</option>
    <option value="متزوج">متزوج</option>
    <option value="مطلق">مطلق</option>
    <option value="ارمل">أرمل</option>
  </select>
</div>
              <div className="field-container">
                <input
                  type="text"
                  placeholder="الرقم القومي"
                  value={nationalId}
                  onChange={handleNationalIdChange}
                  required
                />
                {nationalId.length > 0 && nationalId.length < 14 && (
                  <p className="error-msg">الرقم القومي يجب أن يكون 14 رقم</p>
                )}
              </div>

              <div className="field-container" ref={jobDropdownRef}>
                <div className="searchable-dropdown">
                  <input
                    type="text"
                    placeholder="المهنة"
                    value={selectedJob || jobSearchTerm}
                    onChange={(e) => {
                      setJobSearchTerm(e.target.value);
                      setSelectedJob("");
                      setShowJobDropdown(true);
                    }}
                    onFocus={() => setShowJobDropdown(true)}
                  />
                  {showJobDropdown && jobSearchTerm && (
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
              </div>

              <div
                className="field-container password-field-container"
                style={{ position: "relative" }}
              >
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
              to={isFormValid ? "/Verify-otp" : "#"}
              className={`link-button ${!isFormValid ? "disabled" : ""}`}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                opacity: !isFormValid ? 0.5 : 1,
              }}
            >
              تسجيل
            </Link>

            <h4 className="h4-craftsman-login">
              هل لديك حساب ؟{" "}
              <Link to="/Login" className="Link">
                تسجيل الدخول
              </Link>
            </h4>
          </form>
        </div>

        <div className="image">
          <motion.img
            src="/images/Frame 18.svg"
            initial={{ x: "20%", y: 0, opacity: 0 }}
            animate={{
              x: 0,
              y: [0, -10, 0],
              opacity: 1,
            }}
            transition={{
              x: { duration: 1.8, ease: "easeOut" },
              y: { duration: 3, ease: "easeInOut", repeat: Infinity },
              opacity: { duration: 1.8, ease: "easeOut" },
            }}
            style={
              {
                // height: "100%",
                // objectFit: "cover",
                // display: "block",
                // flexShrink: 0,
                // position: "relative",
                // zIndex: 1,
              }
            }
          />
        </div>
      </motion.div>
    </div>
  );
}

export default CraftsmanRegister;
