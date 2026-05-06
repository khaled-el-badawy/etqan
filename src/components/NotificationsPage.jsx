import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useOrders } from "./OrdersContext";
import "./NotificationsPage.css";

/* =======================
   Notification Row
======================= */

function NotificationRow({ notif, index }) {
  return (
    <div
      className="notif-row"
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      <div className="notif-row__body">
        <p className="notif-row__message">{notif.message}</p>
        <span className="notif-row__sub">
          {notif.clientName || notif.client || ""} · {notif.location || notif.phone || ""} · {notif.date || notif.stepDate || ""}
        </span>
      </div>
    </div>
  );
}

/* =======================
   Full Notifications Page
======================= */

const NotificationsPage = () => {
  const { pendingNotifications } = useOrders();

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <div className="notif-page">
      {/* Page title */}
      <h1 className="notif-page__title" data-aos="fade-down">
        جميع الإشعارات
      </h1>

      {/* Notification rows */}
      <div className="notif-page__list">
        {pendingNotifications.length > 0 ? (
          pendingNotifications.map((notif, i) => (
            <NotificationRow key={`${notif.source}-${notif.id}`} notif={notif} index={i} />
          ))
        ) : (
          <div className="notif-page__empty" data-aos="fade-up">
            <p>لا توجد إشعارات حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
