import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CraftmanOrdersPage.css";
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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

function OrderCard({ order, setdOrderTicket }) {
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
          <button
            className="in-progress-btn"
            onClick={() => setdOrderTicket(order)}
          >
            تم الانتهاء
          </button>
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

function OrdersGrid({ orders, setdOrderTicket }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          setdOrderTicket={setdOrderTicket}
        />
      ))}
    </div>
  );
}

/* =======================
   Main Section
======================= */

function CraftmanOrdersSection() {
  const [OrderTicket, setdOrderTicket] = useState(null);

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

      <OrdersGrid orders={filteredOrders} setdOrderTicket={setdOrderTicket} />
      {/*  modal for order tracking */}
      <TicketModal order={OrderTicket} onClose={() => setdOrderTicket(null)} />
    </section>
  );
}
/* =======================
    Ticket Modal
======================= */

function TicketModal({ order, onClose }) {
  const [rows, setRows] = useState([
    { id: 1, name: "تصليح حنفية", qty: 1, price: 100 },
  ]);

  useEffect(() => {
    if (!order) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [order]);

  if (!order) return null;

  // ================= handlers =================

  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: Date.now(), name: "", qty: 1, price: 0 },
    ]);
  };

  const deleteRow = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const getTotal = (row) => row.qty * row.price;

  // ================= UI =================

  return (
    <div className="ticket-modal-overlay">
      <div className="modal-content" data-aos="fade-up">
        <h2 className="modal-title">إضافة فاتورة خدمات</h2>

        {/* table header */}
        <div className="table-header">
          <span>#</span>
          <span>اسم الخدمة</span>
          <span>الكمية</span>
          <span>السعر</span>
          <span>إجمالي</span>
          <span>الخيارات</span>
        </div>

        {/* rows */}
        {rows.map((row, index) => (
          <div className="table-row" key={row.id}>
            <span>{index + 1}</span>

            <input
              value={row.name}
              onChange={(e) => handleChange(row.id, "name", e.target.value)}
              placeholder="اكتب اسم"
            />

            <input
              type="number"
              value={row.qty}
              onChange={(e) => handleChange(row.id, "qty", +e.target.value)}
            />

            <input
              type="number"
              value={row.price}
              onChange={(e) => handleChange(row.id, "price", +e.target.value)}
            />

            <span>{getTotal(row)} جنيه</span>

            <div className="actions">
              {/* <button onClick={() => handleChange(row.id, "name", row.name)}>
                {" "}
                <FaPen />
                تعديل
              </button> */}
              <button onClick={() => deleteRow(row.id)}>
                {" "}
                <MdDelete />
                حذف
              </button>
            </div>
          </div>
        ))}

        {/* add row */}
        <div className="add-row-section">
        <button className="add-btn" onClick={addRow}>
          + إضافة خدمة أخرى
        </button>
        <div className="total-amount">
          <span>المبلغ الإجمالي: </span>
          <span>
            {rows.reduce((sum, row) => sum + getTotal(row), 0)} جنيه
          </span>
          </div>
        </div>
        {/* footer */}
        <div className="modal-footer">
          <button className="confirm-btn">تأكيد واصدار فاتورة</button>
          <button className="cancel-btn" onClick={onClose}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
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
