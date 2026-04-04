import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import CraftsmanForgotPassword from "./components/CraftsmanForgotPassword";
import CraftsmanCode from "./components/CraftsmanCode";
import CraftsmanNewPassword from "./components/CraftsmanNewPassword";
import CustomerForgotPassword from "./components/CustomerForgotPassword";
import CustomerNewPassword from "./components/CustomerNewPassword";
import CustomerCode from "./components/CustomerCode";
import CompanyForgotPassword from "./components/CompanyForgotPassword";
import CompanyCode from "./components/CompanyCode";
import CompanyNewPassword from "./components/CompanyNewPassword";
import CraftsmanRegister from "./components/CraftsmanRegister";
import VerifyOTP from "./components/VerifyOTP";
import CustomerRegister from "./components/CustomerRegister";
import CustomerLogin from "./components/CustomerLogin";
import CustomerOTP from "./components/CustomerOTP";
import CompanyRegister from "./components/CompanyRegister";
import CompanyLogin from "./components/CompanyLogin";
import CompanyOTP from "./components/CompanyOTP";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Index from "./components/Index";
import CustomerOrdersPage from "./components/CustomerOrdersPage";
import HandyOrdersPage from "./components/HandyOrdersPage";
import Service from "./components/Service";
import Artisans from "./components/Artisans";

import Products from "./components/Products";
import CartPage from "./components/CartPage";

import ProProfile from "./components/ProProfile";
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

  const hideNavbarRoutes = [
    "/",
    "/index",
    "/Login",
    "/CraftsmanRegister",
    "/Verify-otp",
    "/CustomerRegister",
    "/CustomerLogin",
    "/CustomerOTP",
    "/CompanyRegister",
    "/CompanyLogin",
    "/CompanyOTP",
<<<<<<< HEAD
    "/CraftsmanForgotPassword",
    "/craftsmanCode",
    "/CraftsmanNewPassword",
    "/CustomerForgotPassword",
    "/CustomerCode",
    "/CustomerNewPassword",
     "/CompanyForgotPassword",
    "/CompanyCode",
    "/CompanyNewPassword",
    
=======
>>>>>>> 5b2035b123794d80ec46b350fd1cb90d42b428da
  ];

  const hideFooterRoutes = [
    "/",
    "/index",
    "/Login",
    "/CraftsmanRegister",
    "/Verify-otp",
    "/CustomerRegister",
    "/CustomerLogin",
    "/CustomerOTP",
    "/CompanyRegister",
    "/CompanyLogin",
    "/CompanyOTP",
<<<<<<< HEAD
    "/CraftsmanForgotPassword",
    "/craftsmanCode",
    "/CraftsmanNewPassword",
    "/CustomerForgotPassword",
    "/CustomerCode",
    "/CustomerNewPassword",
    "/CompanyForgotPassword",
    "/CompanyCode",
    "/CompanyNewPassword",
=======
>>>>>>> 5b2035b123794d80ec46b350fd1cb90d42b428da
  ];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  const showFooter = !hideFooterRoutes.includes(location.pathname);
  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CraftsmanForgotPassword" element={<CraftsmanForgotPassword />} />
        <Route path="/CraftsmanCode" element={<CraftsmanCode />} />
        <Route path="/CraftsmanNewPassword" element={<CraftsmanNewPassword />} />
        <Route path="/CustomerCode" element={<CustomerCode />} />
        <Route path="/CustomerNewPassword" element={<CustomerNewPassword />} />
        <Route path="/CustomerForgotPassword" element={<CustomerForgotPassword />} />

        <Route path="/CompanyCode" element={<CompanyCode />} />
        <Route path="/CompanyNewPassword" element={<CompanyNewPassword />} />
        <Route path="/CompanyForgotPassword" element={<CompanyForgotPassword />} />

        <Route path="/CraftsmanRegister" element={<CraftsmanRegister />} />
        <Route path="/Verify-otp" element={<VerifyOTP />} />
        <Route path="/CustomerRegister" element={<CustomerRegister />} />
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
        <Route path="/CustomerOTP" element={<CustomerOTP />} />
        <Route path="/CompanyRegister" element={<CompanyRegister />} />
        <Route path="/CompanyLogin" element={<CompanyLogin />} />
        <Route path="/CompanyOTP" element={<CompanyOTP />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/HandyOrdersPage" element={<HandyOrdersPage />} />
        <Route path="/CustomerOrdersPage" element={<CustomerOrdersPage />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Artisans" element={<Artisans />} />
        <Route path="/Products" element={<Products />} />
<<<<<<< HEAD
        <Route path="/CartPage" element={<CartPage />} />
=======
>>>>>>> 5b2035b123794d80ec46b350fd1cb90d42b428da
        <Route path="/OrderDetails" element={<OrderDetails />} />
        <Route path="/Faturuh" element={<Faturuh/>} />
        <Route path="/Clientprofile" element={<Clientprofile/>} />

        {/* <Route path="/ProProfile" element={<ProProfile />} /> */}
        <Route path="/ProProfile/:id" element={<ProProfile />} />
        
        <Route path="/contactUs" element={<ContactUs />} />
        {/* // الصفحة الافتراضية لعدم وجود مسار */}
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
