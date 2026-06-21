import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const CartPage = () => {
  const navigate = useNavigate();

  // 1. ركز هنا: بنقرأ من localStorage ولو فاضي بنخليه مصفوفة فاضية [] 
  // مش initialCartPage عشان ميعرضش منتجات قديمة ملهاش علاقة بشغلك
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : []; 
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // 2. تحديث الـ LocalStorage كل ما السلة تتغير (زيادة أو حذف)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // زيادة الكمية
  const increment = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && (item.quantity || 1) < 5
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  // تقليل الكمية
  const decrement = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  };

  // حذف المنتج
  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // حساب الإجمالي (بناءً على الكمية الحقيقية)
  const totalQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);

  return (
    <div className="cart-page-container">
      {showSuccessMessage && (
        <div className="success-message" data-aos="fade-up">
          <h2>تم إتمام الشراء بنجاح</h2>
          <p>شكراً لثقتك بنا في "إتقان". سيتم تجهيز طلبك قريباً</p>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="empty-cart" data-aos="fade-up">
          <h2>سلة التسوق فارغة</h2>
          <p>لم تضف أي معدات بعد. ابدأ بتجهيز عدتك الآن!</p>
          <button onClick={() => navigate("/products")} className="continue-shopping-btn">
            تصفح المنتجات
          </button>
        </div>
      ) : (
        <>
          {/* الهيدر */}
          <div className="hero-top-image" data-aos="fade-right">
            <img src="/images/file_00000000a8dc71f8ae4edc4d97f8b6ee.svg" alt="إتقان" />
            <div className="hero-title">
              <h1>سلة التسوق</h1>
              <div className="hero-buttons">
                <button onClick={() => navigate("/FavoritesPage")} className="back-to-Favorites-btn">المفضلة</button>
                <button onClick={() => navigate("/products")} className="back-to-shop-btn">متابعة التسوق</button>
              </div>
            </div>
          </div>

          <div className="initialCart-cards-container" data-aos="fade-up">
            {cart.map((item) => (
              <div key={item.id} className="initialCart-card">
                <div className="image-wrapper">
                  {item.discount && <span className="discount">{item.discount}</span>}
                  <div className="initialCart-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
                <h3 className="initialCart-title">{item.name}</h3>
                <div className="price-rating-row">
                  <div className="price-box">
                    <span className="new-price">{item.price} جنيه</span>
                  </div>
                  <div className="rating">⭐ {item.rating || "0"}</div>
                </div>
                <div className="cart-actions">
                  <div className="quantity-control">
                    <button onClick={() => decrement(item.id)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>🗑 حذف</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total" data-aos="fade-up">
            <h3>ملخص الطلب</h3>
            <p>عدد الأصناف: {cart.length}</p>
            <p>إجمالي القطع: {totalQuantity}</p>
            <p>السعر النهائي: {totalPrice} جنيه</p>
            <button onClick={() => navigate("/CheckOut")} className="checkout-btn">إتمام العملية</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;