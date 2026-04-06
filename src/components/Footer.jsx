import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const coloredPages = [
    "/CraftmanOrdersPage",
    "/CustomerOrdersPage",
    "/AboutUs",
    "/contactUs",
    "/OrderDetails",
    "/Faturuh",
    "/CartPage",
  ];
  const isColoredPage = coloredPages.includes(location.pathname);
  return (
    <footer className={`footer ${isColoredPage ? "footer-colored" : ""}`}>
      <div className="footer-container">
        <div className="footer-section logo-info">
          <div className="footer-logo">
            <img
              src="/images/Logo2.svg"
              alt="ETQAN Logo"
              className="large-logo"
            />
          </div>
          <p className="footer-desc">
            <span className="no-break">
              منصة متكاملة تجمع الحرفيين <br />
              والعملاء في مكان واحد.
            </span>{" "}
          </p>
        </div>
        <div className="footer-section">
          <h3 className="footer-link-h3">الصفحة الرئيسية</h3>
          <ul className="footer-link">
            <li>
              <Link to="#about">من نحن</Link>
            </li>
            <li>
              <Link to="#services">الخدمات</Link>
            </li>
            <li>
              <Link to="#orders">الطلبات</Link>
            </li>
            <li>
              <Link to="#contact">تواصل معنا</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-contact-h3">اتصل بنا</h3>
          <ul className="contact-info">
            <li>
              <FaEnvelope /> <span>ETQAN@gmail.com</span>
            </li>
            <li>
              <FaPhoneAlt /> <span dir="ltr">+20 100 000 0000</span>
            </li>
          </ul>
          <div className="social-icons">
            <Link to="#" className="social-link">
              <FaLinkedinIn />
            </Link>
            <Link to="#" className="social-link">
              <FaInstagram />
            </Link>
            <Link to="#" className="social-link">
              <FaTwitter />
            </Link>
            <Link to="#" className="social-link">
              <FaFacebookF />
            </Link>
          </div>
        </div>
        <div className="footer-section policies-section">
          <ul className="footer-ul">
            <li>
              <Link to="#" className="footer-link">
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                الشروط والأحكام
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>ETQAN 2026 - جميع الحقوق محفوظة ©</p>
      </div>
    </footer>
  );
};

export default Footer;
