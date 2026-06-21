/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { mockConversations } from "./ChatData";
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
import { useOrders } from "./OrdersContext";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
  const navRef = useRef(null); // المرجع الأساسي للـ navbar بالكامل لغلق القائمة عند الضغط بالخارج
  const ordersRef = useRef(null);
  const servicesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // العداد
  const [chatsCount, setChatsCount] = useState(0);

  useEffect(() => {
    const syncChatCounter = () => {
      const currentMockData = mockConversations || [];
      const savedChats = JSON.parse(localStorage.getItem("allChats")) || [];

      if (currentMockData.length !== savedChats.length) {
        localStorage.setItem("allChats", JSON.stringify(currentMockData));
        setChatsCount(currentMockData.length);
        window.dispatchEvent(new Event("chatUpdate"));
      }
    };

    syncChatCounter();
    const interval = setInterval(syncChatCounter, 1000);
    window.addEventListener("chatUpdate", syncChatCounter);
    window.addEventListener("storage", syncChatCounter);

    return () => {
      clearInterval(interval);
      window.removeEventListener("chatUpdate", syncChatCounter);
      window.removeEventListener("storage", syncChatCounter);
    };
  }, []);

  // التحكم الصارم في منع سكرول البودي عند فتح قائمة الموبايل
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh"; // لضمان ثبات الشاشة تماماً
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  // إغلاق القوائم المنسدلة وقائمة الموبايل عند الضغط خارجها
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

      // لو القائمة مفتوحة وضغطنا برة نطاق الـ navbar بالكامل تقفل القائمة
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const { pendingNotifications } = useOrders();
  const pendingCount = pendingNotifications.length;

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // قراءة الـ role و الـ userId من localStorage (يتم تخزينهم عند تسجيل الدخول)
  const [userRole, setUserRole] = useState(() => localStorage.getItem("role") || "");
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || "");

  // مراقبة تغيرات localStorage (مثلاً لو سجل دخول في تاب تاني)
  useEffect(() => {
    const syncAuth = () => {
      setUserRole(localStorage.getItem("role") || "");
      setUserId(localStorage.getItem("userId") || "");
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
    setIsNotifOpen(false);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleNotifications = (e) => {
    e.preventDefault();
    setIsNotifOpen((prev) => !prev);
    setActiveDropdown(null);
  };

  /**
   * توجيه أيقونة البروفايل حسب الـ Role المحفوظ في localStorage
   * القيم المتوقعة من الـ API: "Artisan", "Customer"/"Client", "Company", "Admin"
   */
  const getProfileLink = () => {
    const role = userRole?.toLowerCase()?.trim() || "";
    console.log("🔑 Navbar role:", JSON.stringify(userRole), "| userId:", userId);
    if (role === "artisan") return `/CraftmanProfile/${userId}`;
    if (role === "company") return `/CompanyProfile/${userId}`;
    if (role === "customer" || role === "client") return `/Clientprofile/${userId}`;
    // fallback: لو ما فيش role معروف يروح للصفحة الرئيسية
    return "/home";
  };

  useEffect(() => {
    const updateCount = () => {
      const savedChats = JSON.parse(localStorage.getItem("allChats")) || [];
      setChatsCount(savedChats.length);
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    window.addEventListener("chatUpdate", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("chatUpdate", updateCount);
    };
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="container">
        <div className="nav-icons-area">
          <div className="nav-icons">
            <NavLink to={getProfileLink()} className="user-circle-link">
              <div className="user-circle">
                <FaUserCircle className="icon" />
              </div>
            </NavLink>

            {/* أيقونة الرسائل */}
            <NavLink to="/Chat" className="icon-wrapper">
              <IoChatbubbleEllipses className="icon chat-bubble-icon" />
              {chatsCount > 0 && (
                <span className="notification-dot chat-dot">{chatsCount}</span>
              )}
            </NavLink>

            <div
              className="icon-wrapper notif-bell-trigger"
              onClick={toggleNotifications}
              style={{ cursor: "pointer" }}
            >
              <FaBell className="icon" />
              {pendingCount > 0 && (
                <span className="notification-dot">{pendingCount}</span>
              )}
              <NotificationDropdown
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
              />
            </div>

            <div className="mobile-menu-icon" onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>

        <ul className={isOpen ? "nav-links active" : "nav-links"}>
          <li>
            <Link to="/index" className="logout-btn" onClick={() => localStorage.clear()}>
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
                  <NavLink to="/Companies" onClick={toggleMenu}>
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
