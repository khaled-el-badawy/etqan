import React, { useState, useEffect } from "react";
import "./CompanyOTP.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CompanyOTP() {
  const [otp, setOtp] = useState(["", "", "", ""]); // لتخزين كل خانة
  const [timer, setTimer] = useState(60); 
  const [active, setActive] = useState(true); 

  // تحقق إذا كانت كل الخانات مملوءة بالأرقام
  const isOtpComplete = otp.every(val => val !== "");

  useEffect(() => {
    let interval;
    if (active && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [active, timer]);

  const handleResend = () => {
    setTimer(60); 
    setActive(true);
    setOtp(["", "", "", ""]); // مسح الخانات عند إعادة الإرسال
  };

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) { 
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  return (
    <div className="company-OTP-container">
      <motion.div
              className="CustomerOTP-form"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            >
              <div className="CustomerOTP-form-fields">
                <form>
                  <h3 className="CustomerOTP-title">
                    يرجى تفقد بريدك الإلكتروني وكتابة رمز التحقق
                    <br />
                    الذي أرسلناه للتو لإتمام تفعيل الحساب
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
      
                  <Link
                    to={isOtpComplete ? "/home" : "#"}
                    className={`btn-Link ${!isOtpComplete ? "disabled" : ""}`}
                    style={{
                      pointerEvents: !isOtpComplete ? "none" : "auto",
                      opacity: !isOtpComplete ? 0.5 : 1,
                    }}
                  >
                    <button type="button" className="btn-CustomerOTP-container">
                      تأكيد
                    </button>
                  </Link>
                  <div>
                    <span
                      className={`resend-otp ${timer > 0 ? "disabled" : ""}`}
                      onClick={() => {
                        if (timer === 0) handleResend();
                      }}
                    >
                      إعادة إرسال الرمز (
                      {timer > 0 ? (timer < 10 ? `0${timer} ` : timer) : "60 : 00"})
                    </span>
                  </div>
                </form>
              </div>
            </motion.div>
      
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
                  objectFit: "cover",
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

export default CompanyOTP;