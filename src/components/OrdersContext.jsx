import React, { createContext, useContext, useState, useMemo } from "react";

/* ==========================================================================
   ملف الحالة العامة (Global State) — OrdersContext
   ==========================================================================
   
   📌 الهدف:
   هذا الملف يحتوي على كل بيانات الطلبات في التطبيق.
   بدل ما كل صفحة يكون فيها بيانات محلية (local mock data)،
   كل الصفحات بتقرأ وتعدل من هنا.
   
   📌 للمطور الـ Back-End:
   عند الربط مع الـ API، كل اللي محتاج تعمله هو:
   1. استبدال المصفوفات الأولية (initialCraftmanOrders, initialCompanyOrders, initialCustomerOrders)
      بـ fetch من الـ API.
   2. استبدال الدوال (addOrder, updateOrderStatus, removeOrder)
      بطلبات HTTP (POST, PATCH, DELETE).
   3. كل شيء تاني (الفلترة، الإشعارات) هيتحدث تلقائياً.
   
   ========================================================================== */

/* =======================
   ① بيانات طلبات الحرفي (Craftman Orders)
   ⬅ تُعرض في صفحة: CraftmanOrdersPage
   ⬅ هيكل البيانات: { id, service, clientName, location, date, status }
   ⬅ للـ Back-End: استبدلها بـ GET /api/craftman/orders
======================= */

const initialCraftmanOrders = [
  { id: 1, service: "صيانة  الاسلاك والتوصيلات", clientName: "ابراهيم به", location: "المنصورة - أحمد ماهر", date: "اليوم", status: "pending" },
  { id: 2, service: "تركيب السخانات الكهربائية", clientName: "ابراهيم به", location: "المنصورة - أحمد ماهر", date: "13 - 1 - 2026", status: "completed" },
  { id: 3, service: "معالجة انقطاع الكهرباء", clientName: "احمد علي", location: "المنصورة - الترعة", date: "12 - 2 - 2026", status: "pending" },
  { id: 4, service: "إصلاح لوحات التوزيع", clientName: "محمد علي", location: "المنصورة - المشاية", date: "8 - 1 - 2026", status: "completed" },
  { id: 5, service: "صيانة  الاسلاك والتوصيلات", clientName: "اكرامي كامل", location: "المنصورة - الجلاء", date: "21 - 2 - 2026", status: "inProgress" },
  { id: 6, service: "إصلاح الدوائر  الكهربية", clientName: "صلاح مصطفى", location: "المنصورة - قناة السويس", date: "5 - 2 - 2026", status: "inProgress" },
  { id: 7, service: "معالجة ضعف التيار", clientName: "احمد وائل", location: "المنصورة - حي الجامعة", date: "19 - 2 - 2026", status: "completed" },
  { id: 8, service: "تركيب وحدات إضاءة", clientName: "احمد وائل", location: "المنصورة - حي الجامعة", date: "27 - 12 - 2025", status: "completed" },
  { id: 9, service: "إصلاح لوحات التوزيع", clientName: "احمد وائل", location: "المنصورة - حي الجامعة", date: "اليوم", status: "pending" },
  { id: 10, service: "تركيب أجراس كهربائية", clientName: "احمد وائل", location: "المنصورة - حي الجامعة", date: "اليوم", status: "pending" },
  { id: 11, service: "صيانة  الاسلاك والتوصيلات", clientName: "احمد وائل", location: "المنصورة - حي الجامعة", date: "8 - 11 - 2025", status: "completed" },
  { id: 12, service: "إصلاح الدوائر الكهربية", clientName: "احمد وائل", location: "المنصورة - حي الجامعة", date: "23 - 1 - 2026", status: "completed" },
];

/* =======================
   ② بيانات طلبات الشركة (Company Orders)
   ⬅ تُعرض في صفحة: CompanyOrdersPage
   ⬅ هيكل البيانات: { id, companyName, client, location, date, status }
   ⬅ للـ Back-End: استبدلها بـ GET /api/company/orders
======================= */

