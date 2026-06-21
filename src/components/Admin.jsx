import React, { useEffect, useState } from 'react';
import './Admin.css';
<<<<<<< HEAD
import axios from 'axios';
import {
  FaThLarge, FaUsers, FaTools, FaBoxOpen, FaBuilding,
  FaStar, FaExclamationTriangle, FaClipboardList,
  FaSearch, FaBell, FaUserCircle, FaSync
=======
import { 
  FaThLarge, FaUsers, FaTools, FaBoxOpen, FaBuilding, 
  FaStar, FaExclamationTriangle, FaClipboardList, 
  FaSearch, FaBell, FaUserCircle 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';

import Dashcustomer from './Dashcustomer';
<<<<<<< HEAD
import Dashartisans from './Dashartisans';
import Dashproducts from './Dashproducts';
import Dashcompanies from './Dashcompanies';
import DashRatings from './DashRatings';
import DashComplaints from './DashComplaints';
import Dashorders from './Dashorders';
=======
import Dashartisans from './Dashartisans'; 
import Dashproducts from './Dashproducts'; 
import Dashcompanies from './Dashcompanies'; 
import DashRatings from './DashRatings'; 
import DashComplaints from './DashComplaints'; 
import Dashorders from './Dashorders'; 
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb

const Admin = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
<<<<<<< HEAD
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [sRes, cRes] = await Promise.all([
        axios.get("https://etqanproject.runasp.net/api/AdminDashboard/stats", config),
        axios.get("https://etqanproject.runasp.net/api/AdminDashboard/growth-chart", config)
      ]);

      setStats([
        { id: 1, title: 'عدد العملاء', value: sRes.data.totalClients, image: '/images/admin/adminicon1.svg' },
        { id: 2, title: 'عدد الحرفيين', value: sRes.data.totalArtisans, image: '/images/admin/adminicon2.svg' },
        { id: 3, title: 'عدد الشركات', value: sRes.data.totalCompanies, image: '/images/admin/adminicon3.svg' },
        { id: 4, title: 'عدد المنتجات', value: sRes.data.totalProducts, image: '/images/admin/adminicon4.svg' },
      ]);

      setChartData(cRes.data.map(item => ({
        month: item.month,
        values: [item.clients, item.artisans, item.companies]
      })));
    } catch (err) { console.error("Error:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    fetchData();
  }, []);

  const renderContent = () => {
    if (loading && currentPage === 'home') return <div className="loading-box"><FaSync className="spinner" /> جاري التحميل...</div>;
    switch (currentPage) {
      case 'customers': return <Dashcustomer />;
      case 'artisans': return <Dashartisans />;
      case 'products': return <Dashproducts />;
      case 'companies': return <Dashcompanies />;
      case 'Ratings': return <DashRatings />;
      case 'Complaints': return <DashComplaints />;
      case 'orders': return <Dashorders />;
=======

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 50,
        delay: 50,
      });
    };
    initAOS();
    window.addEventListener('load', AOS.refresh);
    return () => {
      window.removeEventListener('load', AOS.refresh);
    };
  }, []);

  const stats = [
    { id: 1, title: 'عدد العملاء', value: '1842', image: '/images/admin/adminicon1.svg' },
    { id: 2, title: 'عدد الحرفيين', value: '490', image: '/images/admin/adminicon2.svg' },
    { id: 3, title: 'عدد الشركات', value: '113', image: '/images/admin/adminicon3.svg' },
    { id: 4, title: 'عدد المنتجات', value: '5000', image: '/images/admin/adminicon4.svg' },
  ];

  const chartData = [
    { month: 'Jan', values: [80, 40, 20] },
    { month: 'Feb', values: [60, 30, 25] },
    { month: 'Apr', values: [70, 50, 30] },
    { month: 'May', values: [40, 20, 15] },
    { month: 'June', values: [90, 45, 10] },
    { month: 'July', values: [85, 35, 20] },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'customers':
        return <Dashcustomer />;
      case 'artisans':
        return <Dashartisans />;
      case 'products':
        return <Dashproducts/>;
      case 'companies':
        return <Dashcompanies/>;
      case 'Ratings':
        return <DashRatings/>;
        case 'Complaints':
        return <DashComplaints/>;
        case 'orders':
        return <Dashorders/>;
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      default:
        return (
          <>
            <section className="welcome-card-box" data-aos="fade-left">
<<<<<<< HEAD
              <div className="welcome-content"><h1>👋 أهلاً بك</h1><p>ألقِ نظرة على حالة النظام اليوم</p></div>
            </section>
=======
              <div className="welcome-content">
                <h1>👋 أهلاً بك</h1>
                <p>ألقِ نظرة على حالة النظام اليوم</p>
              </div>
            </section>

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            <div className="stats-grid">
              {stats.map(stat => (
                <div className="stat-card-new" key={stat.id} data-aos="fade-up">
                  <div className="card-row-top">
<<<<<<< HEAD
                    <div className="stat-img-box"><img src={stat.image} alt={stat.title} /></div>
                    <div className="stat-value-box"><h3>{stat.value}</h3></div>
                  </div>
                  <div className="card-row-bottom"><p>{stat.title}</p></div>
                </div>
              ))}
            </div>
            <div className="chart-section" data-aos="zoom-in-up">
              <h2 className="chart-title">نمو المستخدمين (آخر 6 أشهر)</h2>
              <div className="chart-main-container">
                <div className="chart-y-axis"><span>50</span><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div>
=======
                    <div className="stat-img-box">
                      <img src={stat.image} alt={stat.title} />
                    </div>
                    <div className="stat-value-box">
                      <h3>{stat.value}</h3>
                    </div>
                  </div>
                  <div className="card-row-bottom">
                    <p>{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="chart-section" data-aos="zoom-in-up">
              <h2 className="chart-title">نمو المستخدمين (آخر 6 أشهر)</h2>
              <div className="chart-main-container">
                <div className="chart-y-axis">
                  <span>50</span><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
                </div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                <div className="chart-bars-area">
                  <div className="bars-wrapper-flex">
                    {chartData.map((data, idx) => (
                      <div className="single-month-group" key={idx}>
                        <div className="bars-triple">
<<<<<<< HEAD
                          <div className="bar blue" style={{ "--h": (data.values[0] * 2) + '%' }}></div>
                          <div className="bar orange" style={{ "--h": (data.values[1] * 2) + '%' }}></div>
                          <div className="bar green" style={{ "--h": (data.values[2] * 2) + '%' }}></div>
=======
                          <div className="bar green" style={{ "--h": data.values[2] + '%' }}></div>
                          <div className="bar orange" style={{ "--h": data.values[1] + '%' }}></div>
                          <div className="bar blue" style={{ "--h": data.values[0] + '%' }}></div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
                        </div>
                        <span className="month-name">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
<<<<<<< HEAD
=======
              <div className="chart-legend-bottom">
                <div className="legend-item"><span className="dot green"></span> الشركات</div>
                <div className="legend-item"><span className="dot orange"></span> الحرفيين</div>
                <div className="legend-item"><span className="dot blue"></span> العملاء</div>
              </div>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
            </div>
          </>
        );
    }
  };

  return (
    <div className="admin-container">
      <header className="dashboard-header-full">
        <div className="header-right-side-tools">
<<<<<<< HEAD
          <div className="header-user-info"><FaUserCircle className="user-icon" /><span>لوحة التحكم</span></div>
          <div className="notification-badge"><FaBell className="header-icon" /><span className="dot-notify"></span></div>
        </div>
        <div className="header-left-logo-fixed"><img src="/images/Logo1.svg" alt="Etqan" className="nav-logo-img" /></div>
      </header>
      <div className="admin-layout">
        <aside className="sidebar-small">
          <div className={`sidebar-item ${currentPage === 'home' ? 'active' : ''}`} onClick={() => setCurrentPage('home')}><FaThLarge /> <span>الرئيسية</span></div>
          <div className={`sidebar-item ${currentPage === 'customers' ? 'active' : ''}`} onClick={() => setCurrentPage('customers')}><FaUsers /> <span>العملاء</span></div>
          <div className={`sidebar-item ${currentPage === 'artisans' ? 'active' : ''}`} onClick={() => setCurrentPage('artisans')}><FaTools /> <span>الحرفيين</span></div>
          <div className={`sidebar-item ${currentPage === 'products' ? 'active' : ''}`} onClick={() => setCurrentPage('products')}><FaBoxOpen /> <span>المنتجات</span></div>
          <div className={`sidebar-item ${currentPage === 'companies' ? 'active' : ''}`} onClick={() => setCurrentPage('companies')}><FaBuilding /> <span>الشركات</span></div>
          <div className={`sidebar-item ${currentPage === 'Ratings' ? 'active' : ''}`} onClick={() => setCurrentPage('Ratings')}><FaStar /> <span>التقييمات</span></div>
          <div className={`sidebar-item ${currentPage === 'Complaints' ? 'active' : ''}`} onClick={() => setCurrentPage('Complaints')}><FaExclamationTriangle /> <span>الشكاوي</span></div>
          <div className={`sidebar-item ${currentPage === 'orders' ? 'active' : ''}`} onClick={() => setCurrentPage('orders')}><FaClipboardList /> <span>الطلبات</span></div>
        </aside>
        <main className="main-dashboard-large">{renderContent()}</main>
=======
          <div className="header-user-info">
            <FaUserCircle className="user-icon" />
            <span>اسم المسؤول</span>
          </div>
          <div className="notification-badge">
            <FaBell className="header-icon" />
            <span className="dot-notify"></span>
          </div>
          <div className="search-wrapper-fixed">
            <FaSearch className="header-icon" onClick={() => setIsSearchOpen(!isSearchOpen)} />
            <input 
              type="text" 
              placeholder="بحث..." 
              className={`search-input-absolute ${isSearchOpen ? 'open' : ''}`} 
            />
          </div>
        </div>
        <div className="header-left-logo-fixed">
          <img src="/images/Logo1.svg" alt="Etqan" className="nav-logo-img" />
        </div>
      </header>

      <div className="admin-layout">
        <aside className="sidebar-small">
          <div 
            className={`sidebar-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            <FaThLarge /> <span>الرئيسية</span>
          </div>

          <div 
            className={`sidebar-item ${currentPage === 'customers' ? 'active' : ''}`}
            onClick={() => setCurrentPage('customers')}
          >
            <FaUsers /> <span>العملاء</span>
          </div>

          <div 
            className={`sidebar-item ${currentPage === 'artisans' ? 'active' : ''}`}
            onClick={() => setCurrentPage('artisans')}
          >
            <FaTools /> <span>الحرفيين</span>
          </div>

          <div 
            className={`sidebar-item ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => setCurrentPage('products')}
          >
            <FaBoxOpen /> <span>المنتجات</span>
          </div>

          <div 
            className={`sidebar-item ${currentPage === 'companies' ? 'active' : ''}`}
            onClick={() => setCurrentPage('companies')}
          >
            <FaBuilding /> <span>الشركات</span>
          </div>

          <div 
            className={`sidebar-item ${currentPage === 'Ratings' ? 'active' : ''}`}
            onClick={() => setCurrentPage('Ratings')}
          >
            <FaStar /> <span>التقييمات</span>
          </div>

          <div 
            className={`sidebar-item ${currentPage === 'Complaints' ? 'active' : ''}`}
            onClick={() => setCurrentPage('Complaints')}
          >
            <FaExclamationTriangle /> <span>الشكاوي</span>
          </div>

          <div 
            className={`sidebar-item ${currentPage === 'orders' ? 'active' : ''}`}
            onClick={() => setCurrentPage('orders')}
          >
            <FaClipboardList /> <span>الطلبات</span>
          </div>
          
          
        </aside>

        <main className="main-dashboard-large">
          {renderContent()}
        </main>
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
      </div>
      <Footer />
    </div>
  );
};
<<<<<<< HEAD
=======

>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
export default Admin;