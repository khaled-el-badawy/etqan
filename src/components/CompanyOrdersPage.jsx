import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CompanyOrdersPage.css";
import { FaUser, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

/* =======================
   Orders Data
======================= */

//muck data temporary 
const companyOrders = [
  {
    id: 1,
    companyName: "زبدة لنقل الموبليا",
    client: "ابراهيم علي",
    location: "المنصورة - أحمد ماهر",
    date: "اليوم",
    status: "pending",
  },
  {
    id: 2,
    companyName: "تركيب السخانات الكهربائية",
    client: "احمد علي",
    location: "المنصورة - أحمد ماهر",
    date: "13 - 1 - 2026",
    status: "completed",
  },
  {
    id: 3,
    companyName: "معالجة انقطاع الكهرباء",
    client: "احمد علي",
    location: "المنصورة - الترعة",
    date: "12 - 2 - 2026",
    status: "pending",
  },
  {
    id: 4,
    companyName: "إصلاح لوحات التوزيع",
    client: "محمد علي",
    location: "المنصورة - المشاية",
    date: "8 - 1 - 2026",
    status: "completed",
  },
  {
    id: 5,
    companyName: "صيانة  الاسلاك والتوصيلات",
    client: "اكرامي كامل",
    location: "المنصورة - الجلاء",
    date: "21 - 2 - 2026",
    status: "inProgress",
  },
  {
    id: 6,
    companyName: "إصلاح الدوائر  الكهربية",
    client: "صلاح مصطفى",
    location: "المنصورة - قناة السويس",
    date: "5 - 2 - 2026",
    status: "inProgress",
  },
  {
    id: 7,
    companyName: "معالجة ضعف التيار",
    client: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "19 - 2 - 2026",
    status: "completed",
  },
  {
    id: 8,
    companyName: "تركيب وحدات إضاءة",
    client: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "27 - 12 - 2025",
    status: "completed",
  },
  {
    id: 9,
    companyName: "إصلاح لوحات التوزيع",
    client: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "اليوم",
    status: "pending",
  },
  {
    id: 10,
    companyName: "تركيب أجراس كهربائية",
    client: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "اليوم",
    status: "pending",
  },
  {
    id: 11,
    companyName: "صيانة  الاسلاك والتوصيلات",
    client: "احمد وائل",
    location: "المنصورة - حي الجامعة",
    date: "8 - 11 - 2025",
    status: "completed",
  },
  {
    id: 12,
    companyName: "إصلاح الدوائر الكهربية",
    client: "احمد وائل",
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
        <h1>نوفر لك متابعه سريعة و دقيقة لطلبك</h1>
        
      </div>

      <div className="hero-image" data-aos="fade-right">
        <img src="/images/Construction-crane-cuate.svg" alt="bannsr-img" />
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
      <h3 className="order-title">{order.companyName}</h3>
      <div className="order-info">
        <p>
          <FaUser className="icon" />
          <span>العميل: {order.client}</span>
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

function CompanyOrdersSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredOrders = companyOrders.filter((orders) => {
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
    <div className="company-orders-page-container">
      <HeroBanner />
      <CompanyOrdersSection />
    </div>
  );
};

export default OrdersPage;
