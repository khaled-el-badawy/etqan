import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* // 1.حرفه تصنع باتقان */}
      <section className="hero-top-section">
        <div className="container hero-top-container">
          <div className="hero-top-image" data-aos="fade-left">
            <img src="/images/AboutUs/About1.svg" alt="إتقان" />
          </div>
          <div className="hero-top-text" data-aos="fade-up">
            <h1 className="hero-title">حرفة تُصنع بإتقان</h1>
            <p className="hero-subtitle">نضع بين يديك الحرفة الموثوقة<br>
            </br> لنقدم لك العمل بإتقان وثقة</p>
          </div>

        </div>
      </section>
      {/*  من نحن - .2. */ }
      <section className="about-section">
      <h2 className="about-title" data-aos="fade-down">من نحن ؟</h2>

      <div className="about-container">
        <div className="about-image" data-aos="fade-right">
          <img src="/images/AboutUs/About2.svg" alt="About Us" />
        </div>
        <div className="about-content" data-aos="fade-up">
          <h3>نحن منصة إلكترونية تهدف إلى ربط العملاء بأفضل <br/>الحرفيين في مختلف المجالات، بطريقة سهلة وآمنة</h3>
          <p>

نؤمن بأن الحرفي الماهر يستحق فرصة عادلة لعرض خبرته، كما يستحق <br/>العميل خدمة مضمونة وسعر مناسب. لذلك نعمل على توفير بيئة تجمع <br/> بين الطرفين، مع التركيز على الشفافية، الجودة، وسهولة الاستخدام

          </p>
          <p className="highlight-text">
            هدفنا هو تحسين تجربة الحصول على الخدمات الحرفية، وبناء مجتمع <br/>يعتمد على الثقة والتقييمات الحقيقية.
          </p>
        </div>
      </div>
    </section>
    {/* 3.لماذا تختار موقعنا */}
<h2 className="features-title" data-aos="fade-down">لماذا تختار موقعنا ؟</h2>
<div className="features-outer-wrapper">
  <div className="features-container">
    {[
      { id: 1, title: 'حرفيون موثوقون', desc: 'نحرص على التحقق من بيانات الحرفيين لضمان الجودة والمصداقية في كل خدمة' },
      { id: 2, title: 'سهولة الوصول والتواصل', desc: 'إمكانية الوصول للحرفي المناسب في دقائق بدون تعب البحث أو وسطاء' },
      { id: 3, title: 'جودة مقابل سعر', desc: 'نوفر لك خدمات بجودة عالية وأسعار تنافسية تناسب كل الاحتياجات' },
      { id: 4, title: 'تقييمات حقيقية', desc: 'آراء العملاء السابقة تساعدك في اختيار الحرفي الأنسب بثقة' },
      { id: 5, title: 'تنوع الخدمات', desc: 'من السباكة والنجارة للكهرباء والتشطيبات، كل الحرفيين في مكان واحد' },
      { id: 6, title: 'دعم وحماية الطرفين', desc: 'منصتنا تضمن حقوق العميل والحرفي وتوفر تجربة آمنة للجميع' }
    ].map((feature, index) => (
      <div 
        key={feature.id} 
        className="feature-card" 
        data-aos="flip-left" 
        data-aos-easing="ease-out-cubic" 
        data-aos-duration="2000"
        data-aos-delay={index * 100}
      >
        <div className="icon-bg">
          <img src={`/images/AboutUs/cards/card${feature.id}.svg`} alt={feature.title} />
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </div>
    ))}
  </div>
</div>
{/* رؤيتنا.4 */}
<section className="vision-section">
  <h2 className="vision-header-title" data-aos="fade-down">
    رؤيتنا
  </h2>

  <div className="container">
    <div className="vision-wrapper">
            <div className="vision-list-side">
        {[
          "ان نكون المنصة الأولى والموثوقة التي تجمع بين العملاء والحرفيين.",
          "توفير حلول موثوقة تلبي احتياجات العملاء بكفاءة واحترافية.",
          "تمكين الحرفيين من تطوير أعمالهم وزيادة فرصهم المهنية.",
          "إحداث نقلة نوعية في الحصول على الخدمات الحرفية عبر تجربة رقمية سهلة، آمنة، واحترافية."
        ].map((text, index, array) => (
          <div 
            className="vision-item-row" 
            key={index} 
            data-aos="fade-left" 
            data-aos-delay={index * 150}
          >
            <div className="number-container">
              <div className="number-badge">{index + 1}</div>
              {index !== array.length - 1 && <div className="line-connector"></div>}
            </div>
            <div className="text-content">{text}</div>
          </div>
        ))}
      </div>
      <div className="vision-image-side" data-aos="fade-right">
        <img src="/images/AboutUs/About3.svg" alt="Vision Illustration" />
      </div>
    </div>
  </div>
</section>
</div>
  );
};
export default AboutUs;