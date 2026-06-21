import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // أضفنا axios فقط للربط
import "./Products.css";
import {
  FaShoppingCart,
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import "leaflet/dist/leaflet.css";

export default function Products() {
  const navigate = useNavigate();

  // 1. السلايدر والماركات (ثابتين كما طلبت)
  const slides = [
    { id: 1, image: "/images/Frame 382.svg" },
    { id: 2, image: "/images/Frame 384.svg" },
    { id: 3, image: "/images/Frame 427320645.svg" },
  ];

  const brands = [
    { id: 1, name: "Makita", image: "/images/images 1.svg" },
    {
      id: 2,
      name: "DeWALT",
      image: "/images/download-removebg-preview (1) 1.svg",
    },
    { id: 3, name: "Milwaukee", image: "/images/Milwaukee_Logo.svg" },
    { id: 4, name: "metabo", image: "/images/Metabo_Logo_2024.svg" },
    { id: 5, name: "BOSCH", image: "/images/download(4)removebg.svg" },
    { id: 6, name: "Snapon", image: "/images/images (1) 1.svg" },
    { id: 7, name: "RYOBI", image: "/images/download (1) 2.svg" },
    { id: 8, name: "KNIPEX", image: "/images/download(5)removebg.svg" },
    { id: 9, name: "BAHCO", image: "/images/download_-removebg-preview 1.svg" },
  ];

  // 2. تحويل المنتجات والعروض لـ States عشان نستقبل داتا الـ API
  const [products, setProducts] = useState([]); // الأكثر مبيعاً
  const [offers, setOffers] = useState([]); // العروض
  const [loading, setLoading] = useState(true);

  // 3. ميثود جلب البيانات (الربط الحقيقي)
  const fetchData = async () => {
    try {
      // نداء الـ Endpoints اللي عملناها في الكنترولر
      const [bestRes, offersRes] = await Promise.all([
        axios.get("https://etqanproject.runasp.net/api/Products/best-sellers"),
        axios.get("https://etqanproject.runasp.net/api/Products/offers"),
      ]);

      // تحويل الداتا لتناسب أسماء المتغيرات في تصميمك (image بدلاً من urlImage)
      const mapProduct = (item) => ({
        ...item,
        image: item.urlImage || "images/default.png", // الربط مع DTO الباك-إند
        rating: item.rating || "0",
      });

      setProducts(bestRes.data.map(mapProduct));
      setOffers(offersRes.data.map(mapProduct));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchData(); // جلب الداتا عند تحميل الصفحة
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- نفس بقية الـ States والـ Logics بتاعتك بالظبط بدون تغيير حرف ---
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const bestSellersRef = useRef();
  const offersRef = useRef();
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState([30.0444, 31.2357]);

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.log("خطأ في تحديد الموقع:", err);
        },
      );
    }
  };

  const handleOpenMap = () => {
    locateUser();
    setShowMap(true);
  };

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showLimitMessage, setShowLimitMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product) => {
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = savedCart.findIndex(
      (item) => item.id === product.id,
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
    const exists = updatedFavorites.find((item) => item.id === product.id);
    if (exists) {
      updatedFavorites = updatedFavorites.filter(
        (item) => item.id !== product.id,
      );
    } else {
      updatedFavorites.push(product);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // الفلترة بناءً على البحث والداتا الحقيقية
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredOffers = offers.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      {showSuccessMessage && (
        <div className="success-alert-products">تمت إضافة المنتج إلى السلة</div>
      )}

      {showLimitMessage && (
        <div className="limit-alert">تم الوصول للحد الأقصى 5 قطع لكل منتج</div>
      )}

      {/* ================= Top Bar (تصميمك الأصلي) ================= */}
      <div className="shop-topbar">
        <div className="topbar-content">
          <div className="topbar-icons">
            <FaShoppingCart
              onClick={() => navigate("/CartPage")}
              style={{
                cursor: "pointer",
                fontSize: "28px",
                color: cart.length > 0 ? "#40798c" : "#ccc",
              }}
            />
            <FaHeart
              onClick={() => navigate("/FavoritesPage")}
              style={{
                cursor: "pointer",
                fontSize: "28px",
                color: favorites.length > 0 ? "rgb(243, 72, 72)" : "#ccc",
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
            >
              <span>تحديد الموقع</span>
              <FaMapMarkerAlt />
            </div>
          </div>
        </div>
      </div>

      {/* ================= Map Modal (تصميمك الأصلي) ================= */}
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
            style={{
              width: "90%",
              maxWidth: "700px",
              height: "450px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
            }}
          >
            <iframe
              title="map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={`http://maps.google.com/maps?q=${position[0]},${position[1]}&z=17&output=embed`}
            ></iframe>
          </div>
        </div>
      )}

      <div className="products-page-container">
        {/* ================= Slider (تصميمك الأصلي) ================= */}
        <div className="slider" data-aos="fade-up">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={index === current ? "slide active" : "slide"}
            >
              <img src={slide.image} alt="slider" />
            </div>
          ))}
        </div>

        {/* ================= Best Sellers (تصميمك الأصلي مع داتا الـ API) ================= */}
        {filteredProducts.length > 0 && (
          <div className="products-slider-container" data-aos="fade-up">
            <h2 className="section-title" data-aos="fade-right">
              الأدوات الأكثر مبيعًا
            </h2>
            <div className="products-slider-wrapper">
              <button
                className="slider-arrow left"
                onClick={() =>
                  bestSellersRef.current.scrollBy({
                    left: -300,
                    behavior: "smooth",
                  })
                }
              >
                ❮
              </button>
              <div className="products-slider" ref={bestSellersRef}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() =>
                      navigate("/ProductsDetails", {
                        state: { product: product },
                      })
                    }
                  >
                    <div className="image-wrapper">
                      <span className="discount">{product.discount}</span>
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3 className="product-title" style={{ margin: 0 }}>
                        {product.name}
                      </h3>
                      <FaHeart
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product);
                        }}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          marginTop: "-15px",
                          color: favorites.some(
                            (item) => item.id === product.id,
                          )
                            ? "rgb(243, 72, 72)"
                            : "#ccc",
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
                      <button
                        className="link"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        إضافة إلى السلة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="slider-arrow right"
                onClick={() =>
                  bestSellersRef.current.scrollBy({
                    left: 300,
                    behavior: "smooth",
                  })
                }
              >
                ❯
              </button>
            </div>
          </div>
        )}

        {/* ================= Brands (ثابتة كما طلبت) ================= */}
        <h2 className="brands-section-title" data-aos="fade-right">
          تسوق حسب العلامة التجارية
        </h2>
        <div className="brands" data-aos="fade-up">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="brand-box"
              onClick={() =>
                navigate("/Brands", { state: { brand: brand.name } })
              }
              style={{ cursor: "pointer" }}
            >
              <img src={brand.image} alt={brand.name} />
            </div>
          ))}
        </div>

        {/* ================= Offers (تصميمك الأصلي مع داتا الـ API) ================= */}
        {filteredOffers.length > 0 && (
          <>
            <h2 className="offers-section-title" data-aos="fade-right">
              أفضل العروض والخصومات
            </h2>
            <div className="offers-slider" data-aos="fade-up">
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="offers-card"
                  onClick={() =>
                    navigate("/ProductsDetails", { state: { product: offer } })
                  }
                >
                  <div className="image-wrapper">
                    <span className="discount">{offer.discount}</span>
                    <div className="offers-image">
                      <img src={offer.image} alt={offer.name} />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3 className="product-title" style={{ margin: 0 }}>
                      {offer.name}
                    </h3>
                    <FaHeart
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(offer);
                      }}
                      style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        marginTop: "-15px",
                        color: favorites.some((item) => item.id === offer.id)
                          ? "rgb(243, 72, 72)"
                          : "#ccc",
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
                    <button
                      className="link"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(offer);
                      }}
                    >
                      إضافة إلى السلة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= No Results ================= */}
        {filteredProducts.length === 0 &&
          filteredOffers.length === 0 &&
          !loading && <div className="no-results-message">لا توجد نتائج</div>}
      </div>
    </>
  );
}
