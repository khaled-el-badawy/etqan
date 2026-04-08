import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import Service from "./components/Service";
import Artisans from "./components/Artisans";
import Products from "./components/Products";
import FavoritesPage from "./components/FavoritesPage";
import CartPage from "./components/CartPage";
import Brands from "./components/Brands";
import CraftmanProfile from "./components/CraftmanProfile";
import OrderDetails from "./components/OrderDetails";
import Faturuh from "./components/Faturuh";
import Clientprofile from "./components/Clientprofile";
import ContactUs from "./components/ContactUs";
import PageNotFound from "./components/PageNotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // الصفحات اللي مش عايزين فيها Navbar/Footer

  const isLoginPage = location.pathname.startsWith("/login");
  const isForgotPage = location.pathname.startsWith("/forgot-password");
  const isVerifyPage = location.pathname.startsWith("/verify-otp");
  const isNewPage = location.pathname.startsWith("/new-password");

  //  صفحات ثابتة
  const hideRoutes = [
    "/",
    "/index",
    "/CraftsmanRegister",
    "/CustomerRegister",
    "/CompanyRegister",
  ];

  //  الشرط النهائي
  const hideNavbar =
    isLoginPage ||
    isForgotPage ||
    isVerifyPage ||
    isNewPage ||
    hideRoutes.includes(location.pathname);

  const showNavbar = !hideNavbar;
  const showFooter = !hideNavbar;

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />

        {/*  صفحة login الموحدة */}
        <Route path="/login/:role" element={<Login />} />
        <Route path="/login-otp/:role" element={<LoginOTP />} />

        <Route path="/forgot-password/:role" element={<ForgotPassword />} />

        <Route path="/new-password/:role" element={<NewPassword />} />

        <Route path="/CraftsmanRegister" element={<CraftsmanRegister />} />
        <Route path="/verify-otp/:role" element={<VerifyOTP />} />
        <Route path="/CustomerRegister" element={<CustomerRegister />} />
        <Route path="/CompanyRegister" element={<CompanyRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/CraftmanOrdersPage" element={<CraftmanOrdersPage />} />
        <Route path="/CompanyOrdersPage" element={<CompanyOrdersPage />} />
        <Route path="/CustomerOrdersPage" element={<CustomerOrdersPage />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Artisans" element={<Artisans />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/FavoritesPage" element={<FavoritesPage />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/Brands" element={<Brands />} />
        <Route path="/OrderDetails" element={<OrderDetails />} />
        <Route path="/Faturuh" element={<Faturuh />} />
        <Route path="/Clientprofile" element={<Clientprofile />} />

        <Route path="/CraftmanProfile/:id" element={<CraftmanProfile />} />
        <Route path="/contactUs" element={<ContactUs />} />

        {/* صفحة 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
        <AppWrapper />
    </Router>
  );
}

export default App;
