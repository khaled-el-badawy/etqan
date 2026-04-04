import React, { useState, useRef } from "react";
import "./OrderDetails.css";
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCommentDots, 
  FaPhoneAlt, 
  FaUser,
  FaStar 
} from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";

const today = new Date();
const options = { day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = today.toLocaleDateString('ar-EG', options);

const order = {
  id: 1,
  service: "دهان",
  status: "في الانتظار",
  date: formattedDate, 
  location: "مدينة نصر - القاهرة",
  description: "دهان شقة 120 متر - غرفتين وصالة",
  price: "لم يتم التحديد",
  craftsman: {
    name: "أحمد محمد",
    phone: "01066452001",
    rating: 0.0,
    image: "/images/Ellipse 321.png"
  }
};

function OrderDetails() {
  const [headerMessage, setHeaderMessage] = useState("تم إرسال طلبك للحرفي وجاري انتظار الرد");
  const topRef = useRef(null);

  // دالة الغاء الطلب
  const handleCancel = () => {
    setHeaderMessage("تم إلغاء الطلب");
    // رجوع للهيدر
    topRef.current.scrollIntoView({ behavior: "smooth" });
    // إعادة توجيه لصفحة تتبع الطلب بعد دقيقة (60000ms)
    setTimeout(() => {
<<<<<<< HEAD
      window.location.href = "/CustomerOrdersPage"; 
=======
      window.location.href = "/CustomerOrdersPage"; // عدلي الرابط حسب مسار صفحة تتبع الطلب
>>>>>>> 5b2035b123794d80ec46b350fd1cb90d42b428da
    }, 2000);
  };

  return (
    <div className="order-details-container" ref={topRef}>

      {/* Header */}
      <div className="hero-top-image" data-aos="fade-right">
        <img src="/images/icon.svg" alt="إتقان" />

        <div className="hero-top-text" data-aos="fade-up">
          <h1 className="order-details-title">{order.service}</h1>
        </div>

        <div className="order-details-card" data-aos="fade-up">
          <span className={`status ${order.status === "في الانتظار" ? "pending" : "canceled"}`}>
            {order.status}
          </span>
        </div>

        <div className="hero-text" data-aos="fade-up">
          <p>{headerMessage}</p>
        </div>
      </div>

      {/* Order Info */}
      <div className="card">
        <h3 data-aos="fade-right">
          <HiOutlineClipboardList className="title-icon" />
          تفاصيل الطلب
        </h3>
        <div className="info-row" data-aos="fade-right">
          <FaCalendarAlt />
          <span>{order.date}</span>
        </div>
        <div className="info-row" data-aos="fade-right">
          <FaMapMarkerAlt />
          <span>{order.location}</span>
        </div>
        <div className="info-row" data-aos="fade-right">
          <FaCommentDots />
          <span>{order.description}</span>
        </div>
        <div className="price" data-aos="fade-right">
          السعر المتوقع : <strong>{order.price}</strong>
        </div>
      </div>

      {/* Craftsman Info */}
      <div className="card">
        <h3 data-aos="fade-right">
          <FaUser className="title-icon"/>
          بيانات الحرفي
        </h3>
        <div className="craftsman-placeholder" data-aos="fade-right">
          <p>سيتم عرض بيانات الحرفي بعد قبول الطلب</p>
        </div>
      </div>

      {/* Cancel Button في آخر الصفحة */}
      <button className="cancel-btn" onClick={handleCancel}>
        إلغاء الطلب
      </button>

    </div>
  );
}

export default OrderDetails;