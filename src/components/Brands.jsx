import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Brands.css";
import { FaHeart } from "react-icons/fa";

const initialBrands = [
  {
    id: 1,
    name: "شنيور تكسير وتخريم",
    price: 2310,
    oldPrice: 4200,
    discount: "45%",
    rating: 4.9,
    reviews: 24,
    image: "/images/download-removebg-preview 6.svg",
  },
  {
    id: 2,
    name: "منشار زاوية كهربائي",
    price: 6440,
    oldPrice: 9200,
    discount: "30%",
    rating: 4.9,
    reviews: 24,
    image: "/images/download-removebg-preview 7.svg",
  },
  {
    id: 3,
    name: "طقم مفاتيح ربط",
    price: 440,
    oldPrice: 1100,
    discount: "60%",
    rating: 4.9,
    reviews: 24,
    image: "/images/download-removebg-preview 8.svg",
  },
  {
    id: 4,
    name: "طقم أزاميل خشب",
    price: 377,
    oldPrice: 650,
    discount: "42%",
    rating: 4.9,
    reviews: 24,
    image: "/images/download-removebg-preview 9.svg",
  },
  {
    id: 5,
    name: "طقم كماشة ومفتاح ربط كنيبكس مع جراب حزام",
    price: 618,
    oldPrice: 950,
    discount: "35%",
    rating: 4.9,
    reviews: 24,
    image: "/images/download-removebg-preview 10.svg",
  },
  {
    id: 6,
    name: "منشار أركت يدوي (صغير) مع طقم نصلات احتياطية",
    price: 125,
    oldPrice: 250,
    discount: "50%",
    rating: 4.9,
    reviews: 24,
    image: "/images/download-removebg-preview 11.svg",
    },
  {
        id: 7,
      name: "شنيور شحن DeWalt احترافي مع شنطة وبطارية وشاحن ",
      price: "7938",
      oldPrice: "9000",
      rating: "4.9",
      reviews: "24",
      discount: "19%",
      image: "images/download-removebg-preview 3.svg"
    },
    {
        id: 8,
        name: "مفتاح صواميل كهربائي شحن مع ملحقات",
        price: "2160",
        oldPrice: "2400",
        rating: "4.9",
        reviews: "24",
        discount: "10%",
        image: "images/download-removebg-preview 4.svg"
    },
];

const Brands = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLimitMessage, setShowLimitMessage] = useState(false);

  // حفظ المفضلة في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // إضافة أو إزالة من المفضلة
  const toggleFavorite = (product) => {
    const exists = favorites.find(item => item.id === product.id);
    let updatedFavorites = [];

    if (exists) {
      updatedFavorites = favorites.filter(item => item.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }

    setFavorites(updatedFavorites);
    navigate("/FavoritesPage"); // ينقلك لصفحة المفضلة
  };

  // إضافة للسلة
  const handleAddToCart = (item) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = savedCart.findIndex(i => i.id === item.id);

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

  const filteredBrands = initialBrands.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="brands-page-container">
      {showSuccessMessage && (
        <div className="success-alert">تمت إضافة المنتج إلى السلة</div>
      )}
      {showLimitMessage && (
        <div className="limit-alert">تم الوصول للحد الأقصى 5 قطع لكل منتج</div>
      )}

      <div className="brands-header" data-aos="fade-right">
       <img src="/images/images 1.svg" alt="brands" className="brands-header-icon" data-aos="fade-right" />
      
      </div>

      <section className="search-section" data-aos="fade-right">
        <div className="container">
          <div className="search-wrapper" >
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

      {filteredBrands.length === 0 ? (
        <div className="empty-favorites" data-aos="fade-up">
          <h2>لم يتم العثور على منتجات</h2>
          <p>حاول البحث مرة أخرى أو تصفح المتجر لإختيار منتجات أخرى.</p>
          <button
            onClick={() => navigate("/products")}
            className="back-to-shop-btn"
          >
            العودة إلي المتجر
          </button>
        </div>
      ) : (
        <div className="initialbrands-cards-container" data-aos="fade-up">
          {filteredBrands.map((item) => (
            <div key={item.id} className="initialBrands-card">
              <div className="initialBrands-image">
                <span className="discount">{item.discount}</span>
                <img src={item.image} alt={item.name} />
              </div>

              {/* اسم المنتج + أيقونة القلب على الشمال */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
              
                      <h3 className="initialBrands-title">{item.name}</h3>
                        <FaHeart
                  onClick={() => toggleFavorite(item)}
                  style={{
                    cursor: "pointer",
                      fontSize: "28px",
                      marginRight: "10px",
                    marginTop: "-5px",
                    color: favorites.some(fav => fav.id === item.id)
                      ? "rgb(243, 72, 72)"
                      : "#ccc"
                  }}
                />
              </div>

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
              </div>
            </div>
          ))}
        </div>
          )}
            <button
          onClick={() => navigate("/products")}
          className="hero-back-to-shop-btn"
          data-aos="fade-up"
        >
          العودة إلي المتجر
        </button>
      </div>
      
  );
};

export default Brands;