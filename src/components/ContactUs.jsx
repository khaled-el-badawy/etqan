import "./ContactUs.css";
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import axios from "axios"; // استيراد axios
import AOS from "aos";
import "aos/dist/aos.css";
=======
import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [complaint, setComplaint] = useState("");
  const [emailError, setEmailError] = useState("");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false); // حالة التحميل

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // الاسم (فلترة الحروف فقط)
=======

  //  الاسم 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const handleNameChange = (e) => {
    const val = e.target.value;
    const filtered = val.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
    setName(filtered);
  };

  // البريد الالكتروني
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
<<<<<<< HEAD
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
=======

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    if (val && !emailRegex.test(val)) {
      setEmailError("البريد الإلكتروني غير صالح");
    } else {
      setEmailError("");
    }
  };

<<<<<<< HEAD
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
=======
  //  submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message || !complaint) return;
    if (emailError) return;

    console.log({ name, email, message, complaint });

    // تفريغ الحقول
    setName("");
    setEmail("");
    setMessage("");
    setComplaint("");
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  };

  return (
    <div className="contactus-page-container">
<<<<<<< HEAD
=======

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      <section className="hero-section">
        <div className="hero-image" data-aos="fade-right">
          <div className="hero-container">
            <div className="hero-image">
              <img src="/images/Frame 22.svg" alt="إتقان" />
            </div>
<<<<<<< HEAD
            <div className="hero-text" data-aos="fade-up">
              <p className="hero-title">
                صوتك مسموع.. نحن هنا للإجابة على
                <br />
                استفساراتك وضمان جودة الخدمة
              </p>
=======

            <div className="hero-text">
              <div className="hero-text" data-aos="fade-up">
                <p className="hero-title">
                  صوتك مسموع.. نحن هنا للإجابة على"
                  <br />
                  "استفساراتك وضمان جودة الخدمة
                </p>
              </div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
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
<<<<<<< HEAD
=======

          {/* الصورة */}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          <div className="contact-image">
            <img src="/images/Rectangle 22.svg" alt="location" />
          </div>

<<<<<<< HEAD
          <div className="contact-form">
            <h2 className="contact-title">تواصل معنا!</h2>
            <form onSubmit={handleSubmit}>
=======
          {/* الفورم */}
          <div className="contact-form">
            <h2 className="contact-title">!تواصل معنا</h2>

            <form onSubmit={handleSubmit}>

              {/* الاسم */}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              <input
                type="text"
                placeholder="الاسم"
                value={name}
                onChange={handleNameChange}
                required
              />

<<<<<<< HEAD
=======
              {/* الإيميل */}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={handleEmailChange}
                required
              />
<<<<<<< HEAD
              {emailError && <p className="error-msg-contact">{emailError}</p>}

              <textarea
                placeholder="رسالتك "
=======

              {emailError && (
                <p className="error">{emailError}</p>
              )}

              {/* الرسالة */}
              <textarea
                placeholder="رسالتك"
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                required
              ></textarea>

<<<<<<< HEAD
              <textarea
                placeholder="اكتب شكوتك (في حال وجود مشكلة)"
=======
              {/* الشكوى */}
              <textarea
                placeholder="اكتب شكوتك"
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows="3"
                required
              ></textarea>

<<<<<<< HEAD
              <button type="submit" disabled={loading}>
                {loading ? "جاري الإرسال..." : "إرسال"}
              </button>
=======
              <button type="submit">إرسال</button>

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            </form>
          </div>
        </div>
      </div>
<<<<<<< HEAD
=======

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    </div>
  );
}

export default ContactUs;