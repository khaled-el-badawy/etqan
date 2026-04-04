import React, { useState } from "react";
import "./CompanyForgotPassword.css";
import { motion } from "framer-motion";
import { Link, useNavigate} from "react-router-dom";

function CompanyForgotPassword () {

  const [email, setEmail] = useState(""); 
 

  // رسائل الخطأ للحقل
  const [emailError, setEmailError] = useState(""); 
  


  // التحقق من صحة الفورم
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isFormValid =
  emailRegex.test(email);

  const handleLogin = () => {
  const storedEmail = localStorage.getItem("email"); 
    const navigate = useNavigate;
  let valid = true;

  if (email !== storedEmail) {
    setEmailError("البريد الإلكتروني غير صحيح");
    valid = false;
  } else {
    setEmailError("");
  }

  if (valid) {
    // هنا هتنتقلي لصفحة التحقق
    navigate("/craftsmanCode");
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
    <div className="CompanyForgotPassword-container">
      <motion.div
        className="CompanyForgotPassword-form"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <div className="CompanyForgotPassword-form-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">أدخل بريدك الالكتروني للتحقق </h1>
            
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
                <p className="CompanyForgotPassword-error-msg">{emailError}</p>
              )}
            </div>

        


            {/* زر تسجيل الدخول */}
            <Link to="/CompanyCode">
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
                إرسال
              </button>
            </Link>
          </form>
        </div>
      </motion.div>
      {/* -------------------------------------------------------------- */}
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
            height: "100%",
            // objectFit: "cover",
            display: "block",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

export default CompanyForgotPassword ;