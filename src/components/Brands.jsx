import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Brands.css";
import { FaHeart } from "react-icons/fa";
import { style } from "framer-motion/client";

/* ================= BRANDS CONFIG ================= */
const brandsConfig = {
  Makita: {
    header: "/images/images 1.svg",
    products: [
      {
        id: 1,
        name: "ماكيتا - مثقاب لاسلكي LXT 14.4 فولت، 10 ملم",
        price: 9990,
        oldPrice: 11100,
        discount: "10%",
        rating: 4.8,
        image: "/images/image1.jpg",
      },
      {
        id: 2,
        name: "ماكيتا مفك كفرات لاسلكي 1/2 بوصة،40 فولت",
        price: 5400,
        oldPrice: 6000,
        discount: "10%",
        rating: 4.6,
        image: "/images/makita-img.jpg",
      },

      {
        id: 3,
        name: "جلاخة زاوية ماكيتا 4.5 ملم 840 واط",
        price: 5400,
        oldPrice: 6000,
        discount: "10%",
        rating: 4.6,
        image: "/images/image2.jpg",
      },
      {
        id: 4,
        name: "ماكيتا مطرقة هدم دوارة 240 فولت  ",
        price: 5400,
        oldPrice: 6000,
        discount: "10%",
        rating: 4.6,
        image: "/images/image3.jpg",
      },
          {
        id: 5,
        name: "منشار شريط 12 بوصة 900 وات",
        price: 5400,
        oldPrice: 6000,
        discount: "10%",
        rating: 4.6,
        image: "/images/image4.jpg",
      },
          {
        id: 6,
        name: "طقم من ماكيتا B-49432 متعدد الألوان (18 قطعة)",
        price: 5400,
        oldPrice: 6000,
        discount: "10%",
        rating: 4.6,
        image: "/images/image5.jpg",
      },
          {
        id: 7,
        name: "منشار اركت 450 وات 65 مم ماكيتا روماني اصلي",
        price: 5400,
        oldPrice: 6000,
        discount: "10%",
        rating: 4.6,
        image: "/images/image6.jpg",
      },
          {
        id: 8,
        name: "شنيور ماكيتا بطارية 14.4 فولت 10 مم ",
        price: 5400,
        oldPrice: 6000,
        discount: "10%",
        rating: 4.6,
        image: "/images/image7.jpg",
      },
    ]
  },

  BOSCH: {
    header: "/images/download(4)removebg.svg",
    style: [{ marginTop:"20%"}],
    products: [
      {
        id: 9,
        name: "شنيور كومبي لاسلكي gsb 180-li احترافي 18 فولت ",
        price: 1200,
        oldPrice: 1500,
        discount: "20%",
        rating: 4.9,
        image: "/images/image9.jpg",
      },
      {
        id: 10,
        name: "فارة خشب كهربائية بوش BOSCH 650 واط",
        price: 1200,
        oldPrice: 1500,
        discount: "20%",
        rating: 4.9,
        image: "/images/image10.jpg",
      },
      {
        id: 11,
        name: "صاروخ 9 بوصة 2400 وات ألماني",
        price: 1200,
        oldPrice: 1500,
        discount: "20%",
        rating: 4.9,
        image: "/images/image11.jpg",
      },
      {
        id: 12,
        name: "كونجو بوش 11 كيلو الماني الصنع 1500 واط الكتروني",
        price: 1200,
        oldPrice: 1500,
        discount: "20%",
        rating: 4.9,
        image: "/images/image12.jpg",
      },
      {
        id: 13,
        name: "هيلتي 11 كجم 1500 وات الموديل: BOSCH GSH 11 E",
        price: 1200,
        oldPrice: 1500,
        discount: "20%",
        rating: 4.9,
        image: "/images/image13.jpg",
      },
      {
        id: 14,
        name: "مطرقة آلية موديل GBH 2000 ",
        price: 1200,
        oldPrice: 1500,
        discount: "20%",
        rating: 4.9,
        image: "/images/image14.jpg",
      },
      {
        id: 15,
        name: "شنيور دقاق 570واط ، 13.0 مليميتر، 230.0 فولت",
        price: 1200,
        oldPrice: 1500,
        discount: "20%",
        rating: 4.9,
        image: "/images/image15.jpg",
      },
      {
        id: 16,
        name: "مثقاب مطرقي احترافي GSB 570 لحفر الخشب والخرسانة",
        price: 1200,
        oldPrice: 1500,
        discount: "20%",
        rating: 4.9,
        image: "/images/image16.jpg",
      },
    ]
  },

  DeWALT: {
    header: "/images/download-removebg-preview (1) 1.svg",
    products: [
      {
        id: 17,
        name: "منفاخ هواء متغير السرعة 800 وات ",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image17.jpg",
      },
      {
        id: 18,
        name: "شنيور 16مم 1300 وات موديل D21570K-B5",
        price: 7000,
        oldPrice: 8000,
        discount: "20%",
        rating: 4.9,
        image: "/images/image18.jpg",
      },
      {
        id: 19,
        name: "هيلتي تكسير وتخريم 52 مم 1700 وات   ",
        price: 7000,
        oldPrice: 8000,
        discount: "10%",
        rating: 4.9,
        image: "/images/image19.jpg",
      },
      {
        id: 20,
        name: "منشار ترددي من ديوالت 1100 واط ",
        price: 7000,
        oldPrice: 8000,
        discount: "40%",
        rating: 4.9,
        image: "/images/image20.jpg",
      },
      {
        id: 21,
        name: "ديوالت اللاسلكي شنيور يعمل بالبطارية عدة 20 فولت",
        price: 7000,
        oldPrice: 8000,
        discount: "10%",
        rating: 4.9,
        image: "/images/image21.jpg",
      },
      {
        id: 22,
        name: "صاروخ تلميع سرعة متغيرة 1.67 سم (6/9 بوصة)",
        price: 7000,
        oldPrice: 8000,
        discount: "60%",
        rating: 4.9,
        image: "/images/image22.jpg",
      },
      {
        id: 23,
        name: "منشار ترددي أمامي 1050 وات",
        price: 7000,
        oldPrice: 8000,
        discount: "30%",
        rating: 4.9,
        image: "/images/image23.jpg",
      },
      {
        id: 24,
        name: "موتور ماكينة كور خرسانة 250 مم 2500 وات",
        price: 7000,
        oldPrice: 8000,
        discount: "20%",
        rating: 4.9,
        image: "/images/image24.jpg",
      },
    ]
  },

  Milwaukee: {
    header: "/images/Milwaukee_Logo.svg",
    products: [
      {
        id: 25,
        name: " المثقاب المطرقي اللاسلكي ميلووكي  قياس (13MM)",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image25.jpg",
      },
      {
        id: 26,
        name: "ميلووكي 76 مم ، 12 فولت ، ملمع أداة الطاقة اللاسلكية ",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image26.jpg",
      },
      {
        id: 27,
        name: " دريل شحن فتح وشد وهمر 18 فولت ",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image27.jpg",
      },
      {
        id: 28,
        name: " مقصّ معدني لاسلكي يعمل ببطارية (M18) ",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image28.jpg",
      },
      {
        id: 29,
        name: " صندوق أدوات مقاوم للماء لمثقاب ميلووكي الكهربائي ",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image29.jpg",
      },
      {
        id: 30,
        name: "  مجموعة لقم مفك عزم شديدة التحمل شوك ويف ",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image30.jpg",
      },
      {
        id: 31,
        name: " عودة القاص ميلووكي M18 – 28000 ",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image31.jpg",
      },
      {
        id: 32,
        name: " منشار دائري بدون فرشاة M18 BLCS66-0 190 ملم 18 فولت  ",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image32.jpg",
      },
    ]
  },
  metabo: {
    header: "/images/Metabo_Logo_2024.svg",
    products: [
      {
        id: 33,
        name: " هيلتى تخريم وتكسير 10 كيلو 1500 وات 240 فولت",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image33.jpg",
      },
      {
        id: 34,
        name: "شنيور خرسانات 45 مم 1300 وات",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image34.jpg",
      },
      {
        id: 35,
        name: "منشار اركيت رأسى 140مم 750 وات ميتابو",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image35.jpg",
      },
      {
        id: 36,
        name: "صاروخ ازاله بويات اخشاب 710 وات",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image36.jpg",
      },
      {
        id: 37,
        name: "قلاب بوية سرعات 1600 وات ميتابو",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image37.jpg",
      },
      {
        id: 38,
        name: "مثقاب مغناطيسى 1800 وات ميتابو",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image38.jpg",
      },
      {
        id: 39,
        name: "مسدس شمع 16-200 وات ميتابو",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image39.jpg",
      },
      {
        id: 40,
        name: "صنفرة مستطيل 350 وات ميتابو",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/image40.jpg",
      },
    ]
  },
  Snapon: {
    header: "/images/images (1) 1.svg",
    products: [
      {
        id: 13,
        name: "DeWalt Drill",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/images (1) 1.svg",
      }
    ]
  },
  RYOBI: {
    header: "/images/download (1) 2.svg",
    products: [
      {
        id: 4,
        name: "DeWalt Drill",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/download-removebg-preview (1) 1.svg",
      }
    ]
  },
  KNIPEX: {
    header: "/images/download(5)removebg.svg",
    products: [
      {
        id: 4,
        name: "DeWalt Drill",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/download-removebg-preview (1) 1.svg",
      }
    ]
  },
  BAHCO: {
    header: "/images/download_-removebg-preview 1.svg",
    products: [
      {
        id: 4,
        name: "DeWalt Drill",
        price: 7000,
        oldPrice: 8000,
        discount: "12%",
        rating: 4.9,
        image: "/images/download-removebg-preview (1) 1.svg",
      }
    ]
  },
};

