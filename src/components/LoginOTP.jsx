import React, { useState, useEffect } from "react";
import "./LoginOTP.css";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LoginOTP() {
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

  const images = {
    customer: "/images/Frame 19.svg",
    company: "/images/Frame 20.svg",
    craftsman: "/images/Frame 18.svg",
  };

  const currentImage = images[role] || images.craftsman;

  // الدالة المعدلة للتحقق والانتقال للصفحة الجديدة
   const handleLogin = async() => {
   const enteredOtp = otp.join("");

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, otp: enteredOtp }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/home");
      } else {
        setError("رمز التحقق غير صحيح");
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ، حاول مرة أخرى");
    }
  };

  // التايمر
  useEffect(() => {
    let interval;
    if (active && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [active, timer]);

  // إعادة إرسال الرمز
  const handleResend = () => {
    alert("جاري إعادة إرسال الرمز");
    setTimer(60);
    setActive(true);
    setOtp(["", "", "", ""]);
    setError("");
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
    <div className="LoginOTP-container">
      <motion.div
        className="LoginOTP-form"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <div className="LoginOTP-form-fields">
          <form>
            <h3 className="LoginOTP-title">
              يرجى تفقد بريدك الإلكتروني وكتابة رمز التحقق
              <br />
              الذي أرسلناه للتو لإتمام {type === "reset" ? "تغيير كلمة المرور" : "تفعيل الحساب"}
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
              className="btn-LoginOTP-container"
              onClick={handleLogin}
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

export default LoginOTP;