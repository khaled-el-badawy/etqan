import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  // تحديث localStorage عند أي تغيير
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // زيادة الكمية
  const increment = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.quantity < 5
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // تقليل الكمية
  const decrement = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // حذف المنتج
  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // حساب إجمالي الكمية والسعر
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // إتمام الشراء
  const handleCheckout = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setCart([]);
      localStorage.removeItem("cart");
    }, 4000);
    
  };

  return (
    <div className="cart-page-container">
      {showSuccessMessage && (
        <div className="success-message" data-aos="fade-up">
          <h2>تم إتمام الشراء بنجاح</h2>
          <p>شكراً لثقتك بنا. سيتم تجهيز طلبك قريباً</p>
        </div>
      )}
      {/* الهيدر يظهر فقط إذا هناك منتجات */}
      {cart.length > 0 && (
        <div className="hero-top-image" data-aos="fade-right">
          <img src="/images/file_00000000a8dc71f8ae4edc4d97f8b6ee.svg" alt="إتقان" data-aos="fade-right"/>
          <div className="hero-title" data-aos="fade-up">
            <h1>سلة التسوق</h1>
            <div className="hero-text" data-aos="fade-up">
              <p>"خطوة أخيرة قبل تأكيد طلبك"</p>
                <button onClick={() => navigate("/products")} className="hero-back-to-shop-btn">
            العودة إلي المتجر
          </button>
            </div>
          </div>
        </div>
      )}

      {/* السلة */}
      {cart.length === 0 ? (
        <div className="empty-cart" data-aos="fade-up">
          <h2>سلة التسوق فارغة</h2>
          <p>لم يتم إضافة أي منتجات بعد. تصفح المتجر لإكتشاف عروضنا واختيار ما يناسبك</p>
          <button onClick={() => navigate("/products")} className="back-to-shop-btn">
            العودة إلي المتجر
          </button>
        </div>
      ) : (
        <>
          <div className="initialCart-cards-container">
            {cart.map((item) => (
              <div key={item.id} className="initialCart-card">
                <div className="image-wrapper">
                  <span className="discount">{item.discount}</span>
                  <div className="initialCart-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
                <h3 className="initialCart-title">{item.name}</h3>
                <div className="price-rating-row">
                  <div className="price-box">
                    <span className="new-price">{item.price} جنيه</span>
                    <span className="old-price">{item.oldPrice} جنيه</span>
                  </div>
                  <div className="rating">⭐ {item.rating} ({item.reviews})</div>
                </div>
                <div className="cart-actions">
                  <div className="quantity-control">
                    <button onClick={() => decrement(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    🗑 حذف
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* جزء التوتال */}
          <div className="cart-total" data-aos="fade-up">
            <h3>ملخص الطلب</h3>
            <p>عدد المنتجات: {totalQuantity}</p>
            <p> السعر الإجمالي: {totalPrice} جنيه</p>
            <button onClick={handleCheckout} className="checkout-btn">
              إتمام الشراء
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;