import "./ContactUs.css";
import React, { useState } from "react";
import { FiPhone,FiMail,FiMapPin } from "react-icons/fi";
function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) return;

    console.log({ name, email, message });

    // تفريغ الحقول
    setName("");
    setEmail("");
    setMessage("");
  };

          return (
           <div className="contactus-page-container">
   
     

          <section className="hero-section">
            <div className="hero-image" data-aos="fade-right">
        <div className=" hero-container">
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
  <div className="icon-wrapper"data-aos="fade-left"><FiMail /></div>
  <div className="icon-wrapper"data-aos="fade-left"><FiMapPin /></div>
</div>
    <div className="contact-wrapper"data-aos="fade-right">

      <div className="contact-card">

        {/* الصورة */}
        <div className="contact-image">
          <img src="/images/Rectangle 22.svg" alt="location" />
        </div>

        {/* الفورم */}
        <div className="contact-form">

          <h2 className="contact-title">!تواصل معنا</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="الاسم"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              placeholder="رسالتك"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
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