const initialCompanyOrders = [
  { id: 101, companyName: "زبدة لنقل الموبليا", client: "ابراهيم علي", location: "المنصورة - أحمد ماهر", date: "اليوم", status: "pending" },
  { id: 102, companyName: "تركيب السخانات الكهربائية", client: "احمد علي", location: "المنصورة - أحمد ماهر", date: "13 - 1 - 2026", status: "completed" },
  { id: 103, companyName: "معالجة انقطاع الكهرباء", client: "احمد علي", location: "المنصورة - الترعة", date: "12 - 2 - 2026", status: "pending" },
  { id: 104, companyName: "إصلاح لوحات التوزيع", client: "محمد علي", location: "المنصورة - المشاية", date: "8 - 1 - 2026", status: "completed" },
  { id: 105, companyName: "صيانة  الاسلاك والتوصيلات", client: "اكرامي كامل", location: "المنصورة - الجلاء", date: "21 - 2 - 2026", status: "inProgress" },
  { id: 106, companyName: "إصلاح الدوائر  الكهربية", client: "صلاح مصطفى", location: "المنصورة - قناة السويس", date: "5 - 2 - 2026", status: "inProgress" },
  { id: 107, companyName: "معالجة ضعف التيار", client: "احمد وائل", location: "المنصورة - حي الجامعة", date: "19 - 2 - 2026", status: "completed" },
  { id: 108, companyName: "تركيب وحدات إضاءة", client: "احمد وائل", location: "المنصورة - حي الجامعة", date: "27 - 12 - 2025", status: "completed" },
  { id: 109, companyName: "إصلاح لوحات التوزيع", client: "احمد وائل", location: "المنصورة - حي الجامعة", date: "اليوم", status: "pending" },
  { id: 110, companyName: "تركيب أجراس كهربائية", client: "احمد وائل", location: "المنصورة - حي الجامعة", date: "اليوم", status: "pending" },
  { id: 111, companyName: "صيانة  الاسلاك والتوصيلات", client: "احمد وائل", location: "المنصورة - حي الجامعة", date: "8 - 11 - 2025", status: "completed" },
  { id: 112, companyName: "إصلاح الدوائر الكهربية", client: "احمد وائل", location: "المنصورة - حي الجامعة", date: "23 - 1 - 2026", status: "completed" },
];

/* =======================
   ③ بيانات طلبات العميل (Customer Orders)
   ⬅ تُعرض في صفحة: CustomerOrdersPage
   ⬅ هيكل البيانات: { id, service, client, phone, status, currentStep, stepDate, stepTime, image }
   ⬅ للـ Back-End: استبدلها بـ GET /api/customer/orders
======================= */

const initialCustomerOrders = [
  { id: 201, service: "اصلاح تلفزيون", client: "احمد محمد", phone: "01234567890", status: "completed", currentStep: 0, stepDate: "12/10/2025", stepTime: "10:36 am", image: "/images/tv-player-entertainment-svgrepo-com 1.svg" },
  { id: 202, service: "اصلاح كهرباء", client: "محمد احمد", phone: "01066452001", status: "inProgress", currentStep: 5, stepDate: "12/10/2025", stepTime: "10:36 am", image: "/images/broken-cable-electrician-svgrepo-com 1.svg" },
  { id: 203, service: "دهان", client: "احمد محمد", phone: "01066452001", status: "pending", currentStep: 2, stepDate: "12/10/2025", stepTime: "10:36 am", image: "/images/paint-bucket-svgrepo-com 1.svg" },
  { id: 204, service: "اصلاح تكييف", client: "محمد ايمن", phone: "01066478901", status: "canceled", currentStep: 5, stepDate: "12/10/2025", stepTime: "10:36 am", image: "/images/air-conditioning-air-conditioner-svgrepo-com 1.svg" },
  { id: 205, service: "نجار", client: "مصطفي بكر", phone: "01066478901", status: "inProgress", currentStep: 2, stepDate: "12/10/2025", stepTime: "10:36 am", image: "/images/saw-svgrepo-com 2.svg" },
  { id: 206, service: "سباكة", client: "اكرامي كامل", phone: "01066478901", status: "canceled", currentStep: 5, stepDate: "12/10/2025", stepTime: "10:36 am", image: "/images/plumbing-plumber-svgrepo-com 1.svg" },
];

/* =======================
   إنشاء الـ Context
   ⬅ ده الكائن اللي بيحمل كل البيانات والدوال
======================= */

const OrdersContext = createContext();

/* =======================
   المكوّن الرئيسي: OrdersProvider
   ⬅ بيلف التطبيق كله ويوفر البيانات لكل الصفحات
   ⬅ للـ Back-End: ممكن تضيف useEffect هنا لجلب البيانات من الـ API عند أول تحميل
======================= */

