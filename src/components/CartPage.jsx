import React, { useState } from "react";
import "./CartPage.css";

const initialCart = [
  { id: 1, name: "شنيور تكسير وتخريم (Rotary Hammer)", price: 2310, oldPrice: 4200, rating: "4.9", reviews:"24", discount: "45%", quantity:1, image: "images/download-removebg-preview 6.svg" },
  { id: 2, name: "منشار زاوية كهربائي لقص الخشب والالمنيوم", price: 6440, oldPrice: 9200, rating: "4.9", reviews:"24", discount: "30%", quantity:1, image: "images/download-removebg-preview 7.svg" },
  { id: 3, name: "طقم مفاتيح ربط ثابتة احترافي 12 - 24 قطعة", price: 440, oldPrice: 1100, rating: "4.9", reviews:"24", discount: "60%", quantity:1, image: "images/download-removebg-preview 8.svg" },
  { id: 4, name: "طقم أزاميل خشب احترافي (6 قطع)", price: 377, oldPrice: 650, rating: "4.9", reviews:"24", discount: "42%", quantity:1, image: "images/download-removebg-preview 9.svg" },
  { id: 5, name: "طقم كماشة ومفتاح ربط كنيبكس مع جراب حزام", price: 618, oldPrice: 950, rating: "4.9", reviews:"24", discount: "35%", quantity:1, image: "images/download-removebg-preview 10.svg" },
  { id: 6, name: "منشار أركت يدوي (صغير) مع طقم نصلات", price: 125, oldPrice: 250, rating: "4.9", reviews:"24", discount: "50%", quantity:1, image: "images/download-removebg-preview 11.svg" }
];

const CartPage = () => {

  const [cart, setCart] = useState(initialCart);

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
  const updatedCart = cart.filter(item => item.id !== id);
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

  return (
    <div className="cart-page-container" >

      <div className="hero-top-image" data-aos="fade-right">
        <img src="/images/file_00000000a8dc71f8ae4edc4d97f8b6ee.svg" alt="إتقان" data-aos="fade-right"/>

        <div className="hero-title" data-aos="fade-up">
          <h1>سلة التسوق</h1>

          <div className="hero-text" data-aos="fade-up">
            <p>"خطوة أخيرة قبل تأكيد طلبك"</p>
          </div>
        </div>
      </div>

      {/* ================= المنتجات ================= */}

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

              <div className="rating">
                ⭐ {item.rating} ({item.reviews})
              </div>

            </div>

            {/* العداد + الحذف */}

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

    </div>
  );
};

export default CartPage;