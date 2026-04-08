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

// استيراد ملف التنسيق المدمج
import './HomeStyle.css';
import { Link } from 'react-router-dom';

// 2. Hero Section 
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
        <div className="hero-images-wrapper" data-aos="fade-left" data-aos-duration="1200">
          <img src="/public/images/hero/homeimg1.svg" alt="hero4" className="homeimg1" />
        </div>
        <div className="hero-text" data-aos="fade-up" data-aos-duration="1000">
          <h1>خدمات حرفية موثوقة في مكان واحد</h1>
          <p className="no-break">نوفر لك منصة تجمع أفضل الحرفيين في مختلف المجالات،لتسهيل
          <br />الوصول إلى خدمات عالية الجودة بطريقة آمنة وسريعة، مع ضمان
          <br/>تجربة استخدام سهلة وموثوقة</p>
        </div>
      </div>
      <div className="stats-bar" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400">
        <div className="container stats-container">
          <div className="stat-item">
            <h3>+<AnimatedNumber target={500} /></h3>
            <p>حرفي معتمد</p>
          </div>
          <div className="divider"></div>
          <div className="stat-item">
            <h3>+<AnimatedNumber target={1300} /></h3>
            <p>عميل راضي</p>
          </div>
          <div className="divider context-divider"></div>
          <div className="stat-item">
            <h3><AnimatedNumber target={4.8} isFloat={true} /> <FaStar style={{ color: '#F69654', marginRight: '5px' }} /></h3>
            <p>تقييم العملاء</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 3. Main Services
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
            <a href={service.link} className="service-btn"> عرض <FaArrowLeft className="arrow-icon" /></a>
          </div>
        ))}
      </div>
    </section>
  );
};

// 4. Top Craftsmen
const craftsmenData = [
  {id: 1, name: 'محمد طه', job: 'نجار', rate: 4.9, img: '/images/user/user1.svg' },
  {id: 2, name: 'عمر احمد', job: 'كهربائي', rate: 4.8, img: '/images/user/user2.svg' },
  {id: 3, name: 'محمد علي', job: 'حداد', rate: 4.8, img: '/images/user/user3.svg' },
  {id: 4, name: 'محمد خالد', job: 'سباك', rate: 4.5, img: '/images/user/user4.svg' },
  {id: 5, name: 'وليد محمد', job: 'كهربائي', rate: 4.7, img: '/images/user/user5.svg' },
  {id: 6, name: 'علي حسن', job: 'نقاش', rate: 4.6, img: '/images/user/user6.jfif' },
  {id: 7, name: 'سعد محمد', job: 'نجار', rate: 4.7, img: '/images/user/user7.jfif' },
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

// 5. Testimonials
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

// 6. Contact Us 
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validate = () => {
    let isValid = true;
    let newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
      isValid = false;
    } else if (formData.name.includes('@')) {
      newErrors.name = "الاسم غير صحيح";
      isValid = false;
    }
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
      isValid = false;
    } else if (!gmailRegex.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح ";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "من فضلك اكتب رسالتك";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("تم إرسال الرسالة بنجاح!", formData);
      alert("تم الإرسال بنجاح");
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' }); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-content-wrapper">
          <div className="contact-images-side" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
            <div className="homeimg2"><img src="/images/hero/homeimg2.svg" alt="work-1" /></div>
          </div>
          <div className="contact-form-side" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <h2 className="contact-main-title">تواصل معنا</h2>
            
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              
              <div className="input-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="الاسم" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="البريد الالكتروني" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="input-group">
                <textarea 
                  name="message" 
                  placeholder="اكتب رسالتك" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <button type="submit" className="send-btn">إرسال</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

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
      </div>
    </div>
  );
};

export default Home;