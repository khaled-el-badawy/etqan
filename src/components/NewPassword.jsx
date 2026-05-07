import React, { useState } from "react";
import "./NewPassword.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios"; 

function NewPassword() {
  const { role } = useParams(); // customer / company / craftsman
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.email || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // الصور حسب الدور
  const images = {
    customer: "/images/Frame 19.svg",
    company: "/images/Frame 20.svg",
    craftsman: "/images/Frame 18.svg",
  };
  const currentImage = images[role] || images.craftsman;

  // قواعد كلمة المرور
  const rules = {
    firstCapital: /^[A-Z]/,
    specialChar: /[!@#$%^&*()/\\]/,
    minLength: /.{8,}/,
  };

  const checkRule = (rule) => rule.test(password);

  const isFormValid =
    checkRule(rules.firstCapital) &&
    checkRule(rules.specialChar) &&
    checkRule(rules.minLength) &&
    password === confirmPassword;

  

   


    // --- الدالة المصلحة للربط بالباك إند ---
  const handleChangePassword = async () => {
    let valid = true;

    if (!checkRule(rules.firstCapital)) {
      setPasswordError("يجب أن يبدأ أول حرف بحرف كبير");
      valid = false;
    } else if (!checkRule(rules.specialChar)) {
      setPasswordError("يجب أن تحتوي كلمة المرور على رمز خاص");
      valid = false;
    } else if (!checkRule(rules.minLength)) {
      setPasswordError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("تأكيد كلمة المرور غير متطابق");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    // لو البيانات صحيحة محلياً، نبدأ نكلم السيرفر
    if (valid) {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5036/api/ResetPassword/reset-password", {
          email: userEmail,
          newPassword: password
        });

        if (response.status === 200) {
          setSuccessMessage("تم تغيير كلمة المرور بنجاح");
          setPassword("");
          setConfirmPassword("");



          
          // نوديه لصفحة اللوجن حسب دوره بعد ثانية واحدة
          setTimeout(() => {
            setSuccessMessage("");
            navigate(`/home/${role}`);
          }, 1500);
        }
      } catch (error) {
        // لو السيرفر رفض (مثلاً CORS أو اليوزر مش موجود)
        const msg = error.response?.data?.message || "حدث خطأ أثناء الحفظ، تأكد من الاتصال";
        setPasswordError(msg);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="NewPassword-container">
      {/* رسالة النجاح فوق الفورم */}
      {successMessage && (
        <motion.div
          className="success-msg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {successMessage}
        </motion.div>
      )}

      <motion.div
        className="NewPassword-form"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <div className="NewPassword-form-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">تعيين كلمة مرور جديدة</h1>

            {/* كلمة المرور الجديدة */}
            <div className="field-container NewPassword-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <span
                className="password-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>

              {isFocused && (
                <div className="password-rules">
                  <ul>
                    <li style={{ color: checkRule(rules.firstCapital) ? "#7272f3" : "#eb8a8a" }}>
                      يجب أن يكون أول حرف Capital
                    </li>
                    <li style={{ color: checkRule(rules.specialChar) ? "#7272f3" : "#eb8a8a" }}>
                      يجب أن تحتوي على !@#$%
                    </li>
                    <li style={{ color: checkRule(rules.minLength) ? "#7272f3" : "#eb8a8a" }}>
                      يجب أن تكون على الأقل 8 أحرف
                    </li>
                  </ul>
                </div>
              )}

              {passwordError && <p className="NewPassword-error-msg">{passwordError}</p>}
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="field-container confirm-password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="تأكيد كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="password-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
              </span>

              {confirmPassword && confirmPassword !== password && (
                <p className="NewPassword-error-msg">يجب أن تكون كلمة السر مطابقة</p>
              )}
              {confirmPasswordError && <p className="NewPassword-error-msg">{confirmPasswordError}</p>}
            </div>

             <button
              type="button"
              className="btn-container"
              onClick={handleChangePassword}
              disabled={!isFormValid || loading}
              style={{
                pointerEvents: (!isFormValid || loading) ? "none" : "auto",
                opacity: (!isFormValid || loading) ? 0.5 : 1,
                transform: isFocused ? "translateY(80px)" : "translateY(0)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
                border: "none"
              }}
            >
              {loading ? "جاري الحفظ..." : "حفظ كلمة المرور"}
            </button>

            {/* زر تغيير كلمة المرور */}
            <button
              type="button"
              className="btn-container"
              onClick={handleChangePassword}
              disabled={!isFormValid}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                opacity: !isFormValid ? 0.5 : 1,
                transform: isFocused ? "translateY(80px)" : "translateY(0)",
                transition: "transform 0.3s ease",
              }}
            >
              حفظ كلمة المرور
            </button>
          </form>
        </div>
      </motion.div>

      {/* الصورة */}
      <div className="image">
        <motion.img
          key={role}
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

export default NewPassword;