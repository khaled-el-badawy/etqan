import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FavoritesPage.css";

const initialFavorites = [
  {
    id: 1,
    name: "منتج 1",
    price: 100,
    oldPrice: 120,
    discount: "-20%",
    rating: 4.5,
    reviews: 10,
    image: "/images/product1.png",
  },
  {
    id: 2,
    name: "منتج 2",
    price: 200,
    oldPrice: 250,
    discount: "-20%",
    rating: 4.8,
    reviews: 8,
    image: "/images/product2.png",
  },
  {
    id: 3,
    name: "منتج 3",
    price: 300,
    oldPrice: 350,
    discount: "-15%",
    rating: 4.2,
    reviews: 12,
    image: "/images/product3.png",
  },
  {
    id: 4,
    name: "منتج 4",
    price: 150,
    oldPrice: 180,
    discount: "-15%",
    rating: 4.0,
    reviews: 5,
    image: "/images/product4.png",
  },
];

const FavoritesPage = ({ addToCart }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : initialFavorites;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLimitMessage, setShowLimitMessage] = useState(false);

  const navigate = useNavigate();

  // حفظ المفضلة في localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // حذف من المفضلة
  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  // إضافة للسلة
const handleAddToCart = (item) => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = savedCart.findIndex(
    (i) => i.id === item.id
  );

  if (existingItemIndex !== -1) {
    if (savedCart[existingItemIndex].quantity >= 5) {
      setShowLimitMessage(true);
      setTimeout(() => setShowLimitMessage(false), 3000);
      return;
    } else {
      savedCart[existingItemIndex].quantity += 1;
    }
  } else {
    savedCart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(savedCart));

  setShowSuccessMessage(true);
  setTimeout(() => setShowSuccessMessage(false), 2000);

  setTimeout(() => navigate("/CartPage"), 2000);
};

  const filteredFavorites = favorites.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="favorites-page-container">
          {showSuccessMessage && (
        <div className="success-alert">تمت إضافة المنتج إلى السلة</div>
      )}

      {showLimitMessage && (
        <div className="limit-alert">تم الوصول للحد الأقصى 5 قطع لكل منتج</div>
      )}

      
        <div className="favorites-header">
          <h1 className="hero-title"data-aos="fade-right"> إدارة اختياراتك بعناية</h1>
              <p className="hero-text" data-aos="fade-right"> قم بمراجعة المنتجات التي اخترتها، أضف ما تحتاجه إلى السلة "
                  <br /> " أو احذف غير المرغوب 
               
                 مع تنظيم واضح يساعدك على اتخاذ قرار الشراء بثقة </p>
   
          <button
            onClick={() => navigate("/products")}
                  className="hero-back-to-shop-btn"
                  data-aos="fade-up"
          >
            العودة إلي المتجر
          </button>
        </div>
          
         <section className="search-section">
  <div className="container">
    <div className="search-wrapper">
      
      <input 
        type="text" 
        placeholder="ابحث عن المنتج" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <button className="search-btn">
        <img src="/images/services/searchicon.svg" alt="search" />
      </button>

    </div>
  </div>
</section>

      {filteredFavorites.length === 0 ? (
        <div className="empty-favorites" data-aos="fade-up">
          <h2>المفضلة فارغة</h2>
          <p>لم يتم إضافة أي منتجات بعد. تصفح المتجر لإختيار ما يعجبك.</p>
          <button
            onClick={() => navigate("/products")}
            className="back-to-shop-btn"
          >
            العودة إلي المتجر
          </button>
        </div>
      ) : (
        <div className="initialFavorites-cards-container" data-aos="fade-up">
          {filteredFavorites.map((item) => (
            <div key={item.id} className="initialFavorites-card">
              <div className="initialFavorites-image">
                <span className="discount">{item.discount}</span>
                <img src={item.image} alt={item.name} />
              </div>
              <h3 className="initialFavorites-title">{item.name}</h3>
              <div className="price-rating-row">
                <div className="price-box">
                  <span className="new-price">{item.price} جنيه</span>
                  <span className="old-price">{item.oldPrice} جنيه</span>
                </div>
                <div className="rating">
                  ⭐ {item.rating} ({item.reviews})
                </div>
              </div>
                  <div className="cart-actions">
                        <button
                  className="add-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                 إضافة إلى السلة
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeFromFavorites(item.id)}
                >
                  🗑 حذف
                </button>
              
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;