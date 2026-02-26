import Navbar from "./Navbar";
import React, { useState, useEffect, useRef } from 'react';
// استيراد أيقونات React
import { 
  FaUserCircle, FaBell, FaBars, FaTimes, FaChevronDown, 
  FaStar, FaArrowLeft, FaWrench, FaFacebookF, FaTwitter, 
  FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, 
  FaHammer
} from 'react-icons/fa'; 

//  استيراد Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

// استيراد AOS للأنيميشن
import AOS from 'aos';
import 'aos/dist/aos.css';

// استيراد ملفات الـ CSS الخاصة بـ Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// استيراد ملف التنسيق المدمج (الذي سننشئه في الخطوة 
import './HomeStyle.css';
import { Link } from 'react-router-dom';

// 2. Hero Section (مكون العداد المتحرك والـ Hero)

const AnimatedNumber = ({ target, isFloat = false }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const steps = 60;
        const increment = target / (duration / 1000 * steps); 
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else { setCount(isFloat ? start.toFixed(1) : Math.ceil(start)); }
        }, 1000 / steps);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target, isFloat]);
  return <span ref={elementRef}>{count}</span>;
};
   const HeroSection = () => {
     return (
       <section className="hero-section">
         <div className="container hero-container">
           <div
             className="hero-images-wrapper"
             data-aos="fade-left"
             data-aos-duration="1200"
           >
             <div className="hero-svg-wrapper">
               <img
                 src="/public/images/hero/Frame 7.svg"
                 alt="hero4"
                 className="hero-svg"
               />
             </div>
           </div>
           <div
             className="hero-text"
             data-aos="fade-up"
             data-aos-duration="1000"
           >
             <h1>خدمات حرفية موثوقة في مكان واحد</h1>
             <p className="no-break">
               نوفر لك منصة تجمع أفضل الحرفيين في مختلف المجالات،لتسهيل
               <br/>
               الوصول إلى خدمات عالية الجودة بطريقة آمنة وسريعة، مع ضمان
               <br/>
               
               تجربة استخدام سهلة وموثوقة
             </p>
           </div>
         </div>
         <div
           className="stats-bar"
           data-aos="zoom-in"
           data-aos-duration="1000"
           data-aos-delay="400"
         >
           <div className="container stats-container">
             <div className="stat-item">
               <h3>
                 +<AnimatedNumber target={500} />
               </h3>
               <p>حرفي معتمد</p>
             </div>
             <div className="divider"></div>
             <div className="stat-item">
               <h3>
                 +<AnimatedNumber target={1300} />
               </h3>
               <p>عميل راضي</p>
             </div>
             <div className="divider context-divider"></div>
             <div className="stat-item">
               <h3>
                 <AnimatedNumber target={4.8} isFloat={true} />{" "}
                 <FaStar style={{ color: "#F69654", marginRight: "5px" }} />
               </h3>
               <p>تقييم العملاء</p>
             </div>
           </div>
         </div>
       </section>
     );
};

         // 3. Main Services (الخدمات الرئيسية)
         const servicesData = [
         {id: 1, title: 'خدمات الحرفيين', description: 'نوفر لك نخبة من الحرفيين المحترفين في مختلف التخصصات، لتنفيذ أعمال الصيانة والتشطيبات بجودة عالية وسهولة في التواصل.', icon: '/images/icons/servicesicon1.svg', link: '#' },
         {id: 2, title: 'شركات مقاولات', description: 'نربطك بشركات نقل موثوقة لنقل الأثاث ومواد البناء بأمان وسرعة، مع خيارات تناسب مختلف الاحتياجات.', icon: '/images/icons/servicesicon3.svg', link: '#' },
         {id: 3, title: 'المنتجات', description: 'متجر متكامل يوفر الأدوات والمعدات التي يحتاجها الحرفيون، بمنتجات موثوقة وأسعار مناسبة مع سهولة الطلب.', icon: '/images/icons/servicesicon2.svg', link: '#' }
         ];

