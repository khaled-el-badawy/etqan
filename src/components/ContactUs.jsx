import "./ContactUs.css";
import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [complaint, setComplaint] = useState("");
  const [emailError, setEmailError] = useState("");

  //  الاسم 
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
  };

  return (
    <div className="contactus-page-container">

      <section className="hero-section">
        <div className="hero-image" data-aos="fade-right">
          <div className="hero-container">
            <div className="hero-image">
              <img src="/images/Frame 22.svg" alt="إتقان" />
            </div>

            <div className="hero-text">
              <div className="hero-text" data-aos="fade-up">
                <p className="hero-title">
                  صوتك مسموع.. نحن هنا للإجابة على"
                  <br />
                  "استفساراتك وضمان جودة الخدمة
                </p>
              </div>
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

          {/* الصورة */}
          <div className="contact-image">
            <img src="/images/Rectangle 22.svg" alt="location" />
          </div>

          {/* الفورم */}
          <div className="contact-form">
            <h2 className="contact-title">!تواصل معنا</h2>

            <form onSubmit={handleSubmit}>

              {/* الاسم */}
              <input
                type="text"
                placeholder="الاسم"
                value={name}
                onChange={handleNameChange}
                required
              />

              {/* الإيميل */}
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={handleEmailChange}
                required
              />

              {emailError && (
                <p className="error">{emailError}</p>
              )}

              {/* الرسالة */}
              <textarea
                placeholder="رسالتك"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                required
              ></textarea>

              {/* الشكوى */}
              <textarea
                placeholder="اكتب شكوتك"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows="3"
                required
              ></textarea>

              <button type="submit">إرسال</button>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ContactUs;