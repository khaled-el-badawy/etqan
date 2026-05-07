import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CompanyOrdersPage.css";
import { FaUser, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

/* =======================
   استيراد البيانات من الحالة العامة (Context)
   ⬅ بدل ما نكتب الداتا هنا، بنجيبها من OrdersContext
   ⬅ للـ Back-End: الداتا هتيجي من الـ API من خلال الـ Context
======================= */
import { useOrders } from "./OrdersContext";

/* =======================
   قسم البانر العلوي (Hero Section)
   ⬅ بانر ترحيبي في أعلى الصفحة
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
   أزرار التصفية (Tabs)
   ⬅ بتسمح للمستخدم يفلتر الطلبات حسب الحالة
   ⬅ الحالات: الكل / مكتمل / قيد التنفيذ / في الانتظار
======================= */

function OrdersTabs({ activeFilter, setActiveFilter }) {
  return (
    <div className="tabs" data-aos="fade-left">
      {/* زر عرض كل الطلبات */}
      <button
        className={activeFilter === "all" ? "active" : ""}
        onClick={() => setActiveFilter("all")}
      >
        الكل
      </button>

      {/* زر عرض الطلبات المكتملة */}
      <button
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => setActiveFilter("completed")}
      >
        الطلبات المكتملة
      </button>

      {/* زر عرض الطلبات قيد التنفيذ */}
      <button
        className={activeFilter === "inProgress" ? "active" : ""}
        onClick={() => setActiveFilter("inProgress")}
      >
        قيد التنفيذ
      </button>

      {/* زر عرض الطلبات المعلقة */}
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
   كارت الطلب الواحد (Order Card)
   ⬅ بيعرض تفاصيل طلب الشركة: اسم الشركة/الخدمة، العميل، الموقع، التاريخ
   ⬅ الأزرار بتتغير حسب حالة الطلب (status)
   ⬅ للـ Back-End: عند الضغط على "قبول" أو "رفض" → ابعت PATCH /api/company/orders/:id
======================= */

function OrderCard({ order, setdOrderTicket, onAccept, onReject }) {

  return (
    <div className="order-card" data-aos="fade-up">
      {/* اسم الشركة أو الخدمة */}
      <h3 className="order-title">{order.companyName}</h3>

      {/* معلومات الطلب */}
      <div className="order-info">
        {/* اسم العميل */}
        <p>
          <FaUser className="icon" />
          <span>العميل: {order.client}</span>
        </p>
        {/* موقع العميل */}
        <p>
          <FaMapMarkerAlt className="icon" />
          <span>{order.location}</span>
        </p>
        {/* تاريخ الطلب */}
        <p>
          <FaCalendarAlt className="icon" />
          <span>{order.date}</span>
        </p>
      </div>

      {/* ========== أزرار حسب حالة الطلب ========== */}

      {/* حالة: مكتمل — زر واحد غير قابل للضغط */}
      {order.status === "completed" && (
        <div className="btnBox">
          <button className="completed-btn">مكتمل</button>
        </div>
      )}

      {/* حالة: قيد التنفيذ — زر "تم الانتهاء" + زر "إلغاء" */}
      {/* للـ Back-End: "تم الانتهاء" → PATCH { status: "completed" } */}
      {/* حالة: قيد التنفيذ — زر "تم الانتهاء" (يفتح المودال) + زر "إلغاء" */}
      {/* للـ Back-End: عند "تم الانتهاء" → يفتح مودال الفاتورة */}
      {order.status === "inProgress" && (
        <div className="btnBox">
          <button
            className="in-progress-btn"
            onClick={() => setdOrderTicket(order)}
          >
            تم الانتهاء
          </button>
          <button className="reject-btn" onClick={() => onReject(order.id)}>إلغاء</button>
        </div>
      )}

      {/* حالة: في الانتظار — زر "قبول" + زر "رفض" */}
      {/* للـ Back-End: "قبول" → PATCH { status: "inProgress" } / "رفض" → DELETE */}
      {order.status === "pending" && (
        <div className="btnBox">
          <button className="accept-btn" onClick={() => onAccept(order.id)}>قبول</button>
          <button className="reject-btn" onClick={() => onReject(order.id)}>رفض</button>
        </div>
      )}
    </div>
  );
}

/* =======================
   شبكة عرض الطلبات (Orders Grid)
   ⬅ بتعرض كل كروت الطلبات في شكل شبكة (grid)
======================= */

function OrdersGrid({ orders, setdOrderTicket, onAccept, onReject }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          setdOrderTicket={setdOrderTicket}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
}

/* =======================
   القسم الرئيسي — طلبات الشركة (Main Section)
   ⬅ بيقرأ البيانات من الـ Context (بدل الداتا المحلية)
   ⬅ بيطبق الفلترة حسب التبويب النشط
   ⬅ للـ Back-End: الدوال updateCompanyOrderStatus و removeCompanyOrder
     لازم يتم استبدالها بـ API calls
======================= */

function CompanyOrdersSection() {
  /* جلب البيانات والدوال من الـ Context */
  const {
    companyOrders,
    updateCompanyOrderStatus,
    removeCompanyOrder,
  } = useOrders();

  /* حالة المودال — الطلب اللي هيتعرض في مودال الفاتورة */
  const [OrderTicket, setdOrderTicket] = useState(null);

  /* حالة التبويب النشط — "all" يعني كل الطلبات */
  const [activeFilter, setActiveFilter] = useState("all");

  /* تطبيق الفلترة على الطلبات */
  /* للـ Back-End: ممكن تنقل الفلترة للـ API → GET /api/company/orders?status=pending */
  const filteredOrders = companyOrders.filter((order) => {
    if (activeFilter === "all") return true;
    return order.status === activeFilter;
  });

  /* ---- معالج قبول الطلب / تم الانتهاء ---- */
  /* للـ Back-End: PATCH /api/company/orders/:id */
  const handleAccept = (id) => {
    /* لو الطلب pending → حوّله لـ inProgress */
    /* لو الطلب inProgress → حوّله لـ completed */
    const order = companyOrders.find((o) => o.id === id);
    if (order?.status === "pending") {
      updateCompanyOrderStatus(id, "inProgress");
    } else if (order?.status === "inProgress") {
      updateCompanyOrderStatus(id, "completed");
    }
  };

  /* ---- معالج رفض/إلغاء الطلب ---- */
  /* للـ Back-End: DELETE /api/company/orders/:id أو PATCH { status: "rejected" } */
  const handleReject = (id) => {
    removeCompanyOrder(id);
  };

  return (
    <section className="orders-section">
      <h2 data-aos="fade-left">الطلبات الواردة</h2>

      {/* أزرار التصفية */}
      <OrdersTabs
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* شبكة الطلبات */}
      <OrdersGrid
        orders={filteredOrders}
        setdOrderTicket={setdOrderTicket}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      {/* مودال إصدار فاتورة عند الضغط على "تم الانتهاء" */}
      <TicketModal order={OrderTicket} onClose={() => setdOrderTicket(null)} />
    </section>
  );
}

/* =======================
   مودال الفاتورة (Ticket Modal)
   ⬅ يظهر عند الضغط على "تم الانتهاء" في طلب قيد التنفيذ
   ⬅ بيسمح للشركة تضيف بنود الفاتورة (اسم الخدمة، الكمية، السعر)
   ⬅ للـ Back-End: عند "تأكيد واصدار فاتورة" → POST /api/invoices { orderId, items }
======================= */

function TicketModal({ order, onClose }) {
  /* بنود الفاتورة — كل بند فيه: اسم، كمية، سعر */
  const [rows, setRows] = useState([
    { id: 1, name: "تصليح حنفية", qty: 1, price: 100 },
  ]);

  /* منع التمرير في الخلفية لما المودال مفتوح */
  useEffect(() => {
    if (!order) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [order]);

  /* لو مفيش طلب مختار → ما تعرضش المودال */
  if (!order) return null;

  // ================= معالجات الأحداث =================

  /* تعديل قيمة خانة في بند معين */
  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  /* إضافة بند جديد في الفاتورة */
  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: Date.now(), name: "", qty: 1, price: 0 },
    ]);
  };

  /* حذف بند من الفاتورة */
  const deleteRow = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  /* حساب إجمالي البند الواحد */
  const getTotal = (row) => row.qty * row.price;

  // ================= واجهة المودال =================

  return (
    <div className="ticket-modal-overlay">
      <div className="modal-content" data-aos="fade-up">
        <h2 className="modal-title">إضافة فاتورة خدمات</h2>

        {/* رأس الجدول */}
        <div className="table-header">
          <span>#</span>
          <span>اسم الخدمة</span>
          <span>الكمية</span>
          <span>السعر</span>
          <span>إجمالي</span>
          <span>الخيارات</span>
        </div>

        {/* صفوف البنود */}
        {rows.map((row, index) => (
          <div className="table-row" key={row.id}>
            <span>{index + 1}</span>

            {/* اسم الخدمة */}
            <input
              value={row.name}
              onChange={(e) => handleChange(row.id, "name", e.target.value)}
              placeholder="اكتب اسم"
            />

            {/* الكمية */}
            <input
              type="number"
              value={row.qty}
              onChange={(e) => handleChange(row.id, "qty", +e.target.value)}
            />

            {/* السعر */}
            <input
              type="number"
              value={row.price}
              onChange={(e) => handleChange(row.id, "price", +e.target.value)}
            />

            {/* إجمالي البند */}
            <span>{getTotal(row)} جنيه</span>

            {/* زر الحذف */}
            <div className="actions">
              <button onClick={() => deleteRow(row.id)}>
                {" "}
                <MdDelete />
                حذف
              </button>
            </div>
          </div>
        ))}

        {/* زر إضافة بند + المبلغ الإجمالي */}
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

        {/* أزرار التأكيد والإلغاء */}
        {/* للـ Back-End: "تأكيد واصدار فاتورة" → POST /api/invoices */}
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
   تصدير الصفحة (Page Export)
   ⬅ المكوّن الرئيسي اللي بيتم عرضه في الـ Route
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
      {/* البانر العلوي */}
      <HeroBanner />
      {/* قسم الطلبات — بيقرأ من الـ Context */}
      <CompanyOrdersSection />
    </div>
  );
};

export default OrdersPage;
