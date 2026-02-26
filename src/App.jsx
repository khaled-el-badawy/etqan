import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
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
import Products from "./components/Products";
import ProProfile from "./components/ProProfile";
import ContactUs from "./components/ContactUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


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
    "/CompanyOTP"
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
    "/home"
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
        <Route path="/Products" element={<Products />} />
        <Route path="/ProProfile" element={<ProProfile />} />
        <Route path="/contactUs" element={<ContactUs />} />

      </Routes>
      {showFooter && <Footer/>}
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