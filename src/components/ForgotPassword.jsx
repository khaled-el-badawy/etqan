import React, { useState } from "react";
import "./ForgotPassword.css";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

function ForgotPassword() {
  const { role } = useParams(); // customer / company / craftsman
   const navigate = useNavigate();
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
const [loading, setLoading] = useState(false);
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
   const handleCheckEmail = async () => {
    setLoading(true);
    try {

      const response = await axios.post(`http://localhost:5036/api/ForgetPassword/forgot-password-check-email?email=${email}`);
      
      if (response.status === 200) {
       
        navigate(`/verify-otp/${role}?type=reset`, { state: { email: email } });
      }
    } catch (error) {
      alert(error.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
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
                <button
              type="button"
              onClick={handleCheckEmail}
              className={`btn-container ${!isFormValid || loading ? "disabled" : ""}`}
              style={{
                pointerEvents: !isFormValid || loading ? "none" : "auto",
                opacity: !isFormValid || loading ? 0.5 : 1,
              }}
            >
              {loading ? "جاري الإرسال..." : "إرسال"}
            </button>

          
    
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