export const OrdersProvider = ({ children }) => {

  /* ---- حالة طلبات الحرفي ---- */
  /* للـ Back-End: استبدلها بـ useEffect + fetch("/api/craftman/orders") */
  const [craftmanOrders, setCraftmanOrders] = useState(initialCraftmanOrders);

  /* ---- حالة طلبات الشركة ---- */
  /* للـ Back-End: استبدلها بـ useEffect + fetch("/api/company/orders") */
  const [companyOrders, setCompanyOrders] = useState(initialCompanyOrders);

  /* ---- حالة طلبات العميل ---- */
  /* للـ Back-End: استبدلها بـ useEffect + fetch("/api/customer/orders") */
  const [customerOrders, setCustomerOrders] = useState(initialCustomerOrders);

  /* ===================================================================
     دوال طلبات الحرفي
     =================================================================== */

  /* إضافة طلب حرفي جديد */
  /* للـ Back-End: استبدلها بـ POST /api/craftman/orders */
  const addCraftmanOrder = (order) => {
    setCraftmanOrders((prev) => [...prev, { ...order, id: Date.now() }]);
  };

  /* تحديث حالة طلب حرفي */
  /* للـ Back-End: استبدلها بـ PATCH /api/craftman/orders/:id */
  const updateCraftmanOrderStatus = (id, newStatus) => {
    setCraftmanOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  /* حذف طلب حرفي */
  /* للـ Back-End: استبدلها بـ DELETE /api/craftman/orders/:id */
  const removeCraftmanOrder = (id) => {
    setCraftmanOrders((prev) => prev.filter((o) => o.id !== id));
  };

  /* ===================================================================
     دوال طلبات الشركة
     =================================================================== */

  /* إضافة طلب شركة جديد */
  /* للـ Back-End: استبدلها بـ POST /api/company/orders */
  const addCompanyOrder = (order) => {
    setCompanyOrders((prev) => [...prev, { ...order, id: Date.now() }]);
  };

  /* تحديث حالة طلب شركة */
  /* للـ Back-End: استبدلها بـ PATCH /api/company/orders/:id */
  const updateCompanyOrderStatus = (id, newStatus) => {
    setCompanyOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  /* حذف طلب شركة */
  /* للـ Back-End: استبدلها بـ DELETE /api/company/orders/:id */
  const removeCompanyOrder = (id) => {
    setCompanyOrders((prev) => prev.filter((o) => o.id !== id));
  };

  /* ===================================================================
     دوال طلبات العميل
     =================================================================== */

  /* إضافة طلب عميل جديد */
  /* للـ Back-End: استبدلها بـ POST /api/customer/orders */
  const addCustomerOrder = (order) => {
    setCustomerOrders((prev) => [...prev, { ...order, id: Date.now() }]);
  };

  /* تحديث حالة طلب عميل */
  /* للـ Back-End: استبدلها بـ PATCH /api/customer/orders/:id */
  const updateCustomerOrderStatus = (id, newStatus) => {
    setCustomerOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  /* حذف طلب عميل */
  /* للـ Back-End: استبدلها بـ DELETE /api/customer/orders/:id */
  const removeCustomerOrder = (id) => {
    setCustomerOrders((prev) => prev.filter((o) => o.id !== id));
  };

  /* ===================================================================
     الإشعارات — الطلبات المعلقة (pending) فقط
     ⬅ بتتجمع من كل الأنواع الثلاثة
     ⬅ أي طلب جديد بحالة "pending" في أي نوع → يظهر تلقائي في الإشعارات
     ⬅ للـ Back-End: ممكن تستبدلها بـ GET /api/notifications أو تسيبها كده
     =================================================================== */

  const pendingNotifications = useMemo(() => {
    /* طلبات الحرفي المعلقة */
    const craftmanPending = craftmanOrders
      .filter((o) => o.status === "pending")
      .map((o) => ({
        ...o,
        /* رسالة الإشعار */
        message: `طلب جديد لـ "${o.service}" من ${o.clientName}`,
        /* مصدر الطلب — مفيد للتفريق في الـ Back-End */
        source: "craftman",
      }));

    /* طلبات الشركة المعلقة */
    const companyPending = companyOrders
      .filter((o) => o.status === "pending")
      .map((o) => ({
        ...o,
        message: `طلب جديد لـ "${o.companyName}" من ${o.client}`,
        source: "company",
      }));

    /* طلبات العميل المعلقة */
    const customerPending = customerOrders
      .filter((o) => o.status === "pending")
      .map((o) => ({
        ...o,
        message: `طلب جديد لـ "${o.service}" من ${o.client}`,
        source: "customer",
      }));

    /* دمج كل الإشعارات في مصفوفة واحدة */
    return [...craftmanPending, ...companyPending, ...customerPending];
  }, [craftmanOrders, companyOrders, customerOrders]);

  /* ===================================================================
     القيم اللي بيتم تصديرها لكل الصفحات
     ⬅ أي صفحة تقدر تستخدم useOrders() وتاخد أي حاجة من هنا
     =================================================================== */

  const value = {
    /* ---- بيانات الحرفي ---- */
    craftmanOrders,
    setCraftmanOrders,
    addCraftmanOrder,
    updateCraftmanOrderStatus,
    removeCraftmanOrder,

    /* ---- بيانات الشركة ---- */
    companyOrders,
    setCompanyOrders,
    addCompanyOrder,
    updateCompanyOrderStatus,
    removeCompanyOrder,

    /* ---- بيانات العميل ---- */
    customerOrders,
    setCustomerOrders,
    addCustomerOrder,
    updateCustomerOrderStatus,
    removeCustomerOrder,

    /* ---- الإشعارات (pending فقط من كل الأنواع) ---- */
    pendingNotifications,
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};

/* =======================
   الـ Hook المخصص: useOrders
   ⬅ بيتم استخدامه في أي مكوّن عشان يوصل للبيانات
   ⬅ مثال: const { craftmanOrders, addCraftmanOrder } = useOrders();
======================= */

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders لازم يتستخدم جوه <OrdersProvider>");
  }
  return context;
};

export default OrdersContext;
