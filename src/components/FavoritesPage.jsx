/* eslint-disable no-unused-vars */
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
    image: "/images/product1.png",
  },
  {
    id: 2,
    name: "منتج 2",
    price: 200,
    oldPrice: 250,
    discount: "-20%",
    rating: 4.8,
    image: "/images/product2.png",
  },
  {
    id: 3,
    name: "منتج 3",
    price: 300,
    oldPrice: 350,
    discount: "-15%",
    rating: 4.2,
    image: "/images/product3.png",
  },
  {
    id: 4,
    name: "منتج 4",
    price: 150,
    oldPrice: 180,
    discount: "-15%",
    rating: 4.0,
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
<<<<<<< HEAD
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

    if (!sessionStorage.getItem("cameFromFavorites")) {
      sessionStorage.setItem("cameFromFavorites", "true");

      setTimeout(() => {
        navigate("/CartPage");
      }, 2000);
    }
  };
=======
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

  if (!sessionStorage.getItem("cameFromFavorites")) {
    sessionStorage.setItem("cameFromFavorites", "true");

    setTimeout(() => {
      navigate("/CartPage");
    }, 2000);
  }
};
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

  const filteredFavorites = favorites.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

<<<<<<< HEAD
  return (
    <div className="favorites-page-container">

      {showSuccessMessage && (
        <div className="favorites-page-success-alert" >
          تمت إضافة المنتج إلى السلة
        </div>
      )}

      {showLimitMessage && (
        <div className="limit-alert" >
          تم الوصول للحد الأقصى 5 قطع لكل منتج
        </div>
      )}

      {/* لو المفضلة فاضية */}
      {favorites.length === 0 ? (
        <div className="empty-favorites" data-aos="fade-up">
          <h2>لم يتم حفظ أي منتجات بعد</h2>
          <p>يمكنك إضافة المنتجات التي تهمك إلى المفضلة للرجوع إليها في أي وقت أثناء التسوق</p>
          <button
            onClick={() => navigate("/products")}
            className="back-to-shop-btn"
          >
            ابدأ التسوق
          </button>
        </div>
      ) : (
        <>
          {/* الهيدر */}
          <div className="fav-header" >



            {/* الصورة */}
            <div className="fav-image" data-aos="fade-right">
              <img src="/images/tools.png" alt="tools" />
            </div>
            {/* النص */}
            <div className="fav-text" data-aos="fade-left">



              <h1>
                إدارة اختياراتك بعناية
              </h1>

              <p>
                قم بمراجعة المنتجات التي اخترتها، أضف ما تحتاجه إلى السلة
                <br />
                أو احذف غير المرغوب مع تنظيم واضح يساعدك على اتخاذ قرار الشراء بثقة
              </p>

              <div className="buttons">
                <button
                  className="btn-primary"
                  onClick={() => {
                    favorites.forEach((item) => handleAddToCart(item));
                    setTimeout(() => navigate("/CartPage"), 2000);
                  }}
                >
                  إضافة الكل إلى السلة
                </button>

                <button
                  className="btn-outline"
                  onClick={() => navigate("/products")}
                >
                  متابعة التسوق
                </button>
              </div>

              <div className="stats">
                <span>❤️ {favorites.length} منتجات</span>
                <span>🔥 خصومات تصل إلى 60%</span>
                <span>⭐ تقييمات عالية</span>
              </div>

            </div>



          </div>


          {/* السيرش */}
          <section className="search-section" data-aos="fade-up">
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

          {/* الكاردات */}
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
                    ⭐ {item.rating}
                  </div>
                </div>

                <div className="cart-actions">
                  <button
                    className="add-cart-btn"
                    onClick={() => {
                      handleAddToCart(item);
                      navigate("/CartPage");
                    }}
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
        </>
      )}
    </div>
  );
=======
 return (
  <div className="favorites-page-container">

    {showSuccessMessage && (
      <div className="favorites-page-success-alert" >
        تمت إضافة المنتج إلى السلة
      </div>
    )}

    {showLimitMessage && (
      <div className="limit-alert" >
        تم الوصول للحد الأقصى 5 قطع لكل منتج
      </div>
    )}

    {/* لو المفضلة فاضية */}
    {favorites.length === 0 ? (
      <div className="empty-favorites" data-aos="fade-up">
        <h2>لم يتم حفظ أي منتجات بعد</h2>
        <p>يمكنك إضافة المنتجات التي تهمك إلى المفضلة للرجوع إليها في أي وقت أثناء التسوق</p>
        <button
          onClick={() => navigate("/products")}
          className="back-to-shop-btn"
        >
          ابدأ التسوق
        </button>
      </div>
    ) : (
      <>
        {/* الهيدر */}
<div className="fav-header" >


           
                {/* الصورة */}
             <div className="fav-image" data-aos="fade-right">
      <img src="/images/tools.png" alt="tools" />
             </div>
             {/* النص */}
    <div className="fav-text" data-aos="fade-left">

      

      <h1>
        إدارة اختياراتك بعناية
      </h1>

      <p>
       قم بمراجعة المنتجات التي اخترتها، أضف ما تحتاجه إلى السلة
            <br />
            أو احذف غير المرغوب مع تنظيم واضح يساعدك على اتخاذ قرار الشراء بثقة
      </p>

      <div className="buttons">
        <button
          className="btn-primary"
          onClick={() => {
            favorites.forEach((item) => handleAddToCart(item));
            setTimeout(() => navigate("/CartPage"), 2000);
          }}
        >
          إضافة الكل إلى السلة
        </button>

        <button
          className="btn-outline"
          onClick={() => navigate("/products")}
        >
          متابعة التسوق
        </button>
      </div>

      <div className="stats">
        <span>❤️ {favorites.length} منتجات</span>
        <span>🔥 خصومات تصل إلى 60%</span>
        <span>⭐ تقييمات عالية</span>
      </div>

    </div>

 

  </div>


        {/* السيرش */}
        <section className="search-section" data-aos="fade-up">
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

        {/* الكاردات */}
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
                  ⭐ {item.rating}
                </div>
              </div>

              <div className="cart-actions">
                <button
                  className="add-cart-btn"
                  onClick={() => {
                    handleAddToCart(item);
                    navigate("/CartPage");
                  }}
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
      </>
    )}
  </div>
);
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
};

export default FavoritesPage;