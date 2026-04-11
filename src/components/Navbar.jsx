import React, { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaBell,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const ordersRef = useRef(null);
  const servicesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notification, setNotification] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ordersRef.current &&
        !ordersRef.current.contains(event.target) &&
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
      ) {
        setActiveDropdown(null); // يغلق كل القوائم
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-icons-area">
          <div className="nav-icons">
            {/*  رقم البروفايل مؤقتاً لحين ربط الباك اند */}
            <NavLink to={`/CraftmanProfile/1`} className="user-circle-link">
              <div className="user-circle">
                <FaUserCircle className="icon" />
              </div>
            </NavLink>

            <div className="icon-wrapper">
              <FaBell className="icon" />

              <span className="notification-dot">
                {notification > 0 ? notification : "2"}
              </span>
            </div>
          </div>

          <div className="mobile-menu-icon" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        <ul className={isOpen ? "nav-links active" : "nav-links"}>
          <li>
            <Link to="/index" className="logout-btn">
              <button>تسجيل الخروج</button>
            </Link>
          </li>
          <li>
            <NavLink to="/contactUs" className="no-active" onClick={toggleMenu}>
              تواصل معنا
            </NavLink>
          </li>

          <li className="dropdown" ref={ordersRef}>
            <button
              className="dropbtn"
              onClick={() => toggleDropdown("orders")}
            >
              الطلبات{" "}
              <FaChevronDown
                className={activeDropdown === "orders" ? "rotate" : ""}
              />
            </button>
            {activeDropdown === "orders" && (
              <ul className="dropdown-content">
                <li>
                  <NavLink to="/CustomerOrdersPage" onClick={toggleMenu}>
                    تتبع طلب العميل
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/CraftmanOrdersPage" onClick={toggleMenu}>
                    تتبع طلب الحرفي
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/CompanyOrdersPage" onClick={toggleMenu}>
                    تتبع طلب الشركة
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="dropdown" ref={servicesRef}>
            <button
              className="dropbtn"
              onClick={() => toggleDropdown("services")}
            >
              الخدمات{" "}
              <FaChevronDown
                className={activeDropdown === "services" ? "rotate" : ""}
              />
            </button>
            {activeDropdown === "services" && (
              <ul className="dropdown-content">
                <li>
                  <NavLink to="/Service" onClick={toggleMenu}>
                    الصيانة
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/Products" onClick={toggleMenu}>
                    المتجر
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Company" onClick={toggleMenu}>
                    الشركات
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/AboutUs" onClick={toggleMenu}>
              من نحن
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" onClick={toggleMenu}>
              الصفحة الرئيسية
            </NavLink>
          </li>
        </ul>
        <NavLink to="/home">
          <div className="logo">
            <img src="/images/Logo1.svg" alt="شعار إتقان" />
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
