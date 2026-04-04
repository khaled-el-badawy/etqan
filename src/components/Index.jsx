import React, { useState,useEffect,useRef } from "react";
import "./Style.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Index() {
  const customerRef = useRef(null);
const craftsmanRef = useRef(null);
const companyRef = useRef(null);
  // الحالة لكل Dropdown عشان نتحكم في ظهورها عند الضغط
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (customerRef.current && !customerRef.current.contains(event.target)) &&
        (craftsmanRef.current && !craftsmanRef.current.contains(event.target)) &&
        (companyRef.current && !companyRef.current.contains(event.target))
      ) {
        setOpenDropdown(null); // يغلق كل القوائم
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="index-container">
      {/* صورة على الشمال */}
      <motion.img
        className="index-image"
        src="/images/Frame 16.svg"
        initial={{ x: "-20%", opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{
          // height: "100%",
          // objectFit: "cover",
          // display: "block",
          // flexShrink: 0,
          // position: "relative",
          // zIndex: 1,
          // left: 2,
        }}
      />

      {/* الإطارات الزرقاء حول الصورة */}
      <motion.div
        className="frame-top"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />
      <motion.div
        className="frame-bottom"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      />
      <motion.div
        className="frame-left"
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
      />
      <motion.div
        className="frame-right"
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.9 }}
      />

      {/* الجزء الخاص بالنص والزراير */}
      <div className="index-content">
        <motion.div
          className="index"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <div className="image-logo">
            <img src="/images/Frame 15.svg" className="index-logo" />
          </div>

          <div className="index-text">
            <h3 className="index-title">
              <span className="title-no-break">
                نوفر لك وصولًا سريعًا وخدمة آمنه وجودة
                <br />
                مضمونة تلبّي احتياجاتك اليومية بسهولة
              </span>
            </h3>
          </div>

           <div className="index-buttons">
            {/* زرار عميل */}
            <motion.div
              ref={customerRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.8, ease: "easeInOut" }}
            >
              <div className="dropdown">
                <button
                  className="btn-index-container"
                  onClick={() => toggleDropdown("customer")}
                >
                  عميل
                </button>
                {openDropdown === "customer" && (
                  <div className="dropdown-content">
                    <Link to="/CustomerRegister">إنشاء حساب</Link>
                    <Link to="/login/customer">تسجيل دخول</Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* زرار حرفي */}
            <motion.div
              ref={craftsmanRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.8, ease: "easeInOut" }}
            >
              <div className="dropdown">
                <button
                  className="btn-index-container"
                  onClick={() => toggleDropdown("craftsman")}
                >
                  حرفي
                </button>
                {openDropdown === "craftsman" && (
                  <div className="dropdown-content">
                    <Link to="/CraftsmanRegister">إنشاء حساب</Link>
                    <Link to="/login/craftsman">تسجيل دخول</Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* زرار شركة */}
            <motion.div
              ref={companyRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1.8, ease: "easeInOut" }}
            >
              <div className="dropdown">
                <button
                  className="btn-index-container"
                  onClick={() => toggleDropdown("company")}
                >
                  شركة
                </button>
                {openDropdown === "company" && (
                  <div className="dropdown-content">
                    <Link to="/CompanyRegister">إنشاء حساب</Link>
                    <Link to="/login/company">تسجيل دخول</Link>
                  </div>
                )}
            
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Index;