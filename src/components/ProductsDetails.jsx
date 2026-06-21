import React, { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";
=======
import { useLocation, useNavigate } from "react-router-dom"; 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
import "./ProductsDetails.css";

export default function ProductDetails() {
  const location = useLocation();
<<<<<<< HEAD
  const navigate = useNavigate();
=======
  const navigate = useNavigate(); 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const productFromStore = location.state?.product;
  const [selectedImage, setSelectedImage] = useState(0);
  const [userName, setUserName] = useState("");
  const [showRateModal, setShowRateModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [rateMessage, setRateMessage] = useState("");

<<<<<<< HEAD
  const product = {
=======
const product = {
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    id: productFromStore?.id || 1,
    name: productFromStore?.name || "مثقاب ماكيتا اللاسلكي - Makita",
    brand: "Makita Professional",
    price: productFromStore?.price || 1200,
    oldPrice: productFromStore?.oldPrice,
<<<<<<< HEAD
    discount: productFromStore?.discount,
    description: productFromStore?.description || `مثقاب لاسلكي عالي الأداء من ماكيتا، مثالي للاستخدام في الأعمال الخفيفة والمتوسطة.
=======
    discount: productFromStore?.discount, 
  description: productFromStore?.description || `مثقاب لاسلكي عالي الأداء من ماكيتا، مثالي للاستخدام في الأعمال الخفيفة والمتوسطة.
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
     يتميز بمحرك قوي وبطارية طويلة العمر لتوفير أداء مستمر وفعال.
     تصميم مريح لسهولة الاستخدام والتحكم،
      مع مجموعة من السرعات وخيارات الحفر المتعددة لتلبية جميع احتياجاتك في العمل.`,
    stock: 5,
    rating: productFromStore?.rating || 4.0,
<<<<<<< HEAD
    images: productFromStore?.image
      ? [productFromStore.image, "/images/img11.jpg", "/images/img12.jpg"]
      : ["/images/image1.jpg", "/images/img11.jpg", "/images/img12.jpg"]
  };


  const addToCart = () => {
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = savedCart.findIndex(item => item.id === product.id);

=======
    images: productFromStore?.image 
        ? [productFromStore.image, "/images/img11.jpg", "/images/img12.jpg"]
        : ["/images/image1.jpg", "/images/img11.jpg", "/images/img12.jpg"]
};

 
  const addToCart = () => {
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = savedCart.findIndex(item => item.id === product.id);
    
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    if (itemIndex !== -1) {
      savedCart[itemIndex].quantity += 1;
    } else {
      savedCart.push({ ...product, quantity: 1, image: product.images[0] });
    }
<<<<<<< HEAD

    localStorage.setItem("cart", JSON.stringify(savedCart));

=======
    
    localStorage.setItem("cart", JSON.stringify(savedCart));
    
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    navigate("/CartPage");
  };


  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const isFavorite = favorites.some(fav => fav.id === product.id);
<<<<<<< HEAD

=======
  
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const toggleFavorite = () => {
    let updatedFavs = [...favorites];
    if (isFavorite) {
      updatedFavs = updatedFavs.filter(fav => fav.id !== product.id);
    } else {
      updatedFavs.push({ ...product, image: product.images[0] });
    }
    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  const ratingDistribution = [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  const comments = [
<<<<<<< HEAD
    {
      id: 1,
      user: "أحمد فتحي",
      date: "1/5/2026",
      text: "منتج كويس جدا وماتريال تستحمل الشغل",
      rating: 4,
      userImg: "http://ui-avatars.com/api/?name=Ahmed+Fathy&background=40798C&color=fff"
    },
    {
      id: 2,
      user: "محمد ياسر",
      date: "10/6/2026",
      text: "منتج كويس جدا",
      rating: 4,
      userImg: "http://ui-avatars.com/api/?name=Mohamed+Yasser&background=E91E63&color=fff"
    },
    {
      id: 3,
      user: "ممدوح سامي",
      date: "1/7/2026",
      text: "عجبني منتج كويس جدا",
      rating: 4,
      userImg: "http://ui-avatars.com/api/?name=Mamdouh+Samy&background=FF9800&color=fff"
=======
    { 
      id: 1, 
      user: "أحمد فتحي", 
      date: "1/5/2026",
      text: "منتج كويس جدا وماتريال تستحمل الشغل", 
      rating: 4,
      userImg: "https://ui-avatars.com/api/?name=Ahmed+Fathy&background=40798C&color=fff" 
    },
    { 
      id: 2, 
      user: "محمد ياسر", 
      date: "10/6/2026",
      text: "منتج كويس جدا", 
      rating: 4,
      userImg: "https://ui-avatars.com/api/?name=Mohamed+Yasser&background=E91E63&color=fff" 
    },
    { 
      id: 3, 
      user: "ممدوح سامي", 
      date: "1/7/2026",
      text: "عجبني منتج كويس جدا", 
      rating: 4,
      userImg: "https://ui-avatars.com/api/?name=Mamdouh+Samy&background=FF9800&color=fff" 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    },
  ];

  const isFormValid = selectedRating > 0 && userName.trim() !== "" && commentText.trim() !== "";

  const handleSubmitRate = () => {
    if (!isFormValid) return;
    setRateMessage("تم إرسال التقييم بنجاح شكراً لمساهمتك");
    setTimeout(() => {
      setRateMessage("");
      setShowRateModal(false);
      setSelectedRating(0);
      setCommentText("");
      setUserName("");
    }, 2000);
  };

  return (
    <div className="product-container">
      <div className="product-grid" data-aos="fade-up">
        <div className="product-images-left">
          <img src={product.images[selectedImage]} alt="main product" className="main-image" />
          <div className="thumbnail-container">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(i)}
                className={`thumbnail ${selectedImage === i ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="product-info-right">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-brand">الشركة المصنعة: {product.brand}</p>
          <div className="rating">
            <FaStar className="rating-icon" />
            <span>{product.rating}</span>
            <span className="rating-count"> (120 تقييم)</span>
          </div>
          <div className="price-box">
            <h3 className="price">{product.price.toLocaleString()} EGP</h3>
          </div>
          <div className="stock">
            {product.stock > 0 ? <span className="in-stock">✓ متوفر ({product.stock} قطع)</span> : <span className="out-stock">✕ غير متوفر</span>}
          </div>
          <div className="buttons-group">
            <button className="cart-btn" onClick={addToCart}><FaShoppingCart /> إضافة إلى السلة</button>
<<<<<<< HEAD
            <button
              className="fav-btn"
              onClick={toggleFavorite}
              style={{
                color: isFavorite ? "#f44336" : "#888",
                borderColor: isFavorite ? "#f44336" : "#ccc"
=======
            <button 
              className="fav-btn" 
              onClick={toggleFavorite}
              style={{ 
                color: isFavorite ? "#f44336" : "#888",
                borderColor: isFavorite ? "#f44336" : "#ccc" 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              }}
            >
              <FaHeart /> المفضلة
            </button>
          </div>
        </div>
      </div>

      <div className="comments-section">
        <div className="description-box"></div>
<<<<<<< HEAD
        <h4 className="section-title" data-aos="fade-up">وصف المنتج</h4>
        <p className="description-text" data-aos="fade-up">
          {product.description}
        </p>

=======
          <h4 className="section-title" data-aos="fade-up">وصف المنتج</h4>
          <p className="description-text" data-aos="fade-up">
            {product.description}
          </p>
        
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

        <div className="section-divider"></div>

        <h3 className="rating-section-title" data-aos="fade-right">التقييمات</h3>
<<<<<<< HEAD

        <div className="rating-summary-container" data-aos="fade-right">
=======
        
        <div className="rating-summary-container"data-aos="fade-right">
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          <div className="rating-average-box" data-aos="fade-right">
            <h1 className="average-num">{product.rating}</h1>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((s) => (
                <FaStar key={s} color={s <= Math.floor(product.rating) ? "#ffc107" : "#e4e5e9"} />
              ))}
            </div>
          </div>
<<<<<<< HEAD

=======
          
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          <div className="rating-bars-container" >
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="rating-bar-item">
                <span className="star-number">{item.stars}</span>
                <div className="bar-background">
                  <div className="bar-fill" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

<<<<<<< HEAD
        <div className="comments-list" data-aos="fade-right">
=======
        <div className="comments-list"data-aos="fade-right">
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          {comments.map((c) => (
            <div key={c.id} className="comment-item-box">
              <div className="comment-top-row">
                <div className="user-info-wrapper">
                  <img src={c.userImg} alt={c.user} className="user-avatar" />
                  <div className="user-details-column">
                    <div className="name-stars-row">
                      <span className="comment-user-name">{c.user}</span>
                      <div className="stars-row-small">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FaStar key={s} color={s <= c.rating ? "#40798C" : "#e4e5e9"} size={12} />
                        ))}
                      </div>
                    </div>
                    <span className="comment-date">{c.date}</span>
                  </div>
                </div>
              </div>
              <div className="comment-content-bottom">
                <p className="comment-text-p">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="rating-btn" onClick={() => setShowRateModal(true)} data-aos="fade-up">
          تقييم المنتج
        </button>
      </div>

      {showRateModal && (
        <div className="modal-overlay" onClick={() => setShowRateModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowRateModal(false)}>×</button>
            <h3>تقييم المنتج</h3>
            {rateMessage ? <p className="success-msg">{rateMessage}</p> : (
              <>
                <div className="stars-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className="star-icon"
                      color={(hoverRating || selectedRating) >= star ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setSelectedRating(star)}
                    />
                  ))}
                </div>
<<<<<<< HEAD
                <input type="text"
=======
                 <input type="text"
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  placeholder="الاسم"
                  required
                  className="modal-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
<<<<<<< HEAD
                <textarea
                  placeholder="اكتب رأيك هنا"
=======
                <textarea 
                  placeholder="اكتب رأيك هنا" 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  required
                  className="modal-textarea"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
<<<<<<< HEAD

                <button
                  className="submit-btn"
                  onClick={handleSubmitRate}
                  style={{
                    backgroundColor: isFormValid ? "#40798C" : "#ccc",
                    cursor: isFormValid ? "pointer" : "not-allowed"
=======
               
                <button 
                  className="submit-btn" 
                  onClick={handleSubmitRate}
                  style={{ 
                    backgroundColor: isFormValid ? "#40798C" : "#ccc", 
                    cursor: isFormValid ? "pointer" : "not-allowed" 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                  }}
                  disabled={!isFormValid}
                >
                  إرسال
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}