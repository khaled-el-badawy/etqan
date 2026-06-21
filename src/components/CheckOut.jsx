import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CheckOut.css";
import { LuUser, LuClipboardList } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';

const CheckOut = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(2);
  const [showToast, setShowToast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    governorate: '',
    address: ''
  });

  const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "الغربية",
    "المنوفية", "البحيرة", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا",
    "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر",
    "الوادي الجديد", "مطروح", "شمال سيناء", "جنوب سيناء", "الإسماعيلية",
    "السويس", "بورسعيد", "دمياط", "القليوبية"
  ];

  // الحسابات الديناميكية بناءً على محتويات السلة الحقيقية
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 20;
  const totalBeforeDiscount = subtotal + shipping;
  const discount = totalBeforeDiscount > 1000 ? totalBeforeDiscount * 0.10 : 0;
  const finalTotal = totalBeforeDiscount - discount;

  const handleNameChange = (e) => {
    const value = e.target.value;
    const onlyLetters = value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
    setFormData({ ...formData, fullName: onlyLetters });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, phone: onlyNums });
  };

  // ==========================================
  // 🚀 وظيفة الربط الفعلي مع الباك-إند
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    // ✅ هنا "الزتونة": نبعت كائن واحد فيه كل حاجة (البيانات + السلة)
    const requestData = {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      governorate: formData.governorate,
      // نبعت رقم الـ Enum (كاش=0، فيزا=1) بناءً على اختيارك في الصورة
      paymentMethod: paymentMethod === 'cash' ? 0 : 1,
      items: cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      // ركز في المسار: لازم يكون api/Orders/checkout
      const res = await axios.post("https://etqanproject.runasp.net/api/Orders/checkout", requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        setShowToast(true);
        localStorage.removeItem("cart");
        setTimeout(() => navigate("/Products"), 3000);
      }
    } catch (error) {
      // 👈 لو لسه فيه 400، اطبع الـ error هنا عشان نعرف أنهي حقل اللي ناقص
      console.log("Validation Errors:", error.response?.data);
      // alert("تأكد من ملء جميع الحقول المطلوبة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container" dir="rtl">
      {showToast && (
        <div className="success-toast">
          تم تأكيد الطلب بنجاح سيتم التواصل معكم لاستلام المنتجات في أقرب وقت.
        </div>
      )}

      <header className="checkout-header" data-aos="fade-right">
        <h1>إتمام الشراء</h1>
        <div className="stepper">
          <div className="step completed clickable" onClick={() => navigate('/CartPage')}>
            <span>1</span> الرجوع إلى السلة
          </div>
          <div className="line active-line"></div>
          <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
            <span>2</span> الشحن والدفع
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="checkout-layout">
        <div className="form-sections">
          <div className="card" data-aos="fade-up">
            <h2 className="card-title"><LuUser className='title-icon' /> بيانات العميل</h2>
            <div className="input-grid">

              <div className="input-group">
                <label>الاسم <span className="star">*</span></label>
                <input
                  required type="text" placeholder="ادخل اسمك"
                  value={formData.fullName} onChange={handleNameChange}
                />
              </div>

              <div className="input-group">
                <label>رقم الهاتف <span className="star">*</span></label>
                <input
                  required type="tel" placeholder="رقم الهاتف" maxLength="11"
                  pattern="^(010|011|012|015)[0-9]{8}$"
                  title="يرجى إدخال رقم هاتف صحيح يبدأ بـ 010 أو 011 أو 012 أو 015"
                  value={formData.phone} onChange={handlePhoneChange}
                  style={{ textAlign: "right" }}
                />
              </div>

              <div className="input-group" style={{ position: 'relative' }}>
                <label>المحافظة <span className="star">*</span></label>
                <input
                  type="text" readOnly required placeholder="اختر المحافظة"
                  value={formData.governorate} onClick={() => setIsOpen(!isOpen)}
                  style={{ cursor: 'pointer', caretColor: 'transparent' }}
                />
                {isOpen && (
                  <ul className="governorates-list">
                    {governorates.map((gov, index) => (
                      <li key={index} className="gov-item" onClick={() => {
                        setFormData({ ...formData, governorate: gov });
                        setIsOpen(false);
                      }}>
                        {gov}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="input-group">
                <label>العنوان <span className="star">*</span></label>
                <input
                  required type="text" placeholder="العنوان بالتفصيل"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="card mt-20" style={{ marginTop: '20px' }} data-aos="fade-up">
            <h2 className="card-title"> <MdPayment className='title-icon' />طريقة الدفع</h2>
            <div className="payment-methods">
              <label className={`method-item ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="radio" name="pay" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                  <div className="method-text"><strong>الدفع عند الاستلام</strong><small>ادفع نقداً عند استلام الطلب</small></div>
                </div>
              </label>
              <label className={`method-item ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <div className="method-text"><strong>بطاقة ائتمان</strong><small>ادفع باستخدام بطاقتك الائتمانية</small></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <aside className="summary-section" data-aos="fade-up">
          <div className="card sticky-card">
            <h2 className="card-title">< LuClipboardList className='title-icon' /> ملخص الطلب</h2>
            <div className="cart-items">
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="item-img"><img src={item.image} alt={item.name} /></div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>الكمية: {item.quantity} | {item.price} ج.م</p>
                  </div>
                  <span className="item-price">{item.price * item.quantity} ج.م</span>
                </div>
              ))}
            </div>
            <div className="price-summary">
              <div className="price-row"><span>الإجمالي</span><span>{subtotal} جنيه</span></div>
              <div className="price-row"><span>رسوم الشحن</span><span>{shipping} جنيه</span></div>
              {discount > 0 && <div className="price-row discount"><span>خصم (10%)</span><span>-{discount.toFixed(2)} جنيه</span></div>}
              <div className="price-row total"><span>الإجمالي الكلي</span><span>{finalTotal.toFixed(2)} جنيه</span></div>
            </div>
            <button type="submit" id="confirm-button" className="checkout-btn" disabled={loading}>
              {loading ? "جاري التأكيد..." : "تأكيد الطلب"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default CheckOut;