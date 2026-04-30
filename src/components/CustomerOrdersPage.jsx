import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./CustomerOrdersPage.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

/* =======================
   استيراد البيانات من الحالة العامة (Context)
   ⬅ بدل ما نكتب الداتا هنا، بنجيبها من OrdersContext
   ⬅ للـ Back-End: الداتا هتيجي من الـ API من خلال الـ Context
======================= */
import { useOrders } from "./OrdersContext";

/* =======================
   قسم البانر العلوي (Hero Section)
   ⬅ بانر ترحيبي في أعلى صفحة تتبع طلبات العميل
======================= */

function HeroBanner() {
  return (
    <div className="hero-banner" data-aos="fade-up">
      <div className="hero-content" data-aos="fade-left">
        <h1>متابعة دقيقة وآمنه لطلباتك</h1>
        <p>"من الحرفي لحد باب بيتك"</p>
      </div>

      <div className="hero-image" data-aos="fade-right">
        <img src="images/Delivery-amico 1.png" alt="" />
      </div>
    </div>
  );
}

/* =======================
   أزرار التصفية (Tabs)
   ⬅ بتسمح للعميل يفلتر طلباته حسب الحالة
   ⬅ الحالات: الكل / مكتمل / قيد التنفيذ / في الانتظار / ملغى
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

      {/* زر عرض الطلبات الملغية */}
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
   كارت طلب العميل (Order Card)
   ⬅ بيعرض تفاصيل الطلب: الخدمة، صورة الخدمة، العميل، الهاتف
   ⬅ الأزرار بتتغير حسب حالة الطلب (status)
   ⬅ للـ Back-End: الأزرار بتتحكم في التنقل بين الصفحات وفتح المودال
======================= */

