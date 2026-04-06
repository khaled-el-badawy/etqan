import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CraftmanOrdersPage.css";
import { FaUser, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

/* =======================
   Orders Data
======================= */

const CraftmanOrders = [
  {
    id: 1,
    service: "صيانة  الاسلاك والتوصيلات",
    clientName: "ابراهيم به",
    location: "المنصورة - أحمد ماهر",
    date: "اليوم",
    status: "pending",
  },
  {
    id: 2,
    service: "تركيب السخانات الكهربائية",
    clientName: "ابراهيم به",
    location: "المنصورة - أحمد ماهر",
    date: "13 - 1 - 2026",
    status: "completed",
  },
  {
    id: 3,
    service: "معالجة انقطاع الكهرباء",
    clientName: "احمد علي",
    location: "المنصورة - الترعة",
    date: "12 - 2 - 2026",
    status: "pending",
  },
  {
    id: 4,
    service: "إصلاح لوحات التوزيع",
    clientName: "محمد علي",
    location: "المنصورة - المشاية",
    date: "8 - 1 - 2026",
    status: "completed",
  },
  {
    id: 5,
    service: "صيانة  الاسلاك والتوصيلات",
    clientName: "اكرامي كامل",
    location: "المنصورة - الجلاء",
    date: "21 - 2 - 2026",
    status: "inProgress",
  },
  {
    id: 6,
    service: "إصلاح الدوائر  الكهربية",
    clientName: "صلاح مصطفى",
    location: "المنصورة - قناة السويس",
    date: "5 - 2 - 2026",
    status: "inProgress",
  },
  {
    id: 7,
    service: "معالجة ضعف التيار",
    clientName: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "19 - 2 - 2026",
    status: "completed",
  },
  {
    id: 8,
    service: "تركيب وحدات إضاءة",
    clientName: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "27 - 12 - 2025",
    status: "completed",
  },
  {
    id: 9,
    service: "إصلاح لوحات التوزيع",
    clientName: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "اليوم",
    status: "pending",
  },
  {
    id: 10,
    service: "تركيب أجراس كهربائية",
    clientName: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "اليوم",
    status: "pending",
  },
  {
    id: 11,
    service: "صيانة  الاسلاك والتوصيلات",
    clientName: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "8 - 11 - 2025",
    status: "completed",
  },
  {
    id: 12,
    service: "إصلاح الدوائر الكهربية",
    clientName: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "23 - 1 - 2026",
    status: "completed",
  },
];

/* =======================
   Hero Section
======================= */

function HeroBanner() {
  return (
    <div className="hero-banner" data-aos="fade-up">
      <div className="hero-content" data-aos="fade-left">
        <h1>جميع طلبات الخدمات في مكان واحد</h1>
        <h1> مع متابعة حالتها خطوة بخطوة</h1>
      </div>

      <div className="hero-image" data-aos="fade-right">
        <img src="/images/Hybrid car-bro 1.png" alt="bannsr-img" />
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
    </div>
  );
}

/* =======================
   Order Card
======================= */

function OrderCard({ order }) {
  console.log(order);

  return (
    <div className="order-card" data-aos="fade-up">
      <h3 className="order-title">{order.service}</h3>
      <div className="order-info">
        <p>
          <FaUser className="icon" />
          <span>العميل: {order.clientName}</span>
        </p>
        <p>
          <FaMapMarkerAlt className="icon" />
          <span>{order.location}</span>
        </p>
        <p>
          <FaCalendarAlt className="icon" />
          <span>{order.date}</span>
        </p>
      </div>

      {order.status === "completed" && (
        <div className="btnBox">
          <button className="completed-btn">مكتمل</button>
        </div>
      )}

      {order.status === "inProgress" && (
        <div className="btnBox">
          <button className="in-progress-btn">تم الانتهاء</button>
          <button className="reject-btn">إلغاء</button>
        </div>
      )}

      {order.status === "pending" && (
        <div className="btnBox">
          <button className="accept-btn">قبول</button>
          <button className="reject-btn">رفض</button>
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

function CraftmanOrdersSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredOrders = CraftmanOrders.filter((orders) => {
    if (activeFilter === "all") return true;
    return orders.status === activeFilter;
  });

  return (
    <section className="orders-section">
      <h2 data-aos="fade-left">الطلبات الواردة</h2>

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

const OrdersPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="craftman-page-container">
      <HeroBanner />
      <CraftmanOrdersSection />
    </div>
  );
};

export default OrdersPage;
