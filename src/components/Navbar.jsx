import React, { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaBell,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5"; 
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const ordersRef = useRef(null);
  const servicesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notification, setNotification] = useState(0);
  const [messagesCount, setMessagesCount] = useState(5);

  // حالة نوع المستخدم: 'craftman' أو 'company' أو 'customer'
  const [userRole, setUserRole] = useState("craftman"); 
  // معرف المستخدم (ID) لربطه بالبروفايل الخاص به
  const [userId, setUserId] = useState("1");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // 1. دالة تحديد رابط البروفايل بناءً على النوع
  const getProfileLink = () => {
    if (userRole === "craftman") return `/CraftmanProfile/${userId}`;
    if (userRole === "company") return `/CompanyProfile/${userId}`;
    return "/CustomerProfile"; 
  };

  // 2. دالة تحديد رابط الجرس بناءً على النوع
  const getNotificationLink = () => {
    if (userRole === "craftman") return "/CraftmanOrdersPage";
    if (userRole === "company") return "/CompanyOrdersPage";
    return "/CustomerOrdersPage";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ordersRef.current &&
        !ordersRef.current.contains(event.target) &&
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
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
            {/* أيقونة الملف الشخصي - ديناميكية الآن */}
            <NavLink to={getProfileLink()} className="user-circle-link">
              <div className="user-circle">
                <FaUserCircle className="icon" />
              </div>
            </NavLink>

            {/* أيقونة الرسائل */}
            <NavLink to="/Chat" className="icon-wrapper">
              <IoChatbubbleEllipses className="icon chat-bubble-icon" />
              {messagesCount > 0 && (
                <span className="notification-dot chat-dot">
                  {messagesCount}
                </span>
              )}
            </NavLink>

            {/* أيقونة الجرس - ديناميكية */}
            <NavLink to={getNotificationLink()} className="icon-wrapper">
              <FaBell className="icon" />
              <span className="notification-dot">
                {notification > 0 ? notification : "2"}
              </span>
            </NavLink>
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
            <button className="dropbtn" onClick={() => toggleDropdown("orders")}>
              الطلبات <FaChevronDown className={activeDropdown === "orders" ? "rotate" : ""} />
            </button>
            {activeDropdown === "orders" && (
              <ul className="dropdown-content">
                <li><NavLink to="/CustomerOrdersPage" onClick={toggleMenu}>تتبع طلب العميل</NavLink></li>
                <li><NavLink to="/CraftmanOrdersPage" onClick={toggleMenu}>تتبع طلب الحرفي</NavLink></li>
                <li><NavLink to="/CompanyOrdersPage" onClick={toggleMenu}>تتبع طلب الشركة</NavLink></li>
              </ul>
            )}
          </li>

          <li className="dropdown" ref={servicesRef}>
            <button className="dropbtn" onClick={() => toggleDropdown("services")}>
              الخدمات <FaChevronDown className={activeDropdown === "services" ? "rotate" : ""} />
            </button>
            {activeDropdown === "services" && (
              <ul className="dropdown-content">
                <li><NavLink to="/Service" onClick={toggleMenu}>الصيانة</NavLink></li>
                <li><NavLink to="/Products" onClick={toggleMenu}>المتجر</NavLink></li>
                <li><NavLink to="/Companies" onClick={toggleMenu}>الشركات</NavLink></li>
              </ul>
            )}
          </li>

          <li><NavLink to="/AboutUs" onClick={toggleMenu}>من نحن</NavLink></li>
          <li><NavLink to="/home" onClick={toggleMenu}>الصفحة الرئيسية</NavLink></li>
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