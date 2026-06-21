import React, { useState } from "react";
import "./Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
<<<<<<< HEAD
import axios from "axios";

function Login() {
  const { role } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
=======

function Login() {
  const { role } = useParams(); // customer / company / craftsman
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // رسالة النجاح
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const isFormValid = emailRegex.test(email) && password.trim() !== "";

  const rolesData = {
    customer: { image: "/images/Frame 19.svg" },
    company: { image: "/images/Frame 20.svg" },
    craftsman: { image: "/images/Frame 18.svg" },
  };

  const registerRoutes = {
    customer: "/CustomerRegister",
    company: "/CompanyRegister",
    craftsman: "/CraftsmanRegister",
  };

  const forgotRoute = `/forgot-password/${role}`;
  const current = rolesData[role] || rolesData.craftsman;

<<<<<<< HEAD
  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setLoading(true);

    try {
      const response = await axios.post("https://etqanproject.runasp.net/api/UserLogin/login", {
        email: email,
        password: password,
      });

      // ✅ استخراج البيانات المهمة من السيرفر
      // const { token, role: userRole, userId } = response.data;

      // // ✅ تخزين "هوية" المستخدم كاملة
      // localStorage.setItem("token", token);
      // localStorage.setItem("role", userRole); // Artisan, Customer, Company, Admin
      // localStorage.setItem("userId", userId); 
      //////////////////////////////
      const { token, role: userRole } = response.data;

      // فك الـ JWT بطريقة صحيحة
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      const payload = JSON.parse(window.atob(base64));

      console.log("Payload:", payload);

      // استخراج الـ ID
      const userId =
        payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      // تخزين البيانات
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("userId", userId);

      console.log("User ID:", userId);
      //////////////////////////////
      setShowSuccess(true);

      setTimeout(() => {
        // التوجيه الذكي
        if (userRole === "Admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }, 1500);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setEmailError("البريد الإلكتروني أو كلمة السر غير صحيحة");
      } else {
        setEmailError("فشل الاتصال بالسيرفر. تأكد من تشغيل الـ API");
      }
    } finally {
      setLoading(false);
    }
=======
  const handleLogin = () => {
    // مسح أي رسائل قديمة
    setEmailError("");
    setPasswordError("");

    // عرض رسالة النجاح مؤقتًا
    setShowSuccess(true);

    setTimeout(() => {
      navigate("/home");
    }, 1000);

    // لاحقًا بعد ربط الباك:
    // هنا هتتحقق من البريد و الباسورد عن طريق fetch
    // const response = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await response.json();
    // if (!data.success) {
    //   setEmailError("البريد الإلكتروني غير صحيح");
    //   setPasswordError("كلمة السر غير صحيحة");
    // } else {
    //   navigate("/home");
    // }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val && emailRegex.test(val)) setEmailError("");
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val) setPasswordError("");
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  };

  return (
    <div className="login-container">
<<<<<<< HEAD
      {showSuccess && <div className="toast-success">تم تسجيل دخولك بنجاح</div>}
      <motion.div className="login-form" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
        <div className="login-form-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">أهلاً بعودتك</h1>
            <div className="field-container">
              <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
              {emailError && <p className="login-error-msg">{emailError}</p>}
            </div>
            <div className="field-container login-password-field">
              <input type={showPassword ? "text" : "password"} placeholder="كلمة السر" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="password-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            <h3><Link to={forgotRoute} className="forgot-password-link">هل نسيت كلمة السر؟</Link></h3>
            <button type="button" className="btn-container" onClick={handleLogin} disabled={!isFormValid || loading}>
              {loading ? "جاري التحقق..." : "تسجيل الدخول"}
            </button>
            <h4 className="register-link">ليس لديك حساب؟ <Link to={registerRoutes[role]} className="link">إنشاء حساب</Link></h4>
          </form>
        </div>
      </motion.div>
      <div className="image">
        <motion.img src={current.image} initial={{ x: "20%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.8 }} />
=======
      {/* رسالة النجاح */}
      {showSuccess && (
        <div className="toast-success">
          تم تسجيل دخولك بنجاح
        </div>
      )}

      <motion.div
        className="login-form"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <div className="login-form-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">أهلاً بعودتك</h1>

            <div className="field-container">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="login-error-msg">{emailError}</p>}
            </div>

            <div className="field-container login-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة السر"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="password-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
              {passwordError && <p className="login-error-msg">{passwordError}</p>}
            </div>

            <h3>
              <Link to={forgotRoute} className="forgot-password-link">
                هل نسيت كلمة السر؟
              </Link>
            </h3>

            <button
              type="button"
              className="btn-container"
              onClick={handleLogin}
              disabled={!isFormValid}
              style={{ opacity: !isFormValid ? 0.5 : 1 }}
            >
              تسجيل الدخول
            </button>

            <h4 className="register-link">
              ليس لديك حساب؟{" "}
              <Link to={registerRoutes[role]} className="link">
                إنشاء حساب
              </Link>
            </h4>
          </form>
        </div>
      </motion.div>

      <div className="image">
        <motion.img
          src={current.image}
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
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      </div>
    </div>
  );
}

export default Login;