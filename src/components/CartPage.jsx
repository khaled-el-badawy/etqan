import React, { useState, useEffect } from "react";
<<<<<<< HEAD
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
=======
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";
const initialCartPage = [
  {
    id: 1,
    name: "منتج 1",
    price: 100,
    oldPrice: 120,
    discount: "-20%",
    rating: 0,
    image: "/images/product1.png",
  },
  {
    id: 2,
    name: "منتج 2",
    price: 200,
    oldPrice: 250,
    discount: "-20%",
    rating: 0,
    image: "/images/product2.png",
  },
  {
    id: 3,
    name: "منتج 3",
    price: 300,
    oldPrice: 350,
    discount: "-15%",
    rating: 0,
    image: "/images/product3.png",
  },
  {
    id: 4,
    name: "منتج 4",
    price: 150,
    oldPrice: 180,
    discount: "-15%",
    rating: 0,
    image: "/images/product4.png",
  },
];
const CartPage = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initialCartPage;
  });

  const navigate = useNavigate();

  // تحديث localStorage عند أي تغيير
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // زيادة الكمية
  const increment = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
<<<<<<< HEAD
        item.id === id && (item.quantity || 1) < 5
          ? { ...item, quantity: (item.quantity || 1) + 1 }
=======
        item.id === id && item.quantity < 5
          ? { ...item, quantity: item.quantity + 1 }
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          : item
      )
    );
  };

  // تقليل الكمية
  const decrement = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
<<<<<<< HEAD
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
=======
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          : item
      )
    );
  };

  // حذف المنتج
  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

<<<<<<< HEAD
  // حساب الإجمالي (بناءً على الكمية الحقيقية)
  const totalQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);
=======
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
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

  return (
    <div className="cart-page-container">
      {showSuccessMessage && (
        <div className="success-message" data-aos="fade-up">
          <h2>تم إتمام الشراء بنجاح</h2>
<<<<<<< HEAD
          <p>شكراً لثقتك بنا في "إتقان". سيتم تجهيز طلبك قريباً</p>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="empty-cart" data-aos="fade-up">
          <h2>سلة التسوق فارغة</h2>
          <p>لم تضف أي معدات بعد. ابدأ بتجهيز عدتك الآن!</p>
          <button onClick={() => navigate("/products")} className="continue-shopping-btn">
            تصفح المنتجات
=======
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
              <div className="hero-buttons">
                 <button onClick={() => navigate("/FavoritesPage")} className="back-to-Favorites-btn">
              عرض المفضلة
                </button>
                <button onClick={() => navigate("/products")} className="back-to-shop-btn">
             متابعة التسوق
          </button>
               
              </div>
            </div>
          </div>
        </div>
      )}

      {/* السلة */}
      {cart.length === 0 ? (
        <div className="empty-cart" data-aos="fade-up">
          <h2>سلة التسوق فارغة</h2>
          <p>لم يتم إضافة أي منتجات بعد. تصفح المتجر لإكتشاف عروضنا واختيار ما يناسبك</p>
          <button onClick={() => navigate("/products")} className="continue-shopping-btn">
           ابدأ التسوق
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          </button>
        </div>
      ) : (
        <>
<<<<<<< HEAD
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

=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          <div className="initialCart-cards-container" data-aos="fade-up">
            {cart.map((item) => (
              <div key={item.id} className="initialCart-card">
                <div className="image-wrapper">
<<<<<<< HEAD
                  {item.discount && <span className="discount">{item.discount}</span>}
=======
                  <span className="discount">{item.discount}</span>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  <div className="initialCart-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
                <h3 className="initialCart-title">{item.name}</h3>
                <div className="price-rating-row">
                  <div className="price-box">
                    <span className="new-price">{item.price} جنيه</span>
<<<<<<< HEAD
                  </div>
                  <div className="rating">⭐ {item.rating || "0"}</div>
=======
                    <span className="old-price">{item.oldPrice} جنيه</span>
                  </div>
                  <div className="rating">⭐ {item.rating} </div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                </div>
                <div className="cart-actions">
                  <div className="quantity-control">
                    <button onClick={() => decrement(item.id)}>-</button>
<<<<<<< HEAD
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>🗑 حذف</button>
=======
                    <span>{item.quantity}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    🗑 حذف
                  </button>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                </div>
              </div>
            ))}
          </div>

<<<<<<< HEAD
          <div className="cart-total" data-aos="fade-up">
            <h3>ملخص الطلب</h3>
            <p>عدد الأصناف: {cart.length}</p>
            <p>إجمالي القطع: {totalQuantity}</p>
            <p>السعر النهائي: {totalPrice} جنيه</p>
            <button onClick={() => navigate("/CheckOut")} className="checkout-btn">إتمام العملية</button>
=======
          {/* جزء التوتال */}
          <div className="cart-total" data-aos="fade-up">
            <h3>ملخص الطلب</h3>
            <p>عدد المنتجات: {totalQuantity}</p>
            <p> السعر الإجمالي: {totalPrice} جنيه</p>
            <button onClick={() => navigate("/CheckOut")}  className="checkout-btn">
              إتمام الشراء
            </button>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;