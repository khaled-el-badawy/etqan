import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartProvider } from "./components/CartContext";

<<<<<<< HEAD
// استيراد المكونات (تأكد من صحة المسارات في مشروعك)
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
import Login from "./components/Login";
import LoginOTP from "./components/LoginOTP";
import Index from "./components/Index";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/NewPassword";
import VerifyOTP from "./components/VerifyOTP";
import CraftsmanRegister from "./components/CraftsmanRegister";
import CustomerRegister from "./components/CustomerRegister";
import CompanyRegister from "./components/CompanyRegister";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import CustomerOrdersPage from "./components/CustomerOrdersPage";
import CraftmanOrdersPage from "./components/CraftmanOrdersPage";
import CompanyOrdersPage from "./components/CompanyOrdersPage";
import Companies from "./components/Companies";
import Providers from "./components/Providers";
import CompanyProfile from "./components/CompanyProfile";
import Service from "./components/Service";
import Artisans from "./components/Artisans";
import Products from "./components/Products";
import ProductsDetails from "./components/ProductsDetails";
import FavoritesPage from "./components/FavoritesPage";
import CartPage from "./components/CartPage";
import CheckOut from "./components/CheckOut";
import Brands from "./components/Brands";
import CraftmanProfile from "./components/CraftmanProfile";
import OrderDetails from "./components/OrderDetails";
import Faturuh from "./components/Faturuh";
import Clientprofile from "./components/Clientprofile";
import ContactUs from "./components/ContactUs";
import Chat from "./components/Chat";
import NotificationsPage from "./components/NotificationsPage";
import PageNotFound from "./components/PageNotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
<<<<<<< HEAD
import ScrollTopButton from "./components/ScrollTopButton";
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

<<<<<<< HEAD
  // تحديد الصفحات التي سيختفي منها الـ Navbar والـ Footer
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
  const isLoginPage = location.pathname.startsWith("/login");
  const isForgotPage = location.pathname.startsWith("/forgot-password");
  const isVerifyPage = location.pathname.startsWith("/verify-otp");
  const isNewPage = location.pathname.startsWith("/new-password");
  const isAdminPage = location.pathname.startsWith("/admin");

  const hideRoutes = [
    "/",
    "/index",
    "/CraftsmanRegister",
    "/CustomerRegister",
    "/CompanyRegister",
  ];

  const hideNavbar =
    isLoginPage ||
    isForgotPage ||
    isVerifyPage ||
    isNewPage ||
    isAdminPage ||
    hideRoutes.includes(location.pathname);

  return (
    <>
<<<<<<< HEAD
      {/* ظهور الـ Navbar بشكل ذكي */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* الصفحات التعريفية */}
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />

        {/* بوابات تسجيل الدخول */}
        <Route path="/login/:role" element={<Login />} />
        <Route path="/login-otp/:role" element={<LoginOTP />} />

        {/* استعادة كلمة السر */}
        <Route path="/forgot-password/:role" element={<ForgotPassword />} />
        <Route path="/new-password/:role" element={<NewPassword />} />

        {/* بوابات تسجيل الحسابات الجديدة */}
=======
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />

        <Route path="/login/:role" element={<Login />} />
        <Route path="/login-otp/:role" element={<LoginOTP />} />

        <Route path="/forgot-password/:role" element={<ForgotPassword />} />
        <Route path="/new-password/:role" element={<NewPassword />} />

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        <Route path="/CraftsmanRegister" element={<CraftsmanRegister />} />
        <Route path="/verify-otp/:role" element={<VerifyOTP />} />
        <Route path="/CustomerRegister" element={<CustomerRegister />} />
        <Route path="/CompanyRegister" element={<CompanyRegister />} />

<<<<<<< HEAD
        {/* الصفحة الرئيسية ومن نحن */}
        <Route path="/home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />

        {/* صفحات تتبع الطلبات للأدوار المختلفة */}
=======
        <Route path="/home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        <Route path="/CraftmanOrdersPage" element={<CraftmanOrdersPage />} />
        <Route path="/CompanyOrdersPage" element={<CompanyOrdersPage />} />
        <Route path="/CustomerOrdersPage" element={<CustomerOrdersPage />} />
        <Route path="/NotificationsPage" element={<NotificationsPage />} />

<<<<<<< HEAD
        {/* صفحات الشركات ومقدمي الخدمة */}
        <Route path="/Companies" element={<Companies />} />
        <Route path="/providers" element={<Providers />} />
        {/* ✅ بروفايل الشركة (مربوط بالـ ID) */}
        <Route path="/CompanyProfile/:id" element={<CompanyProfile />} />

        {/* صفحة الخدمات (الصيانة) */}
        <Route path="/Service" element={<Service />} />

        {/* ✅ صفحة الحرفيين - (تم إضافة :jobId لحل مشكلة الـ 404) */}
        <Route path="/Artisans/:jobId" element={<Artisans />} />

        {/* المتجر والمنتجات */}
        <Route path="/Products" element={<Products />} />
        {/* <Route path="/ProductsDetails/:id" element={<ProductsDetails />} /> */}
        <Route path="/ProductsDetails" element={<ProductsDetails />} />
        <Route path="/FavoritesPage" element={<FavoritesPage />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/Brands" element={<Brands />} />

        {/* الفواتير وتفاصيل الطلبات */}
        <Route path="/OrderDetails" element={<OrderDetails />} />
        <Route path="/Faturuh" element={<Faturuh />} />

        {/* ✅ بروفايل العميل (مربوط بالـ ID) */}
        <Route path="/Clientprofile/:id" element={<Clientprofile />} />

        {/* ✅ بروفايل الحرفي (مربوط بالـ ID) */}
        <Route path="/CraftmanProfile/:id" element={<CraftmanProfile />} />

        {/* تواصل معنا والدردشة */}
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/Chat" element={<Chat />} />

        {/* لوحة تحكم الأدمن (محمية بـ ProtectedRoute) */}
=======
        <Route path="/Companies" element={<Companies />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/CompanyProfile/:id" element={<CompanyProfile />} />

        <Route path="/Service" element={<Service />} />
        <Route path="/Artisans" element={<Artisans />} />

        <Route path="/Products" element={<Products />} />
        <Route path="/ProductsDetails" element={<ProductsDetails />} />

        <Route path="/FavoritesPage" element={<FavoritesPage />} />
        <Route path="/CartPage" element={<CartPage />} />

        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/Brands" element={<Brands />} />

        <Route path="/OrderDetails" element={<OrderDetails />} />
        <Route path="/Faturuh" element={<Faturuh />} />

        <Route path="/Clientprofile/:id" element={<Clientprofile />} />

        {/* هذا هو المسار المطلوب - تأكد من تطابقه تماماً */}
        <Route path="/CraftmanProfile/:id" element={<CraftmanProfile />} />

        <Route path="/contactUs" element={<ContactUs />} />

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

<<<<<<< HEAD
        {/* صفحة 404 (دائماً في النهاية) */}
=======
        <Route path="/Chat" element={<Chat />} />

        {/* صفحة 404 يجب أن تكون دائماً في آخر القائمة */}
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!hideNavbar && <Footer />}
<<<<<<< HEAD
      <ScrollTopButton />
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppWrapper />
      </Router>
    </CartProvider>
  );
}

export default App;
