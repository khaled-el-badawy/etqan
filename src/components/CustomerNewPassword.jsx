import React, { useState } from "react";
import "./CustomerNewPassword.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function CustomerNewPassword() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  // قواعد كلمة المرور
  const rules = {
    firstCapital: /^[A-Z]/,
    specialChar: /[!@#$%^&*()/\\]/,
    minLength: /.{8,}/,
  };

  // دالة لفحص كل قاعدة
  const checkRule = (rule) => rule.test(password);

  // التحقق من صحة الفورم
  const isFormValid =
    checkRule(rules.firstCapital) &&
    checkRule(rules.specialChar) &&
    checkRule(rules.minLength) &&
    password === confirmPassword;

  const handleChangePassword = () => {
    let valid = true;

    if (!checkRule(rules.firstCapital)) {
      setPasswordError("يجب أن يبدأ أول حرف بحرف كبير");
      valid = false;
    } 
    else if (!checkRule(rules.specialChar)) {
      setPasswordError("يجب أن تحتوي كلمة المرور على رمز خاص");
      valid = false;
    } 
    else if (!checkRule(rules.minLength)) {
      setPasswordError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      valid = false;
    } 
    else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("تأكيد كلمة المرور غير متطابق");
      valid = false;
    } 
    else {
      setConfirmPasswordError("");
    }

    if (valid) {
      navigate("/home");
    }
  };

  return (
    <div className="CustomerNewPassword-container">
      <motion.div
        className="CustomerNewPassword-form"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >

        <div className="CustomerNewPassword-form-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">تعيين كلمة مرور جديدة</h1>

                      {/* كلمة المرور الجديدة */}
                      
            <div className="field-container CustomerNewPassword-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور "
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
                <div
                  className="password-rules"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      color: checkRule(rules.firstCapital)
                        ? "rgb(114, 114, 243)"
                        : "rgb(235, 138, 138)",
                      margin: 0,
                      fontSize: "0.85rem",
                    }}
                  >
                    <ul>
                      <li>يجب أن يكون أول حرف Capital</li>
                    </ul>
                  </p>
                  <p
                    style={{
                      color: checkRule(rules.specialChar)
                        ? "rgb(114, 114, 243)"
                        : "rgb(235, 138, 138)",
                      margin: 0,
                      fontSize: "0.85rem",
                    }}
                  >
                    <ul>
                      <li>يجب أن تحتوي على !@#$%</li>
                    </ul>
                  </p>
                  <p
                    style={{
                      color: checkRule(rules.minLength)
                        ? "rgb(114, 114, 243)"
                        : "rgb(235, 138, 138)",
                      margin: 0,
                      fontSize: "0.85rem",
                    }}
                  >
                    <ul>
                      <li>يجب أن تكون على الأقل 8 أحرف</li>
                    </ul>
                  </p>
                </div>
              )}

              {passwordError && (
                <p className="CustomerNewPassword-error-msg">{passwordError}</p>
              )}
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

              {(confirmPassword && confirmPassword !== password) && (
                <p className="CustomerNewPassword-error-msg">
                  يجب أن تكون كلمة السر مطابقة
                </p>
              )}

              {confirmPasswordError && (
                <p className="CustomerNewPassword-error-msg">{confirmPasswordError}</p>
              )}
            </div>

            {/* زر تغيير كلمة المرور */}
           

            
              <Link to="/home" className="link">
                 <button
              type="button"
              className="btn-container"
              onClick={handleChangePassword}
              disabled={!isFormValid}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                  opacity: !isFormValid ? 0.5 : 1,
                  transform: isFocused ? "translateY(80px)" : "translateY(0)",
                  transition: "transform 0.3s ease" 
              }}
            >
              حفظ كلمة المرور
            </button>
              </Link>
           
          </form>
        </div>
      </motion.div>

      {/* الصورة */}
      <div className="image">
        <motion.img
          src="/images/Frame 19.svg"
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

export default CustomerNewPassword;