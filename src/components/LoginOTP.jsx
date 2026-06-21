import React, { useState, useEffect } from "react";
import "./LoginOTP.css";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
<<<<<<< HEAD
import axios from "axios"; // استيراد أكسيوس للربط

function LoginOTP() {
  const { role } = useParams(); // بياخد "craftsman" أو "customer" من الرابط
=======
import axios from "axios"; 

function LoginOTP() {
  const { role } = useParams();
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
<<<<<<< HEAD

  // 1. استلام الإيميل من الصفحة اللي فاتت (عن طريق الـ Navigation State)
  const userEmail = location.state?.email || "";

=======
  const userEmail = location.state?.email || "";
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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

<<<<<<< HEAD
  // 2. دالة التحقق المربوطة بالباك إند (طريقتنا بـ Axios)
=======


  
    // 2. دالة التحقق المربوطة بالباك إند (طريقتنا بـ Axios)
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const handleLogin = async () => {
    const enteredOtp = otp.join(""); // تجميع الـ 4 أرقام

    // تحديد الرابط بناءً على نوع المستخدم (Role)
<<<<<<< HEAD
    const apiUrls = {
      craftsman: "https://etqanproject.runasp.net/api/ArtisanAccount/register-step2-verify",
      customer: "https://etqanproject.runasp.net/api/ClientAccount/register-step2-verify",
      company: "https://etqanproject.runasp.net/api/CompanyAccount/register-step2-verify", // ضيف السطر ده
    };
=======
   const apiUrls = {
  craftsman: "http://localhost:5036/api/ArtisanAccount/register-step2-verify",
  customer: "http://localhost:5036/api/ClientAccount/register-step2-verify",
  company: "http://localhost:5036/api/CompanyAccount/register-step2-verify", // ضيف السطر ده
};
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

    const targetUrl = apiUrls[role];

    try {
      // إرسال الإيميل والكود للباك إند
      const response = await axios.post(targetUrl, {
        email: userEmail,
        otp: enteredOtp
      });

      if (response.status === 200) {
<<<<<<< HEAD
        // alert(response.data.message || "تم تفعيل الحساب بنجاح!");
=======
        alert(response.data.message || "تم تفعيل الحساب بنجاح!");
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        navigate("/home"); // التوجه للرئيسية بعد النجاح
      }
    } catch (err) {
      // معالجة الأخطاء (كود غلط أو منتهي)
      if (err.response) {
        setError(err.response.data.message || "رمز التحقق غير صحيح");
      } else {
        setError("تعذر الاتصال بالسيرفر، تأكد من تشغيل الباك إند");
      }
    }
  };
<<<<<<< HEAD

  // التايمر (نفس المنطق بتاعك)
=======
  // التايمر
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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
<<<<<<< HEAD
  const handleResend = async () => {
    // alert("جاري إعادة إرسال الرمز...");
=======
  const handleResend = () => {
    alert("جاري إعادة إرسال الرمز");
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    setTimer(60);
    setActive(true);
    setOtp(["", "", "", ""]);
    setError("");
<<<<<<< HEAD

    // ملاحظة: هنا ممكن تنادي نفس API الـ step1 لو حبيت تبعت كود جديد فعلاً
  };

  // إدخال الـ OTP والتنقل بين الـ Inputs
=======
  };

  // إدخال OTP
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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
<<<<<<< HEAD
              الذي أرسلناه للتو لإتمام تفعيل الحساب {type === "reset" ? "تغيير كلمة المرور" : "تفعيل الحساب"}
              {userEmail && <small className="user-email">"{userEmail}"</small>}
=======
              الذي أرسلناه للتو لإتمام {type === "reset" ? "تغيير كلمة المرور" : "تفعيل الحساب"}
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

<<<<<<< HEAD
            <div className="resend-section">
=======
            <div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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