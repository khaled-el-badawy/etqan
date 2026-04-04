import { useState, useEffect, useRef } from "react";
import "./Products.css";
import { FaShoppingCart, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";

export default function Products() {
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

  const products = [
    {
      id: 1,
      name: "شنيور شحن DeWalt احترافي مع شنطة وبطارية وشاحن ",
      price: "7938",
      oldPrice: "9000",
      rating: "4.9",
      reviews: "24",
      discount: "19%",
      image: "images/download-removebg-preview 3.svg"
    },
    {
      id: 2,
      name: "مفتاح صواميل كهربائي شحن مع ملحقات",
      price: "2160",
      oldPrice: "2400",
      rating: "4.9",
      reviews: "24",
      discount: "10%",
      image: "images/download-removebg-preview 4.svg"
    },
    {
      id: 3,
      name: "طقم مفاتيح إنجليزي احترافي - مقاسات متعددة",
      price: "1050",
      oldPrice: "1500",
      rating: "4.9",
      reviews: "24",
      discount: "30%",
      image: "images/download-removebg-preview 5.svg"
    },
    {
      id: 4,
      name: "طقم زراديات knipex احترافي 3 قطع",
      price: "3240",
      oldPrice: "4000",
      rating: "4.9",
      reviews: "24",
      discount: "19%",
      image: "images/download-removebg-preview 12.svg"
    },
    {
      id: 5,
      name: "طقم شنيور makita متكامل مع شنطة وشاحن ",
      price: "9990",
      oldPrice: "11100",
      rating: "4.9",
      reviews: "24",
      discount: "10%",
      image: "images/download-removebg-preview 13.svg"


    },
    {
      id: 6,
      name: "شنيور فك وربط milwaukee لاسلكي ببطارية ",
      price: "5950",
      oldPrice: "8500",
      rating: "4.9",
      reviews: "24",
      discount: "30%",
      image: "images/download-removebg-preview 14.svg"
    }
  ];

const brands = [
  {id: 1, name: "DeWALT", image: "/images/images 1.svg" },
  {id: 2, name: "Makita", image: "/images/download-removebg-preview (1) 1.svg" },
  {id: 3, name: "Snap-on", image: "/images/download (1) 1.svg" },
  {id: 4, name: "BOSCH", image: "/images/download (12) 1.svg" },
  {id: 5, name: "metabo", image: "/images/download__4_-removebg-preview  1.svg" },
  {id: 6, name: "BAHCO", image: "/images/images (1) 1.svg" },
  {id: 7, name: "KNIPEX", image: "/images/download (1) 2.svg" },
  {id: 8, name: "RYOBI", image: "/images/download__5_-removebg-preview (1) 1.svg" },
  {id: 9, name: "RYOBI", image: "/images/download_-removebg-preview 1.svg" }
  ];

  const offers = [
    { id: 1, name: "شنيور تكسير وتخريم (Rotary Hammer)  ", price: "2310", oldPrice: "4200", rating: "4.9", reviews:"24", discount: "45%", image: "images/download-removebg-preview 6.svg" },
    { id: 2, name: "منشار زاوية كهربائي لقص الخشب والالمنيوم", price: "6440", oldPrice: "9200", rating: "4.9", reviews:"24", discount: "30%", image: "images/download-removebg-preview 7.svg" },
    { id: 3, name: "طقم مفاتيح ربط ثابتة احترافي 12 - 24 قطعة", price: "440", oldPrice: "1100", rating: "4.9", reviews:"24", discount: "60%", image: "images/download-removebg-preview 8.svg" },
    { id: 4, name: "طقم أزاميل خشب احترافي (6 قطع) مع حقيبة وحجر سن  ", price: "377", oldPrice: "650", rating: "4.9", reviews:"24", discount: "42%", image: "images/download-removebg-preview 9.svg" },
    { id: 5, name: "طقم كماشة ومفتاح ربط كنيبكس مع جراب حزام", price: "618", oldPrice: "950", rating: "4.9", reviews:"24", discount: "35%", image: "images/download-removebg-preview 10.svg" },
    { id: 6, name: "منشار أركت يدوي (صغير) مع طقم نصلات احتياطية", price: "125", oldPrice: "250", rating: "4.9", reviews:"24", discount: "50%", image: "images/download-removebg-preview 11.svg" }
  ];

  const bestSellersRef = useRef();
  const scrollBestSellersLeft = () => bestSellersRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollBestSellersRight = () => bestSellersRef.current.scrollBy({ left: 300, behavior: "smooth" });

  // ======== الخريطة ========
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

  const handleOpenMap = () => { setShowMap(true); locateUser(); };

  return (
    <>
      {/* ================= Top Bar ================= */}
      <div className="shop-topbar">
        <div className="topbar-content">
       <div className="topbar-icons">
           <Link to="/CartPage">
             <FaShoppingCart className="icon" />
           </Link>
            <FaHeart className="icon" />
          </div>
          <div className="search-container">
            <input type="text" placeholder="ما الذي تبحث عنه؟" />
          </div>

          <div className="location" onClick={handleOpenMap} style={{ cursor: "pointer" }}>
            <FaMapMarkerAlt className="location-icon" />
            <span>تحديد الموقع</span>
          </div>
        </div>
      </div>

      {/* ================= Map Modal ================= */}
      {showMap && geoLoaded && (
        <div className="map-modal" onClick={() => setShowMap(false)}>
          <div className="map-container" onClick={(e) => e.stopPropagation()}>
            <MapContainer center={position} zoom={15} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
              <Marker position={position} />
            </MapContainer>
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

        {/* ================= Best Sellers Slider ================= */}
        <div className="products-slider-container" data-aos="fade-up">
          <h2 className="section-title" data-aos="fade-right">الأدوات الأكثر مبيعًا</h2>
          <div className="products-slider-wrapper">
            <button className="slider-arrow left" onClick={scrollBestSellersLeft}>❮</button>
            <div className="products-slider" ref={bestSellersRef}>
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="image-wrapper">
                    <span className="discount">{product.discount}</span>
                    <div className="product-image"><img src={product.image} alt="" /></div>
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <div className="price-rating-row">
                    <div className="price-box">
                      <span className="new-price">{product.price} جنيه</span>
                      <span className="old-price">{product.oldPrice}</span>
                    </div>
                    <div className="rating">
                      <span className="star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFBD00" viewBox="0 0 24 24">
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.885 1.516 8.309L12 18.896l-7.452 4.604 1.516-8.309L0 9.306l8.332-1.151z"/>
                        </svg>
                      </span>
                      <span className="rating-number">{product.rating}</span>
                      <span className="reviews">({product.reviews})</span>
                    </div>
                  </div>
                   <div className="products-add-btn">
                            <Link to={`/CartPage`} className="link">إضافة إلى السلة</Link>
                          </div>
                
                </div>
              ))}
            </div>
            <button className="slider-arrow right" onClick={scrollBestSellersRight}>❯</button>
          </div>
        </div>

        {/* ================= Brands ================= */}
        <h2 className="brands-section-title" data-aos="fade-right">تسوق حسب العلامة التجارية</h2>
        <div className="brands" data-aos="fade-up">
          {brands.map((brand, index) => (
            <div key={index} className="brand-box"><img src={brand.image} alt={brand.name} /></div>
          ))}
        </div>

        {/* ================= Offers ================= */}
        <h2 className="offers-section-title" data-aos="fade-right">أفضل العروض والخصومات</h2>
        <div className="offers-slider" data-aos="fade-up">
          {offers.map((offer) => (
            <div key={offer.id} className="offers-card">
              <div className="image-wrapper">
                <span className="discount">{offer.discount}</span>
                <div className="offers-image"><img src={offer.image} alt="" /></div>
              </div>
              <h3 className="offers-title">{offer.name}</h3>
              <div className="price-rating-row">
                <div className="price-box">
                  <span className="new-price">{offer.price} جنيه</span>
                  <span className="old-price">{offer.oldPrice}</span>
                </div>
                <div className="rating">
                  <span className="star">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFBD00" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.885 1.516 8.309L12 18.896l-7.452 4.604 1.516-8.309L0 9.306l8.332-1.151z"/>
                    </svg>
                  </span>
                  <span className="rating-number">{offer.rating}</span>
                  <span className="reviews">({offer.reviews})</span>
                </div>
              </div>
              <div className="offers-add-btn">
                            <Link to={`/CartPage`} className="link">إضافة إلى السلة</Link>
                          </div>
            </div>
          ))}
        </div>

        {/* ================= Pagination ================= */}
        <div className="pagination" data-aos="fade-up">
          <span>{"<"}</span>
          <span>3</span>
          <span>2</span>
          <span className="active">1</span>
          <span>{">"}</span>
        </div>
      </div>
    </>
  );
}