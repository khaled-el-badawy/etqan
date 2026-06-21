import React, { useEffect } from 'react';
import './Faturuh.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Faturuh = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="invoice-container">
      <div className="invoice-hero">
        <div className="hero-img-side" data-aos="fade-right">
          <img src="/images/faturuh/faturuhhero.svg" alt="Invoice Hero" />
        </div>
        
        <div className="hero-center-text">
          <h1 data-aos="fade-down">فاتورة الخدمة</h1>
          <div className="invoice-meta-info" data-aos="fade-up">
            <span>فاتورة خدمات سباكة</span>
            <span>رقم الفاتورة: 001</span>
            <span>التاريخ: 2025/1/20</span>
          </div>
        </div>
      </div>

      <div className="users-data-grid" data-aos="fade-left">
        <div className="user-info-card">
          <div className="card-top craftsman-bg">
             <img src="/images/faturuh/faturuhicon2.svg" alt="icon" />
             <span>بيانات الحرفي</span>
          </div>
          <div className="card-fields">
             <div className="field"><span>اسم الحرفي:</span> <strong>محمد حسن</strong></div>
<<<<<<< HEAD
             {/* <div className="field"><span>الهاتف:</span> <strong>01056871308</strong></div> */}
             {/* <div className="field"><span>العنوان:</span> <strong>المنصورة</strong></div> */}
             {/* <div className="field"><span>البريد الالكتروني:</span> <strong>Mohmed hassan@gmail.com</strong></div> */}
=======
             <div className="field"><span>الهاتف:</span> <strong>01056871308</strong></div>
             <div className="field"><span>العنوان:</span> <strong>المنصورة</strong></div>
             <div className="field"><span>البريد الالكتروني:</span> <strong>Mohmed hassan@gmail.com</strong></div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          </div>
        </div>

        <div className="user-info-card" data-aos="fade-left">
          <div className="card-top customer-bg">
             <img src="/images/faturuh/faturuhicon1.svg" alt="icon" />
             <span>بيانات العميل</span>
          </div>
          <div className="card-fields">
             <div className="field"><span>اسم العميل:</span> <strong>احمد علي</strong></div>
             <div className="field"><span>الهاتف:</span> <strong>01256248143</strong></div>
             <div className="field"><span>العنوان:</span> <strong>المنصورة</strong></div>
             <div className="field"><span>البريد الالكتروني:</span> <strong>Ahmed ali@gmail.com</strong></div>
          </div>
        </div>
      </div>

     <div className="details-section" data-aos="zoom-in">
        <div className="details-header">تفاصيل الخدمة</div>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>الخدمة</th>
              <th>الكمية</th>
              <th>السعر</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>تركيب الاحواض</td>
              <td>1</td>
              <td>500</td>
            </tr>
            <tr>
              <td>كشف تسريب المياه</td>
              <td>1</td>
              <td>250</td>
            </tr>
            <tr>
              <td>تركيب سخان</td>
              <td>2</td>
              <td>750</td>
            </tr>
          </tbody>
        </table>

        <div className="pricing-summary">
            <div className="pricing-right-box">
              <div className="box-title">ملخص فاتورة</div>
                <div className="total-final"><span>الاجمالي النهائي:</span> <span>1530 ج</span></div>
            </div>
        </div>
      </div>
      <div className="payment-area" data-aos="fade-up">
        <button className="pay-title-btn">طرق الدفع</button>
        <div className="pay-methods-grid">
          <button>دفع كاش</button>
          <button>بطاقة بنكية</button>
        </div>
      </div>
    </div>
  );
};

export default Faturuh;