const MainServices = () => {
  return (
         <section className="services-section">
           <h2 className="services-main-title" data-aos="fade-down">الخدمات الرئيسية</h2>
           <div className="services-grid">
             {servicesData.map((service, index) => (
               <div key={service.id} className="service-card" data-aos="fade-up" data-aos-delay={index * 500}>
                 <div className="service-icon-wrapper">
                   <img src={service.icon} alt={service.title} className="service-custom-icon" />
                 </div>
                 <div className="service-content">
                   <h3>{service.title}</h3>
                   <p>{service.description}</p>
                 </div>
                 <Link to="/Service" className="service-btn"> عرض <FaArrowLeft className="arrow-icon" /></Link>
               </div>
             ))}
           </div>
         </section>
         );
};


         // 4. Top Craftsmen (أفضل الحرفيين)

         const craftsmenData = [
         {id: 1, name: 'محمد طه', job: 'نجار', rate: 4.9, img: '/images/user/user1.svg' },
         {id: 2, name: 'عمرو صبري', job: 'كهربائي', rate: 4.8, img: '/images/user/user2.svg' },
         {id: 3, name: 'محمود علي', job: 'حداد', rate: 4.8, img: '/images/user/user3.svg' },
         {id: 4, name: 'محمد مصطفى', job: 'سباك', rate: 4.5, img: '/images/user/user4.svg' },
         {id: 5, name: 'وليد محمد', job: 'كهربائي', rate: 4.7, img: '/images/user/user5.svg' },
         {id: 6, name: 'علي حسن', job: 'نقاش', rate: 4.6, img: '/images/user/user6.jfif' },
         {id: 7, name: 'سعد محمود', job: 'نجار', rate: 4.7, img: '/images/user/user7.jfif' },
         ];

const TopCraftsmen = () => {
  return (
         <section className="etqan-section-wrapper">
           <div className="etqan-blue-card" data-aos="zoom-in" data-aos-duration="1200">
             <h2 className="etqan-title" data-aos="fade-down" data-aos-delay="400">أفضل الحرفيين</h2>
             <Swiper dir="rtl" modules={[Navigation, Autoplay, Pagination]} spaceBetween={15} slidesPerView={1} navigation={true} pagination={{ clickable: true }} autoplay={{ delay: 3500 }} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 5 } }} className="etqan-swiper">
               {craftsmenData.map((item, index) => (
                 <SwiperSlide key={index}>
                   <div className="craft-card-figma" data-aos="fade-left" data-aos-delay={index * 150} data-aos-duration="800">
                     <div className="img-container-figma">
                       <img src={item.img} alt={item.name} />
                       <div className="rating-badge-figma">
                         <FaStar className="gold-star" /> {item.rate}
                       </div>
                     </div>
                     <h3 className="craft-name-figma">{item.name}</h3>
                     <p className="craft-job-figma"> {item.job}<span className='cross-tools-icon'>
                       <FaWrench className="wrench-small" />
                       <FaHammer className="hammer-small" />
                     </span></p>
                   </div>
                 </SwiperSlide>
               ))}
             </Swiper>
           </div>
         </section>
         );
};


         // 5. Testimonials (آراء العملاء)

         const reviewsData = [
         {id: 1, name: "إبراهيم محمد", text: "بصراحة وفر علي وقت ومجهود، التقييمات فرقت معايا في الاختيار وحسيت بأمان", rate: 5, img: "/images/clients/client1.png" },
         {id: 2, name: " سارة محمود", text: "الموقع سهل جداً، وصلت للحرفي اللي محتاجه بسرعة، والشغل اتعمل كويس وفي ميعاده", rate: 5, img: "/images/clients/client2.png" },
         {id: 3, name: "أحمد حسين", text: "التجربة عامة كويسة جدًا، الحرفي كان فاهم شغله وخلص بسرعة، والسعر زي ما اتفقنا من الأول", rate: 5, img: "/images/clients/client3.png" },
         {id: 4, name: "سامي محمد", text: "الصراحة أول مرة أطلب من موقع زي ده وكنت قلقان، بس الكهربائي جه في المعاد بالظبط واشتغل شغل نضيف جدًا، أكيد هكرر التجربة", rate: 5, img: "/images/clients/client4.jfif" },
         {id: 5, name: "مريم حسن", text: "تجربة حلوة، التعامل كان سهل والتواصل مع الحرفي كان سريع، أكيد هستخدمه تاني", rate: 5, img: "/images/clients/client7.jfif"},
         {id: 6, name: "أحمد ناصر", text: "الميزة في الموقع ده إنك بتشوف تقييمات الناس قبل ما تختار، وده خلاني أختار نجار كويس جدًا، شغله طلع مظبوط الحمد لله", rate: 5, img: "/images/clients/client6.jfif" },
         {id: 7, name: "محمود كمال", text: "أكتر حاجة عجبتني إن التواصل سهل، دخلت كلمت الحرفي على طول واتفقنا، مفيش لف ودوران", rate: 5, img: "/images/clients/client5.jfif"},
         ];

