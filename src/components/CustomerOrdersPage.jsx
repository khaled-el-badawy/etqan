import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import "./CustomerOrdersPage.css";

import { FaPhoneAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

/* =======================
   Orders Data
======================= */

const orders = [
  {
    id: 1,
    service: "اصلاح تلفزيون",
    client: "احمد محمد",
    phone: "01066452001",
    status: "completed",
    image: "/images/tv-player-entertainment-svgrepo-com 1.png",
  },
  {
    id: 2,
    service: "اصلاح كهرباء",
    client: "محمد احمد",
    phone: "01066452001",
    status: "inProgress",
    image: "/images/broken-cable-electrician-svgrepo-com 1.png",
  },
  {
    id: 3,
    service: "دهان",
    client: "احمد محمد",
    phone: "01066452001",
    status: "pending",
    image: "/images/paint-bucket-svgrepo-com 1.png",
  },
  {
    id: 4,
    service: "اصلاح تكييف",
    client: "محمد ايمن",
    phone: "01066478901",
    status: "canceled",
    image: "/images/air-conditioning-air-conditioner-svgrepo-com 1.png",
  },
  {
    id: 5,
    service: "نجار",
    client: "مصطفي بكر",
    phone: "01066478901",
    status: "inProgress",
    image: "/images/saw-svgrepo-com 2.png",
  },
  {
    id: 6,
    service: "سباكة",
    client: "اكرامي كامل",
    phone: "01066478901",
    status: "canceled",
    image: "/images/plumbing-plumber-svgrepo-com 1.png",
  },
];

/* =======================
   Hero Section
======================= */

function HeroBanner() {
  return (
    <div className="hero-banner" data-aos="fade-up">
      <div className="hero-content" data-aos="fade-left">
        <h1>متابعة دقيقة وآمنه لطلباتك</h1>
        <p>“من الحرفي لحد باب بيتك”</p>
      </div>

      <div className="hero-image" data-aos="fade-right">
        <img src="images/Delivery-amico 1.png" alt="" />
      </div>
    </div>
  );
}

/* =======================
   Tabs
======================= */

function OrdersTabs({ activeFilter, setActiveFilter }) {
  return (
    <div className="tabs" data-aos="fade-left">
      <button
        className={activeFilter === "all" ? "active" : ""}
        onClick={() => setActiveFilter("all")}
      >
        الكل
      </button>

      <button
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => setActiveFilter("completed")}
      >
        الطلبات المكتملة
      </button>

      <button
        className={activeFilter === "inProgress" ? "active" : ""}
        onClick={() => setActiveFilter("inProgress")}
      >
        قيد التنفيذ
      </button>

      <button
        className={activeFilter === "pending" ? "active" : ""}
        onClick={() => setActiveFilter("pending")}
      >
        في الانتظار
      </button>

      <button
        className={activeFilter === "canceled" ? "active" : ""}
        onClick={() => setActiveFilter("canceled")}
      >
        الطلبات الملغية
      </button>
    </div>
  );
}

/* =======================
   Order Card
======================= */

function OrderCard({ order }) {
  return (
    <div className="customer-order-card" data-aos="fade-up">
      <span className={`status ${order.status}`}>
        {order.status === "completed" && "مكتمل"}
        {order.status === "inProgress" && "قيد التنفيذ"}
        {order.status === "pending" && "في الانتظار"}
        {order.status === "canceled" && "ملغى"}
      </span>

      <h3 className="service-title">{order.service}</h3>

      <div className="order-details">
        <div className="image">
          <img src={order.image} alt={order.service} />
        </div>

        <div className="client-info">
          <p>
            <FaUserLarge style={{ fontSize: "20px" }} /> {order.client}
          </p>
          <p>
            {" "}
            <FaPhoneAlt style={{ fontSize: "20px" }} /> {order.phone}
          </p>
        </div>
      </div>

      {order.status === "completed" && (
        <div className="btnBox">
          <button>تقييم الخدمة</button>
          <button>فاتورة</button>
        </div>
      )}

      {order.status === "inProgress" && (
        <div className="btnBox">
          <button>تتبع الطلب</button>
          <button>اتصال</button>
        </div>
      )}

      {order.status === "pending" && (
        <div className="btnBox">
          <button>تفاصيل</button>
        </div>
      )}

      {order.status === "canceled" && (
        <div className="btnBox">
          <button>إعادة الطلب</button>
        </div>
      )}
    </div>
  );
}

/* =======================
   Orders Grid
======================= */

function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

/* =======================
   Main Section
======================= */

function OrdersSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "all") return true;
    return order.status === activeFilter;
  });

  return (
    <section className="orders-section">
      <h2 data-aos="fade-left">طلباتك</h2>

      <OrdersTabs
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <OrdersGrid orders={filteredOrders} />
    </section>
  );
}

/* =======================
   Page Export
======================= */

const CustomerOrdersPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="customer-orders-container">
      <HeroBanner />
      <OrdersSection />
    </div>
  );
};

export default CustomerOrdersPage;
