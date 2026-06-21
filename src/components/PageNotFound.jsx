import "./PageNotFound.css";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import errorImg from "/images/error404.svg";
=======
import errorImg from "/images/error404.svg"; 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

export default function PageNotFound() {
  return (
    <div className="error-page-container">
      <style>
        {`
<<<<<<< HEAD
        @import url('http://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');
=======
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        
        .error-page-container, .error-page-container * {
            font-family: 'Cairo', sans-serif !important;
        }
        `}
      </style>

      {/* Content */}
      <div className="error-content">
        <h1 className="error-number">404</h1>

        <h2>الصفحة غير موجودة</h2>

        <p>
          عذرًا، الصفحة التي تبحث عنها غير موجودة
          <br />
          أو تم نقلها.
        </p>

        <img src={errorImg} alt="404 Error" />

        <div className="buttons">
          <Link to="/home" className="main-btn">
            العودة إلى الصفحة الرئيسية
          </Link>

          <button
            className="back-btn"
            onClick={() => window.history.back()}
          >
<<<<<<< HEAD
            الرجوع إلى الخلف
=======
             الرجوع إلى الخلف
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
          </button>
        </div>
      </div>
    </div>
  );
}