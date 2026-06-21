/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./VerifyOTP.css";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
function VerifyOTP() {
  const { role } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [active, setActive] = useState(true);
  const [error, setError] = useState("");
  const isOtpComplete = otp.every((val) => val !== "");
  const userEmail = location.state?.email || "";
  const images = {
    customer: "/images/Frame 19.svg",
    company: "/images/Frame 20.svg",
    craftsman: "/images/Frame 18.svg",
  };
  const currentImage = images[role] || images.craftsman;

<<<<<<< HEAD
  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    try {
      const response = await axios.post(
        "https://etqanproject.runasp.net/api/ForgetPassword/verify-otp",
        {
          email: userEmail,
          otp: enteredOtp,
        },
      );

      if (response.status === 200) {
=======



 const handleVerify = async () => {
    const enteredOtp = otp.join("");
    try {
      const response = await axios.post("http://localhost:5036/api/ForgetPassword/verify-otp", {
        email: userEmail,
        otp: enteredOtp
      });

      if (response.status === 200) {
      
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        navigate(`/new-password/${role}`, { state: { email: userEmail } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "رمز التحقق غير صحيح");
    }
  };

  useEffect(() => {
    let interval;
    if (active && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [active, timer]);

  const handleResend = async () => {
<<<<<<< HEAD
    // alert("جاري إعادة إرسال الرمز...");
    try {
      await axios.post(
        `https://etqanproject.runasp.net/api/ForgetPassword/forgot-password-check-email?email=${userEmail}`,
      );
=======
    alert("جاري إعادة إرسال الرمز...");
    try {
      await axios.post(`http://localhost:5036/api/ForgetPassword/forgot-password-check-email?email=${userEmail}`);
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      setTimer(60);
      setActive(true);
      setOtp(["", "", "", ""]);
      setError("");
    } catch (err) {
<<<<<<< HEAD
      // alert("فشل إعادة الإرسال");
=======
      alert("فشل إعادة الإرسال");
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    }
  };
  // إدخال OTP
  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (error) setError("");

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  return (
    <div className="VerifyOTP-container">
      <motion.div
        className="VerifyOTP-form"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <div className="VerifyOTP-form-fields">
          <form>
            <h3 className="VerifyOTP-title">
              يرجى تفقد بريدك الإلكتروني وكتابة رمز التحقق
              <br />
<<<<<<< HEAD
              الذي أرسلناه للتو لإتمام{" "}
              {type === "reset" ? "تغيير كلمة المرور" : "تفعيل الحساب"}
              {userEmail && <small className="user-email">"{userEmail}"</small>}
=======
              الذي أرسلناه للتو لإتمام {type === "reset" ? "تغيير كلمة المرور" : "تفعيل الحساب"}
               {userEmail && <small className="user-email">"{userEmail}"</small>}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            </h3>

            <div className="otp-row">
              {otp.map((val, index) => (
                <motion.input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={val}
                  onChange={(e) => handleChange(e.target.value, index)}
                  required
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 * index,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {error && <p className="otp-error">{error}</p>}

            <button
              type="button"
              className="btn-VerifyOTP-container"
              onClick={handleVerify}
              disabled={!isOtpComplete}
              style={{
                pointerEvents: !isOtpComplete ? "none" : "auto",
                opacity: !isOtpComplete ? 0.5 : 1,
              }}
            >
              تأكيد
            </button>

            <div>
              <span
                className={`resend-otp ${timer > 0 ? "disabled" : ""}`}
                onClick={() => {
                  if (timer === 0) handleResend();
                }}
              >
                إعادة إرسال الرمز (
                {timer > 0 ? (timer < 10 ? `0${timer}` : timer) : "60"})
              </span>
            </div>
          </form>
        </div>
      </motion.div>

      <div className="image">
        <motion.img
          src={currentImage}
          initial={{ x: "20%", y: 0, opacity: 0 }}
          animate={{ x: 0, y: [0, -10, 0], opacity: 1 }}
          transition={{
            x: { duration: 1.8, ease: "easeOut" },
            y: { duration: 3, ease: "easeInOut", repeat: Infinity },
            opacity: { duration: 1.8, ease: "easeOut" },
          }}
          style={{
            height: "100%",
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

<<<<<<< HEAD
export default VerifyOTP;
=======
export default VerifyOTP;
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
