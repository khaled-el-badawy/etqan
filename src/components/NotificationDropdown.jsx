import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "./OrdersContext";
import "./NotificationDropdown.css";

/* =======================
   Dropdown Component
======================= */

const PREVIEW_COUNT = 5;

const NotificationDropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { pendingNotifications } = useOrders();

  /* ---- click outside ---- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest(".notif-bell-trigger")
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  /* ---- "See More" handler ---- */
  const handleSeeMore = () => {
    onClose();
    navigate("/NotificationsPage");
  };

  const previewList = pendingNotifications.slice(0, PREVIEW_COUNT);

  return (
    <div
      ref={dropdownRef}
      className={`notif-dropdown ${isOpen ? "notif-dropdown--open" : "notif-dropdown--closed"}`}
    >
      {/* Header */}
      <div className="notif-dropdown__header">
        <span className="notif-dropdown__title">الإشعارات</span>
        {pendingNotifications.length > 0 && (
          <span className="notif-dropdown__badge">
            {pendingNotifications.length} جديد
          </span>
        )}
      </div>

      {/* Notification rows — text only, no icons */}
      <ul className="notif-dropdown__list">
        {previewList.map((notif) => (
          <li key={`${notif.source}-${notif.id}`} className="notif-dropdown__item">
            <p className="notif-dropdown__message">{notif.message}</p>
            <span className="notif-dropdown__sub">
              {notif.location || notif.phone || ""} · {notif.date || notif.stepDate || ""}
            </span>
          </li>
        ))}

        {pendingNotifications.length === 0 && (
          <li className="notif-dropdown__item notif-dropdown__item--empty">
            <p className="notif-dropdown__message">لا توجد إشعارات جديدة</p>
          </li>
        )}
      </ul>

      {/* Footer */}
      {pendingNotifications.length > 0 && (
        <div className="notif-dropdown__footer">
          <button className="notif-dropdown__see-more" onClick={handleSeeMore}>
            عرض المزيد
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
