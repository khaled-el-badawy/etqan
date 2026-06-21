import "./ContactUs.css";
import React, { useState, useEffect } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import axios from "axios"; // استيراد axios
import AOS from "aos";
import "aos/dist/aos.css";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [complaint, setComplaint] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false); // حالة التحميل

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // الاسم (فلترة الحروف فقط)
  const handleNameChange = (e) => {
    const val = e.target.value;
    const filtered = val.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
    setName(filtered);
  };

  // البريد الالكتروني
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (val && !emailRegex.test(val)) {
      setEmailError("البريد الإلكتروني غير صالح");
    } else {
      setEmailError("");
    }
  };

  // وظيفة الإرسال الفعلي (الربط بالباك-إند)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من الحقول قبل الإرسال
    if (!name || !email || !message || !complaint) {
      // alert("يرجى ملء جميع الحقول");
      return;
    }
    if (emailError) return;

    setLoading(true); // بدء التحميل

    try {
      // نداء الـ API
      const response = await axios.post("https://etqanproject.runasp.net/api/Contact/send-general", {
        name: name,
        email: email,
        messageContent: message, // لازم يكون مطابق لاسم الحقل في الـ DTO (C#)
        complaint: complaint,
        artisanId: null, // حقول اختيارية
        companyId: null
      });

      if (response.status === 200) {
        // alert("تم استلام رسالتك/شكواك بنجاح. شكراً لك!");
        // تفريغ الحقول
        setName("");
        setEmail("");
        setMessage("");
        setComplaint("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // alert("عذراً، فشل إرسال الرسالة. تأكد من تشغيل السيرفر.");
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  return (
    <div className="contactus-page-container">
      <section className="hero-section">
        <div className="hero-image" data-aos="fade-right">
          <div className="hero-container">
            <div className="hero-image">
              <img src="/images/Frame 22.svg" alt="إتقان" />
            </div>
            <div className="hero-text" data-aos="fade-up">
              <p className="hero-title">
                صوتك مسموع.. نحن هنا للإجابة على
                <br />
                استفساراتك وضمان جودة الخدمة
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-information">
        <h1 data-aos="fade-left">معلومات التواصل</h1>
      </div>

      <div className="icons-container">
        <div className="icon-wrapper" data-aos="fade-left"><FiPhone /></div>
        <div className="icon-wrapper" data-aos="fade-left"><FiMail /></div>
        <div className="icon-wrapper" data-aos="fade-left"><FiMapPin /></div>
      </div>

      <div className="contact-wrapper" data-aos="fade-right">
        <div className="contact-card">
          <div className="contact-image">
            <img src="/images/Rectangle 22.svg" alt="location" />
          </div>

          <div className="contact-form">
            <h2 className="contact-title">تواصل معنا!</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="الاسم"
                value={name}
                onChange={handleNameChange}
                required
              />

              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="error-msg-contact">{emailError}</p>}

              <textarea
                placeholder="رسالتك "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                required
              ></textarea>

              <textarea
                placeholder="اكتب شكوتك (في حال وجود مشكلة)"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows="3"
                required
              ></textarea>

              <button type="submit" disabled={loading}>
                {loading ? "جاري الإرسال..." : "إرسال"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;