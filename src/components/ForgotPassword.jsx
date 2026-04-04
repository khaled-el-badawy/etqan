import React, { useState } from "react";
import "./ForgotPassword.css";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function ForgotPassword() {
  const { role } = useParams(); // customer / company / craftsman

  const [email, setEmail] = useState(""); 
  const [emailError, setEmailError] = useState(""); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  
  const images = {
    customer: "/images/Frame 19.svg",
    company: "/images/Frame 20.svg",
    craftsman: "/images/Frame 18.svg",
  };

  const currentImage = images[role] || images.craftsman;

  // تحقق من صحة البريد (للتأكد من تنسيق البريد فقط)
  const isFormValid = emailRegex.test(email);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (!val) {
      setEmailError("البريد الإلكتروني مطلوب");
    } else if (!emailRegex.test(val)) {
      setEmailError("البريد الإلكتروني غير صالح");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="ForgotPassword-container">
      <motion.div
        className="ForgotPassword-form"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <div className="ForgotPassword-form-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">أدخل بريدك الإلكتروني للتحقق</h1>

            <div className="field-container">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="ForgotPassword-error-msg">
                  {emailError}
                </p>
              )}
            </div>

            {/* الزرار يتحرك حسب صحة البريد */}
            <Link
              to={`/verify-otp/${role}`}  // :role customer / company / craftsman
              className={`btn-container ${!isFormValid ? "disabled" : ""}`}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                opacity: !isFormValid ? 0.5 : 1,
              }}
            >
              إرسال
            </Link>
          </form>
        </div>
      </motion.div>

      {/* الصورة */}
      <div className="image">
        <motion.img
          src={currentImage}
          initial={{ x: "20%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            height: "100%",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;