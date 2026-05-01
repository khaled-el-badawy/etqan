import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./CheckOut.css"; 

const CheckOut = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
  // الحالة المسؤولة عن تحديد الخطوة المنورة (بدأنا بـ 2 لأننا في صفحة الشحن)
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [formData, setFormData] = useState({ email: '', phone: '', governorate: '' });

  const governorates = ["القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الغربية", "الشرقية", "المنوفية", "أسوان"];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 20;
  const totalBeforeDiscount = subtotal + shipping;
  const discount = totalBeforeDiscount > 1000 ? totalBeforeDiscount * 0.10 : 0;
  const finalTotal = totalBeforeDiscount - discount;

  const handleSubmit = (e) => {
    e.preventDefault();
    // عند الضغط على زرار التأكيد النهائي، بننور الخطوة رقم 3
    setCurrentStep(3);
    
    setTimeout(() => {
      alert("تم إرسال طلبك بنجاح!");
      localStorage.removeItem("cart");
      navigate("/home");
    }, 500);
  };

  return (
    <div className="checkout-container" dir="rtl">
      <header className="checkout-header">
        <h1>إتمام الشراء</h1>
        <div className="stepper">
          {/* الخطوة 1: السلة */}
        <div className="step completed clickable" onClick={() => navigate('/CartPage')}>
    <span>1</span>
    السلة
</div>
          <div className="line"></div>
          
          {/* الخطوة 2: الشحن والدفع */}
          <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
            <span>2</span> الشحن والدفع
          </div>
          <div className="line"></div>
          
          {/* الخطوة 3: تأكيد الطلب - تنور لما نضغط عليها أو نضغط تأكيد */}
       
<div 
  className={`step ${currentStep === 3 ? 'active' : ''} clickable`} 
  onClick={() => {
    setCurrentStep(3); // تنوير الخطوة
    // السطر المسؤول عن النزول لأسفل الصفحة عند الزر
    document.getElementById('confirm-button')?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  <span>3</span> تأكيد الطلب
</div>
        </div>
      </header>

    

      <form onSubmit={handleSubmit} className="checkout-layout">
        <div className="form-sections">
          <div className="card">
            <h2 className="card-title"> بيانات العميل</h2>
            <div className="input-grid">
              <div className="input-group">
                <label>الاسم  <span className="star">*</span></label>
                <input required type="text" placeholder="ادخل اسمك " />
              </div>
              {/* <div className="input-group">
                <label>البريد الإلكتروني <span className="star">*</span></label>
                <input required type="email" placeholder="ادخل بريدك الإلكتروني" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
              </div> */}
              <div className="input-group">
                <label>رقم الهاتف <span className="star">*</span></label>
                <input 
  required 
  type="tel" 
  placeholder="رقم الهاتف" 
  className="phone-input" // ضيفي كلاس هنا
  onChange={(e)=>setFormData({...formData, phone: e.target.value})} 
/>
              </div>
              <div className="input-group">
                <label>المحافظة <span className="star">*</span></label>
               <select 
  required 
  defaultValue="" // عشان يبدأ بالقيمة الفاضية
  onChange={(e)=>setFormData({...formData, governorate: e.target.value})}
>
  {/* دي هتظهر كعنوان بس مش هتكون موجودة جوه الخيارات المتاحة للاختيار */}
  <option value="" disabled hidden>اختر المحافظة</option>
  
  {governorates.map(gov => (
    <option key={gov} value={gov}>{gov}</option>
  ))}
</select>
                          </div>
                           <div className="input-group">
                <label>العنوان<span className="star">*</span></label>
                <input required type="text" placeholder="العنوان بالتفصيل" />
              </div>
            </div>
          </div>

          <div className="card mt-20">
            <h2 className="card-title"> طريقة الدفع</h2>
            <div className="payment-methods">
              <label className={`method-item ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                <input type="radio" name="pay" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                <div className="method-text"><strong>الدفع عند الاستلام</strong><small>ادفع نقداً عند استلام الطلب</small></div>
                <span className="method-icon"></span>
              </label>
              <label className={`method-item ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <div className="method-text"><strong>بطاقة ائتمان </strong><small>ادفع باستخدام بطاقتك الائتمانية</small></div>
                <span className="method-icon"></span>
              </label>
            </div>
          </div>
        </div>

        <aside className="summary-section">
          <div className="card sticky-card">
            <h2 className="card-title"> ملخص الطلب</h2>
            <div className="cart-items">
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>الكمية: {item.quantity} | السعر: {item.price} ج.م</p>
                  </div>
                  <span className="item-price">{item.price * item.quantity} ج.م</span>
                </div>
              ))}
            </div>

            <div className="price-summary">
              <div className="price-row"><span>الإجمالي</span><span>{subtotal} جنيه</span></div>
              <div className="price-row"><span>رسوم الشحن</span><span>{shipping} جنيه</span></div>
              {discount > 0 && (
                <div className="price-row discount"><span>خصم (10%)</span><span>-{discount.toFixed(2)} جنيه</span></div>
              )}
              <div className="price-row total"><span>الإجمالي الكلي</span><span>{finalTotal.toFixed(2)} جنيه</span></div>
            </div>

            <button type="submit" id="confirm-button" className="checkout-btn">تأكيد الطلب</button>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default CheckOut;