const Testimonials = () => {
  return (
         <section className="testimonials-main-wrapper">
           <div className="white-section">
             <h2 className="testimonials-title">تعرف على مايقوله عملائنا عنا</h2>
             <div className="inner-content" data-aos="fade-up" data-aos-easing="ease-out-cubic">
               <div className="decoration-shapes">
                 <div className="shape-large"></div>
                 <div className="shape-small"></div>
               </div>
               <Swiper modules={[Pagination, Autoplay]} spaceBetween={25} slidesPerView={1} pagination={{ clickable: true }} autoplay={{ delay: 4000 }} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="mySwiper">
                 {reviewsData.map((review) => (
                   <SwiperSlide key={review.id}>
                     <div className="testimonial-card">
                       <div className="card-header">
                         <img src={review.img} alt={review.name} className="reviewer-img" />
                         <div className="reviewer-meta">
                           <h4>{review.name}</h4>
                           <div className="stars">
                             {[...Array(review.rate)].map((_, i) => <FaStar key={i} />)}
                           </div>
                         </div>
                       </div>
                       <p className="review-body">{review.text}</p>
                     </div>
                   </SwiperSlide>
                 ))}
               </Swiper>
             </div>
           </div>
         </section>
         );
};


// 6. Contact Us (تواصل معنا)

const ContactUs = () => {
  const handleSubmit = (e) => {
           e.preventDefault();
         console.log("تم إرسال الرسالة بنجاح!");
  };

         return (
         <section className="contact-section">
           <div className="contact-container">
             <div className="contact-content-wrapper">
               <div className="contact-images-side" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
                 <div className="image-circle large"><img src="/images/contact/contact2.png" alt="work-1" /></div>
                 <div className="image-circle small"><img src="/images/contact/contact1.png" alt="work-2" /></div>
                 <div className="decoration-dot"></div>
               </div>
               <div className="contact-form-side" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                 <h2 className="contact-main-title">تواصل معنا</h2>
                 <form onSubmit={handleSubmit} className="contact-form">
                   <input type="text" placeholder="الاسم" required />
                   <input type="email" placeholder="البريد الالكتروني" required />
                   <textarea placeholder="اكتب رسالتك" rows="5" required></textarea>
                   <button type="submit" className="send-btn">إرسال</button>
                 </form>
               </div>
             </div>
           </div>
         </section>
         );
};

const Footer = () => {
  return (
     <footer className="home-footer">
               <div className="home-footer-container">
                 <div className="home-footer-section logo-info">
                   <div className="home-footer-logo">
                     <img src="/images/Logo2.svg" alt="ETQAN Logo" className="large-logo" />
                   </div>
                   <p className="home-footer-desc">
                     <span className='no-break'>
                       منصة متكاملة تجمع الحرفيين <br />والعملاء في مكان واحد.
                     </span> </p>
                 </div>
                 <div className="home-footer-section">
                   <h3 className='home-footer-link-h3'>الصفحة الرئيسية</h3>
                   <ul className='home-footer-link'>
                     <li><Link to="#about">من نحن</Link></li>
                     <li><Link to="#services">الخدمات</Link></li>
                     <li><Link to="#orders">الطلبات</Link></li>
                     <li><Link to="#contact">تواصل معنا</Link></li>
                   </ul>
                 </div>
                 <div className="home-footer-section">
                   <h3 className='home-footer-contact-h3'>اتصل بنا</h3>
                   <ul className="contact-info">
                     <li><FaEnvelope /> <span className="contact-span">ETQAN@gmail.com</span></li>
                     <li><FaPhoneAlt /> <span dir="ltr">+20 100 000 0000</span></li>
                   </ul>
                   <div className="social-icons">
                     <Link to="#" className='social-link'><FaLinkedinIn /></Link>
                     <Link to="#" className='social-link'><FaInstagram /></Link>
                     <Link to="#" className='social-link'><FaTwitter /></Link>
                     <Link to="#" className='social-link'><FaFacebookF /></Link>
                   </div>
                 </div>
                 <div className="home-footer-section policies-section">
                   <ul className='home-footer-ul'>
                     <li><Link to="#" className='home-footer-link'>سياسة الخصوصية</Link></li>
                     <li><Link to="#" className='home-footer-link'>الشروط والأحكام</Link></li>
                   </ul>
                 </div>
               </div>
               <div className="home-footer-bottom">
                 <p>ETQAN 2026 - جميع الحقوق محفوظة ©</p>
               </div>
    </footer>
  );
};


// التجميع النهائي لصفحة Home

const Home = () => {
           useEffect(() => {
             AOS.init({
               duration: 1000,
               once: false,
             });
           }, []);

  return (
           <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
         <div style={{flex:1}}></div>
         <div className="home-page-wrapper">
           <HeroSection />
           <MainServices />
           <TopCraftsmen />
           <Testimonials />
        <ContactUs />
        <Footer/>
        </div>
         </div>
  );
};
    
      

export default Home;