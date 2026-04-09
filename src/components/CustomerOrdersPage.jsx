import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./CustomerOrdersPage.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

/* =======================
   Orders Data
======================= */

const CustomerOrders = [
  {
    id: 1,
    service: "اصلاح تلفزيون",
    client: "احمد محمد",
    phone: "01234567890",
    status: "completed",
    currentStep: 1,
    image: "/images/tv-player-entertainment-svgrepo-com 1.svg",
  },
  {
    id: 2,
    service: "اصلاح كهرباء",
    client: "محمد احمد",
    phone: "01066452001",
    status: "inProgress",
    currentStep: 3,

    image: "/images/broken-cable-electrician-svgrepo-com 1.svg",
  },
  {
    id: 3,
    service: "دهان",
    client: "احمد محمد",
    phone: "01066452001",
    status: "pending",
    currentStep: 2,
    image: "/images/paint-bucket-svgrepo-com 1.svg",
  },
  {
    id: 4,
    service: "اصلاح تكييف",
    client: "محمد ايمن",
    phone: "01066478901",
    status: "canceled",
    currentStep: 5,
    image: "/images/air-conditioning-air-conditioner-svgrepo-com 1.svg",
  },
  {
    id: 5,
    service: "نجار",
    client: "مصطفي بكر",
    phone: "01066478901",
    status: "inProgress",
    currentStep: 2,

    image: "/images/saw-svgrepo-com 2.svg",
  },
  {
    id: 6,
    service: "سباكة",
    client: "اكرامي كامل",
    phone: "01066478901",
    status: "canceled",
    currentStep: 5,
    image: "/images/plumbing-plumber-svgrepo-com 1.svg",
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

function OrderCard({ order, setSelectedOrder }) {
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
          <Link to={`/Clientprofile`} className="link">
            تقييم الخدمة
          </Link>
          <Link to={`/Faturuh`} className="link">
            فاتورة
          </Link>
        </div>
      )}
      {order.status === "inProgress" && (
        <div className="btnBox">
          <button className="link" onClick={() => setSelectedOrder(order)}>
            تتبع الطلب
          </button>
          <Link to={`#`} className="link">
            اتصال
          </Link>
        </div>
      )}

      {order.status === "pending" && (
        <div className="btnBox">
          <Link to={`/OrderDetails`} className="link">
            تفاصيل
          </Link>
        </div>
      )}

      {order.status === "canceled" && (
        <div className="btnBox">
          <Link to={`/CraftmanProfile/1`} className="link">
            إعادة الطلب
          </Link>
        </div>
      )}
    </div>
  );
}

/* =======================
   Orders Grid
======================= */

function OrdersGrid({ CustomerOrders, setSelectedOrder }) {
  return (
    <div className="orders-grid">
      {CustomerOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          setSelectedOrder={setSelectedOrder}
        />
      ))}
    </div>
  );
}

/* =======================
   Main Section
======================= */

function OrdersSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  //for modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = CustomerOrders.filter((order) => {
    if (activeFilter === "all") return true;
    return order.status === activeFilter;
  });

  return (
    <section className="orders-section">
      <h2 data-aos="fade-left">طلباتك</h2>
      {/*  tabs for filtering orders */}
      <OrdersTabs
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      {/*  grid of orders */}
      <OrdersGrid
        CustomerOrders={filteredOrders}
        setSelectedOrder={setSelectedOrder}
      />
      {/*  modal for order tracking */}
      <OrderTrackingModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </section>
  );
}

// Steps for order tracking (for future use in the modal)
const steps = [
  "تم ارسال الطلب",
  "تم قبول الطلب",
  "تم معاينة المشكلة",
  "جاري تنفيذ الخدمة",
  "تم الانتهاء",
];

//pop up component will be added here later
function OrderTrackingModal({ order, onClose }) {
  useEffect(() => {
    if (!order) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [order]);

  if (!order) return null;

  return (
    <div className="order-modal-overlay">
      <div className="modal-content" data-aos="fade-up">
        <div className="modal-header" data-aos="fade-up">
          <img src="images/orderModalIcon.svg" alt="" className="modal-icon" />
          <h3>تابع تفاصيل طلبك</h3>
        </div>
        <div className="modal-progress">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${index < order.currentStep ? "active" : ""}`}
              data-aos="fade-up"
            >
              <span>
                {index <= order.currentStep ? (
                  <div className="img-container">
                    <img
                      src="images/check-icon.svg"
                      alt="Check"
                      className="check-icon"
                    />
                  </div>
                ) : (
                  <div className="img-container"></div>
                )}
              </span>
              {step}
            </div>
          ))}
        </div>
        <button onClick={onClose}>تم</button>
      </div>
    </div>
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
