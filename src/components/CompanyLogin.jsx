import React, { useState } from "react";
import "./CompanyLogin.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function CompanyLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  // رسائل الخطأ لكل حقل
  const [emailError, setEmailError] = useState(""); 
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // التحقق من صحة الفورم
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isFormValid =
  emailRegex.test(email) && password.trim() !== "";

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("email"); 
    const storedPassword = localStorage.getItem("password");

    let valid = true;

    // تحقق من البريد الإلكتروني
    if (email !== storedEmail) {
      setEmailError("البريد الإلكتروني غير صحيح");
      valid = false;
    } else {
      setEmailError("");
    }

    // تحقق من كلمة السر
    if (password !== storedPassword) {
      setPasswordError("كلمة السر غير صحيحة");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      navigate("/home");
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

  return (
    <div className="company-login-container">
      <motion.div
        className="Login-form"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <div className="login-form-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">اهلاً بعودتك</h1>

            {/* حقل البريد الإلكتروني */}
            <div className="field-container">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <p className="login-error-msg">{emailError}</p>
              )}
            </div>

            {/* حقل كلمة السر */}
            <div className="field-container login-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
              {passwordError && (
                <p className="login-error-msg">{passwordError}</p>
              )}
            </div>

            <h3>
              <Link to="/CompanyForgotPassword" className="forgot-password-link">
                هل نسيت كلمة السر؟
              </Link>
            </h3>

            {/* زر تسجيل الدخول */}
            <Link to="/home">
              <button
                type="button"
                className="btn-container"
                onClick={handleLogin}
                disabled={!isFormValid}
                style={{
                  pointerEvents: !isFormValid ? "none" : "auto",
                  opacity: !isFormValid ? 0.5 : 1,
                }}
              >
                تسجيل الدخول
              </button>
            </Link>

            <h4 className="register-link">
              ليس لديك حساب ؟{" "}
              <Link to="/CompanyRegister" className="link">
                إنشاء حساب
              </Link>
            </h4>
          </form>
        </div>
      </motion.div>

      {/* الصورة */}
      <div className="image">
        <motion.img
          src="/images/Frame 20.svg"
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
          style={{
            // height: "100%",
            // objectFit: "cover",
            // display: "block",
            // flexShrink: 0,
            // position: "relative",
            // zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

export default CompanyLogin;