function OrderCard({ order, setSelectedOrder }) {
  return (
    <div className="customer-order-card" data-aos="fade-up">
      {/* شارة حالة الطلب */}
      <span className={`status ${order.status}`}>
        {order.status === "completed" && "مكتمل"}
        {order.status === "inProgress" && "قيد التنفيذ"}
        {order.status === "pending" && "في الانتظار"}
        {order.status === "canceled" && "ملغى"}
      </span>

      {/* عنوان الخدمة */}
      <h3 className="service-title">{order.service}</h3>

      {/* تفاصيل الطلب — صورة + معلومات العميل */}
      <div className="order-details">
        {/* صورة الخدمة */}
        <div className="image">
          <img src={order.image} alt={order.service} />
        </div>

        {/* معلومات العميل */}
        <div className="client-info">
          {/* اسم العميل */}
          <p>
            <FaUserLarge style={{ fontSize: "20px" }} /> {order.client}
          </p>
          {/* رقم الهاتف */}
          <p>
            {" "}
            <FaPhoneAlt style={{ fontSize: "20px" }} /> {order.phone}
          </p>
        </div>
      </div>

      {/* ========== أزرار حسب حالة الطلب ========== */}

      {/* حالة: مكتمل — أزرار "تقييم الخدمة" و "فاتورة" */}
      {/* للـ Back-End: التقييم → POST /api/reviews / الفاتورة → GET /api/invoices/:id */}
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

      {/* حالة: قيد التنفيذ — أزرار "تتبع الطلب" و "اتصال" */}
      {/* للـ Back-End: تتبع الطلب → GET /api/customer/orders/:id/tracking */}
      {order.status === "inProgress" && (
        <div className="btnBox">
          <button className="link" onClick={() => setSelectedOrder(order)}>
            تتبع الطلب
          </button>
          <Link to={`/Chat`} className="link">
            اتصال
          </Link>
        </div>
      )}

      {/* حالة: في الانتظار — زر "تفاصيل" */}
      {/* للـ Back-End: GET /api/customer/orders/:id */}
      {order.status === "pending" && (
        <div className="btnBox">
          <Link to={`/OrderDetails`} className="link">
            تفاصيل
          </Link>
        </div>
      )}

      {/* حالة: ملغى — زر "إعادة الطلب" */}
      {/* للـ Back-End: POST /api/customer/orders (نسخة جديدة من الطلب) */}
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
   شبكة عرض الطلبات (Orders Grid)
   ⬅ بتعرض كل كروت الطلبات في شكل شبكة (grid)
======================= */

function OrdersGrid({ customerOrders, setSelectedOrder }) {
  return (
    <div className="orders-grid">
      {customerOrders.map((order) => (
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
   القسم الرئيسي — طلبات العميل (Main Section)
   ⬅ بيقرأ البيانات من الـ Context (بدل الداتا المحلية)
   ⬅ بيطبق الفلترة حسب التبويب النشط
   ⬅ للـ Back-End: ممكن تنقل الفلترة للـ API → GET /api/customer/orders?status=pending
======================= */

function OrdersSection() {
  /* جلب البيانات من الـ Context */
  const { customerOrders } = useOrders();

  /* حالة التبويب النشط — "all" يعني كل الطلبات */
  const [activeFilter, setActiveFilter] = useState("all");

  /* حالة المودال — الطلب اللي هيتعرض في مودال التتبع */
  const [selectedOrder, setSelectedOrder] = useState(null);

  /* تطبيق الفلترة على الطلبات */
  /* للـ Back-End: ممكن تنقل الفلترة للـ API → GET /api/customer/orders?status=... */
  const filteredOrders = customerOrders.filter((order) => {
    if (activeFilter === "all") return true;
    return order.status === activeFilter;
  });

  return (
    <section className="orders-section">
      <h2 data-aos="fade-left">طلباتك</h2>

      {/* أزرار التصفية */}
      <OrdersTabs
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* شبكة الطلبات — بتقرأ من الـ Context */}
      <OrdersGrid
        customerOrders={filteredOrders}
        setSelectedOrder={setSelectedOrder}
      />

      {/* مودال تتبع الطلب — يظهر عند الضغط على "تتبع الطلب" */}
      <OrderTrackingModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </section>
  );
}

/* =======================
   خطوات تتبع الطلب
   ⬅ المراحل اللي بيمر بيها الطلب
   ⬅ للـ Back-End: ممكن تيجي من الـ API → GET /api/customer/orders/:id/steps
======================= */
const steps = [
  "تم ارسال الطلب",
  "تم قبول الطلب",
  "تم معاينة المشكلة",
  "جاري تنفيذ الخدمة",
  "تم الانتهاء",
];

/* =======================
   مودال تتبع الطلب (Order Tracking Modal)
   ⬅ يظهر عند الضغط على "تتبع الطلب" في طلب قيد التنفيذ
   ⬅ بيعرض خطوات التنفيذ بشكل مرئي (progress steps)
   ⬅ للـ Back-End: البيانات (currentStep, stepDate, stepTime) بتيجي من الـ API
======================= */
function OrderTrackingModal({ order, onClose }) {
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

  return (
    <div className="order-modal-overlay">
      <div className="modal-content" data-aos="fade-up">
        {/* رأس المودال */}
        <div className="modal-header" data-aos="fade-up">
          <img src="images/orderModalIcon.svg" alt="" className="modal-icon" />
          <h3 className="modal-title">تابع تفاصيل طلبك</h3>
        </div>

        {/* خطوات التنفيذ */}
        <div className="modal-progress">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${index < order.currentStep ? "active" : ""}`}
              data-aos="fade-up"
            >
              {/* علامة الصح أو الدائرة الفارغة */}
              <span className="step-checker">
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

              {/* نص الخطوة + التاريخ والوقت */}
              <div className="step-text">
                {step}
                <span className="step-date" dir="ltr">
                  {order.stepDate}{" - "}
                  {order.stepTime}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* زر الإغلاق */}
        <button onClick={onClose}>تم</button>
      </div>
    </div>
  );
}

/* =======================
   تصدير الصفحة (Page Export)
   ⬅ المكوّن الرئيسي اللي بيتم عرضه في الـ Route
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
      {/* البانر العلوي */}
      <HeroBanner />
      {/* قسم الطلبات — بيقرأ من الـ Context */}
      <OrdersSection />
    </div>
  );
};

export default CustomerOrdersPage;
