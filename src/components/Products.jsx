import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Products.css";
import { FaShoppingCart, FaHeart, FaMapMarkerAlt,FaStar } from "react-icons/fa";
import 'leaflet/dist/leaflet.css';
export default function Products() {
  const navigate = useNavigate();

  const slides = [
    { id: 1, image: "/images/Frame 382.svg" },
    { id: 2, image: "/images/Frame 384.svg" },
    { id: 3, image: "/images/Frame 427320645.svg" }
  ];
  
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});

  const products = [
    { id: 1, name: "شنيور شحن DeWalt احترافي مع شنطة وبطارية وشاحن ", price: "7938", oldPrice: "9000", rating: "4.9",  discount: "19%", image: "images/download-removebg-preview 3.svg" },
    { id: 2, name: "مفتاح صواميل كهربائي شحن مع ملحقات", price: "2160", oldPrice: "2400", rating: "4.9",  discount: "10%", image: "images/download-removebg-preview 4.svg" },
    { id: 3, name: "طقم مفاتيح إنجليزي احترافي - مقاسات متعددة", price: "1050", oldPrice: "1500", rating: "4.9",  discount: "30%", image: "images/download-removebg-preview 5.svg" },
    { id: 4, name: "طقم زراديات knipex احترافي 3 قطع", price: "3240", oldPrice: "4000", rating: "4.9",  discount: "19%", image: "images/download-removebg-preview 12.svg" },
    { id: 5, name: "طقم شنيور makita متكامل مع شنطة وشاحن ", price: "9990", oldPrice: "11100", rating: "4.9",  discount: "10%", image: "images/download-removebg-preview 13.svg" },
    { id: 6, name: "شنيور فك وربط milwaukee لاسلكي ببطارية ", price: "5950", oldPrice: "8500", rating: "4.9",  discount: "30%", image: "images/download-removebg-preview 14.svg" }
  ];

  const offers = [
    { id: 7, name: "شنيور تكسير وتخريم (Rotary Hammer)", price: "2310", oldPrice: "4200", rating: "4.9",  discount: "45%", image: "images/download-removebg-preview 6.svg" },
    { id: 8, name: "منشار زاوية كهربائي لقص الخشب والالمنيوم", price: "6440", oldPrice: "9200", rating: "4.9", discount: "30%", image: "images/download-removebg-preview 7.svg" },
    { id: 9, name: "طقم مفاتيح ربط ثابتة احترافي 12 - 24 قطعة", price: "440", oldPrice: "1100", rating: "4.9",  discount: "60%", image: "images/download-removebg-preview 8.svg" },
    { id: 10, name: "طقم أزاميل خشب احترافي (6 قطع) مع حقيبة وحجر سن", price: "377", oldPrice: "650", rating: "4.9",  discount: "42%", image: "images/download-removebg-preview 9.svg" },
    { id: 11, name: "طقم كماشة ومفتاح ربط كنيبكس مع جراب حزام", price: "618", oldPrice: "950", rating: "4.9",  discount: "35%", image: "images/download-removebg-preview 10.svg" },
    { id: 12, name: "منشار أركت يدوي (صغير) مع طقم نصلات احتياطية", price: "125", oldPrice: "250", rating: "4.9",  discount: "50%", image: "images/download-removebg-preview 11.svg" }
  ];

  const brands = [
    {id: 1, name: "Makita", image: "/images/images 1.svg" },
    {id: 2, name: "DeWALT", image: "/images/download-removebg-preview (1) 1.svg" },
    {id: 3, name: "Milwaukee", image: "/images/Milwaukee_Logo.svg" },
    {id: 4, name: "metabo", image: "/images/Metabo_Logo_2024.svg" },
    {id: 5, name: "BOSCH", image: "/images/download(4)removebg.svg" },
    {id: 6, name: "Snapon", image: "/images/images (1) 1.svg" },
    {id: 7, name: "RYOBI", image: "/images/download (1) 2.svg" },
    {id: 8, name: "KNIPEX", image: "/images/download(5)removebg.svg" },
    {id: 9, name: "BAHCO", image: "/images/download_-removebg-preview 1.svg" }
  ];

  const bestSellersRef = useRef();
  const offersRef = useRef();

  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState([30.0444, 31.2357]); 
  const [geoLoaded, setGeoLoaded] = useState(false);

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { setPosition([pos.coords.latitude, pos.coords.longitude]); setGeoLoaded(true); },
        (err) => { console.log("خطأ في تحديد الموقع:", err); setGeoLoaded(true); }
      );
    } else { console.log("المتصفح لا يدعم تحديد الموقع"); setGeoLoaded(true); }
  };

  const handleOpenMap = () => { locateUser(); setShowMap(true); };

  // ================== السلة ==================
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showLimitMessage, setShowLimitMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [rateMessage, setRateMessage] = useState("");


  const handleSubmitRate = () => {
  setRateMessage("تم إرسال التقييم بنجاح شكراً لمساهمتك");

  setTimeout(() => {
    setRateMessage("");
  }, 2000);

  setProductName("");
  setSelectedRating(0);
  setShowRateModal(false);
};
  const addToCart = (product) => {
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = savedCart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      if (savedCart[existingItemIndex].quantity >= 5) {
        setShowLimitMessage(true);
        setTimeout(() => setShowLimitMessage(false), 3000);
        return;
      } else {
        savedCart[existingItemIndex].quantity += 1;
      }
    } else {
      savedCart.push({ ...product, quantity: 1 });
    }

    setCart(savedCart);
    localStorage.setItem("cart", JSON.stringify(savedCart));

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
    setTimeout(() => navigate("/CartPage"), 2000);
  };

  const toggleFavorite = (product) => {
  let updatedFavorites = [...favorites];

  const exists = updatedFavorites.find(item => item.id === product.id);

  if (exists) {
    updatedFavorites = updatedFavorites.filter(item => item.id !== product.id);
  } else {
    updatedFavorites.push(product);
  }

  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

  // ================== فلترة البحث ==================
  const filteredProducts = [...products, ...offers].filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [showRateModal, setShowRateModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
const isFormValid = productName.trim() !== "" && selectedRating !== 0;
    const renderStars = () => (
    <div className="stars-row">
      {[1,2,3,4,5].map(star => (
        <FaStar
          key={star}
          onClick={() => setSelectedRating(star)}
          style={{
            cursor: "pointer",
            color: star <= selectedRating ? "#F9CF01" : "#ccc",
            fontSize: "24px"
          }}
        />
      ))}
        
      </div>
      
  );

  return (
    <>
      {rateMessage && (
  <div className="success-alert">
    {rateMessage}
  </div>
)}
      {showSuccessMessage && (
        <div className="success-alert">تمت إضافة المنتج إلى السلة</div>
      )}

      {showLimitMessage && (
        <div className="limit-alert">تم الوصول للحد الأقصى 5 قطع لكل منتج</div>
      )}

      {/* ================= Top Bar ================= */}
      <div className="shop-topbar">
        <div className="topbar-content">
          <div className="topbar-icons">
            <FaShoppingCart
  onClick={() => navigate("/CartPage")}
  style={{
    cursor: "pointer",
    fontSize: "28px",
    color: cart.length > 0 ? "#40798c" : "#ccc"
  }}
/>
            <FaHeart
  onClick={() => navigate("/FavoritesPage")}
  style={{
    cursor: "pointer",
    fontSize: "28px",
    color: favorites.length > 0 ? "rgb(243, 72, 72)" : "#ccc"
  }}
/>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="ما الذي تبحث عنه؟"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
<div className="topbar-actions">
  
  <div
    className="map-ping"
    onClick={handleOpenMap}
    style={{
      display: "inline-flex",
      alignItems: "center",
      cursor: "pointer",
      color: "#555",
      fontSize: "20px",
    }}
    onMouseEnter={(e) => e.currentTarget.style.color = "#40798c"}
    onMouseLeave={(e) => e.currentTarget.style.color = "#555"}
  >
    <span>تحديد الموقع</span>
    <FaMapMarkerAlt />
  </div>

  <button
    className="rating-btn"
    onClick={() => setShowRateModal(true)}
  >
    تقييم المنتج
  </button>
</div>
</div>
      </div>
    {/* ================= ⭐ MODAL ================= */}
{showRateModal && (
  <div
    className="modal-overlay"
    onClick={(e) => {
      if (e.target === e.currentTarget) setShowRateModal(false);
    }}
  >
    <div className="modal-box">

      <button className="close-btn" onClick={() => setShowRateModal(false)}>×</button>

            <h3>تقييم المنتج</h3>
            
  {renderStars() }
      <input
        type="text"
              placeholder="اكتب اسم المنتج"
              required
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

    

      

  <button
  className="submit-btn"
              disabled={!isFormValid}
               style={{ opacity: !isFormValid ? 0.5 : 1 }}
      onClick={handleSubmitRate}
>
  إرسال
</button>

    </div>
  </div>
)}

      {/* ================= Map Modal ================= */}
   {showMap && (
  <div 
    className="map-overlay"
    onClick={(e) => {
      if (e.target === e.currentTarget) setShowMap(false);
    }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div 
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "90%",
        maxWidth: "700px",
        height: "450px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
      }}
    >
      <iframe
        title="map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
       src={`https://maps.google.com/maps?q=${position[0]},${position[1]}&z=17&output=embed`}
></iframe>
    </div>
  </div>
)}

      <div className="products-page-container">
        {/* ================= Slider ================= */}
        <div className="slider" data-aos="fade-up">
          {slides.map((slide, index) => (
            <div key={slide.id} className={index === current ? "slide active" : "slide"}>
              <img src={slide.image} alt="slider" />
            </div>
          ))}
        </div>

        {/* ================= Best Sellers ================= */}
        {filteredProducts.filter(p => products.some(prod => prod.id === p.id)).length > 0 && (
          <div className="products-slider-container" data-aos="fade-up">
            <h2 className="section-title" data-aos="fade-right">الأدوات الأكثر مبيعًا</h2>
            <div className="products-slider-wrapper">
              <button className="slider-arrow left" onClick={() => bestSellersRef.current.scrollBy({ left: -300, behavior: "smooth" })}>❮</button>
              <div className="products-slider" ref={bestSellersRef}>
                {filteredProducts.filter(p => products.some(prod => prod.id === p.id)).map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="image-wrapper">
                      <span className="discount">{product.discount}</span>
                      <div className="product-image"><img src={product.image} alt={product.name} /></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 className="product-title" style={{ margin: 0 }}>
                               {product.name}
                            </h3>
                     <FaHeart
                        onClick={() => {
                          toggleFavorite(product);
                          // navigate("/FavoritesPage");
                        }}
                               style={{
                                 cursor: "pointer",
                                 fontSize: "24px",
                                 marginTop: "-15px",
                           color: favorites.some(item => item.id === product.id) ? "rgb(243, 72, 72)" : "#ccc"
                               }}
                              />
                           
                            </div>
                    
                    <div className="price-rating-row">
                      <div className="price-box">
                        <span className="new-price">{product.price} جنيه</span>
                        <span className="old-price">{product.oldPrice}</span>
                      </div>
                      <div className="rating">⭐ {product.rating}</div>
                    </div>
                    <div className="products-add-btn">
                      <button className="link" onClick={() => addToCart(product)}>إضافة إلى السلة</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="slider-arrow right" onClick={() => bestSellersRef.current.scrollBy({ left: 300, behavior: "smooth" })}>❯</button>
            </div>
          </div>
        )}

        {/* ================= Brands ================= */}
        <h2 className="brands-section-title" data-aos="fade-right">تسوق حسب العلامة التجارية</h2>
        <div className="brands" data-aos="fade-up">
          {brands.map((brand, index) => (
            <div
              
  key={index}
  className="brand-box"
  onClick={() => navigate("/Brands",{ state: { brand: brand.name } })}
  style={{ cursor: "pointer" }}
>
  <img src={brand.image} alt={brand.name} />
</div>
          ))}
        </div>

        {/* ================= Offers ================= */}
        {filteredProducts.filter(p => offers.some(offer => offer.id === p.id)).length > 0 && (
          <>
            <h2 className="offers-section-title" data-aos="fade-right">أفضل العروض والخصومات</h2>
            <div className="offers-slider" data-aos="fade-up">
              {filteredProducts.filter(p => offers.some(offer => offer.id === p.id)).map((offer) => (
                <div key={offer.id} className="offers-card">
                  <div className="image-wrapper">
                    <span className="discount">{offer.discount}</span>
                    <div className="offers-image"><img src={offer.image} alt={offer.name} /></div>
                  </div>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 className="product-title" style={{ margin: 0 }}>
                               {offer.name}
                            </h3>
                     <FaHeart
                      onClick={() => {
                        toggleFavorite(offer);
                        // navigate("/FavoritesPage");
                      }}
                               style={{
                                 cursor: "pointer",
                                 fontSize: "24px",
                                 marginTop: "-15px",
                           color: favorites.some(item => item.id === offer.id) ? "rgb(243, 72, 72)" : "#ccc"
                               }}
                              />
                           
                            </div>
                  <div className="price-rating-row">
                    <div className="price-box">
                      <span className="new-price">{offer.price} جنيه</span>
                      <span className="old-price">{offer.oldPrice}</span>
                    </div>
                    <div className="rating">⭐ {offer.rating} </div>
                  </div>
                  <div className="offers-add-btn">
                    <button className="link" onClick={() => addToCart(offer)}>إضافة إلى السلة</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= No Results ================= */}
        {filteredProducts.length === 0 && (
          <div className="no-results-message">لا توجد نتائج</div>
        )}

      </div>
    </>
  );
}