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

// كود إغلاق القوائم عند الضغط بالخارج
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      (ordersRef.current && !ordersRef.current.contains(event.target)) &&
      (servicesRef.current && !servicesRef.current.contains(event.target))
    ) {
      setActiveDropdown(null); // يغلق كل القوائم
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const { pendingNotifications } = useOrders();
  const pendingCount = pendingNotifications.length;

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [userRole, setUserRole] = useState("craftman"); 
  const [userId, setUserId] = useState("1");

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

  const getProfileLink = () => {
    if (userRole === "craftman") return `/CraftmanProfile/${userId}`;
    if (userRole === "company") return `/CompanyProfile/${userId}`;
    return "/CustomerProfile"; 
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
    <nav className="navbar">
      <div className="container">
        <div className="nav-icons-area">
          <div className="nav-icons">
            <NavLink to={getProfileLink()} className="user-circle-link">
              <div className="user-circle">
                <FaUserCircle className="icon" />
              </div>
            </NavLink>

            {/* أيقونة الرسائل  */}
            <NavLink to="/Chat" className="icon-wrapper">
              <IoChatbubbleEllipses className="icon chat-bubble-icon" />
              {chatsCount > 0 && (
                <span className="notification-dot chat-dot">
                  {chatsCount}
                </span>
              )}
            </NavLink>

            <div
              className="icon-wrapper notif-bell-trigger"
              onClick={toggleNotifications}
              style={{ cursor: "pointer" }}
            >
              <FaBell className="icon" />
              {pendingCount > 0 && (
                <span className="notification-dot">
                  {pendingCount}
                </span>
              )}
              <NotificationDropdown
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
              />
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