const Brands = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= SELECT BRAND ================= */
const selectedBrand = location.state?.brand;

const brandData = selectedBrand ? brandsConfig[selectedBrand] : null;

const brandProducts = brandData?.products || [];

  /* ================= FAVORITES ================= */
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    const exists = favorites.find((f) => f.id === item.id);

    const updated = exists
      ? favorites.filter((f) => f.id !== item.id)
      : [...favorites, item];

    setFavorites(updated);
  };

  /* ================= CART ================= */
  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      if (cart[index].quantity >= 5) return;
      cart[index].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/CartPage");
  };

  /* ================= AVG RATING ================= */
  const averageRating =
    brandProducts.length > 0
      ? brandProducts.reduce((sum, i) => sum + Number(i.rating), 0) /
        brandProducts.length
      : 0;
if (!brandData) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      ⚠️ لم يتم العثور على البراند
    </div>
  );
}
  return (
    <div className="brands-page-container">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/products")}
        className="back-to-shop-btn"
      >
        العودة إلي المتجر
      </button>

      {/* HEADER (نفس الديزاين بالظبط) */}
      <div className="brands-header">
        <img
          src={brandData.header}
          className="brands-header-icon"
          alt="brand"
        />

        <div className="stats">
          <span>⚒️ +{brandProducts.length} عدد المنتجات</span>
          <span>🔥 خصومات تصل إلى 60%</span>
          <span>⭐ {averageRating.toFixed(1)} تقييمات</span>
        </div>
      </div>

      {/* SEARCH (بدون تغيير) */}
      <section className="search-section">
        <div className="container">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="ابحث عن المنتج"
            />
          </div>
        </div>
      </section>

      {/* CARDS (نفس التصميم تمامًا) */}
      <div className="initialbrands-cards-container">

        {brandProducts.map((item) => (
          <div key={item.id} className="initialBrands-card">

            <div className="initialBrands-image">
              <span className="discount">{item.discount}</span>
              <img src={item.image} alt={item.name} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <h3 className="initialBrands-title">{item.name}</h3>

              <FaHeart
                onClick={() => toggleFavorite(item)}
                style={{
                  cursor: "pointer",
                  fontSize: "28px",
                  marginRight: "10px",
                  color: favorites.some((f) => f.id === item.id)
                    ? "rgb(243, 72, 72)"
                    : "#ccc",
                }}
              />
            </div>

            <div className="price-rating-row">
              <div className="price-box">
                <span className="new-price">{item.price} جنيه</span>
                <span className="old-price">{item.oldPrice} جنيه</span>
              </div>

              <div className="rating">
                ⭐ {item.rating}
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
    </div>
  );
};

export default Brands;