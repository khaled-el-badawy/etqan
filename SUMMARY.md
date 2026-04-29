<p align="center">
  <img src="readme-assets/etqan-logo.png" alt="ETQAN Logo" width="350"/>
</p>

<h1 align="center">📋 Etqan Platform — Executive Summary</h1>

---

## What Is Etqan?

**Etqan (إتقان)** is a comprehensive digital marketplace platform that connects customers in Egypt with skilled craftsmen, contracting companies, and professional tools — all in one place. Think of it as the **"one-stop shop" for all home maintenance, renovation, construction, and professional tool needs** in the Egyptian market.

---

## What Does This Website Do?

At its core, Etqan performs **four primary functions**:

| Function | What It Does |
| :--- | :--- |
| **🔧 Craftsman Matching** | Customers can browse, search, and hire verified craftsmen across **20+ trade specializations** (plumbing, carpentry, electrical, welding, HVAC, painting, tiling, masonry, and more). Each craftsman has a rich profile with a portfolio, work gallery, services list, working hours, and customer reviews. |
| **🏗️ Contracting Services** | Customers can find and request services from contracting companies for large-scale projects — including construction, finishing, building waste removal, sand & gravel transport, heavy equipment rental, and furniture moving. |
| **🛒 E-Commerce Store** | A fully integrated online shop for professional tools and equipment from premium global brands (DeWalt, Makita, Bosch, Milwaukee, KNIPEX, etc.) with search, discounts, wishlists, shopping cart, and Google Maps-based delivery location selection. |
| **💬 Communication Hub** | A built-in real-time chat system allowing customers and craftsmen to communicate directly, share images, and coordinate services. |

---

## Who Is It For?

The platform serves **three user types**, each with dedicated interfaces:

- **👤 Customers** — Search for craftsmen, request services, shop for tools, rate service providers, track orders, and manage their profile.
- **🔧 Craftsmen** — Showcase their portfolio, receive job requests, communicate with clients, buy tools, and manage their professional presence.
- **🏢 Companies** — Display company services, receive project requests, and manage their company profile and order pipeline.

---

## Technology Stack at a Glance

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19.2 (Functional Components + Hooks) |
| **Build Tool** | Vite 7.2 |
| **Routing** | React Router v7.13 (SPA with dynamic routes) |
| **Styling** | Component-scoped CSS, Bootstrap 5.3, Tailwind CSS 4.1, Google Fonts (Arabic + Latin) |
| **Animations** | Framer Motion 12 (entrance animations), AOS 2.3 (scroll-triggered effects) |
| **UI Components** | Swiper 12 (carousels), React Icons 5.5, React Select 5.10 |
| **Maps** | React-Leaflet / Leaflet + Google Maps embed |
| **Code Quality** | ESLint 9.39, PostCSS, Autoprefixer |
| **Deployment** | gh-pages (GitHub Pages) |

---

## Key Features Summary

✅ **Multi-role authentication** with role-specific registration, login, OTP verification, and password recovery  
✅ **20+ trade specializations** with searchable service directory  
✅ **Rich craftsman profiles** — portfolios, work galleries, reviews, rating distributions, and verified badges  
✅ **Company profiles** — services, stats, reviews, and service request modals  
✅ **Full e-commerce flow** — product catalog, search, wishlists, cart, quantity limits, brand filtering, and checkout  
✅ **Geolocation-based delivery** — browser location API with Google Maps embed  
✅ **Real-time chat** — conversation list, search, online indicators, file/image attachments, drag & drop  
✅ **Invoice generation** — itemized service invoices with pricing breakdowns and payment methods  
✅ **Animated statistics** — scroll-triggered number counters using Intersection Observer  
✅ **Advanced form validation** — email regex, phone format (Egyptian), date of birth mask with 18+ age check, password matching  
✅ **Fully responsive** — mobile-first design from 320px to desktop  
✅ **RTL Arabic interface** — complete right-to-left layout with Arabic typography  
✅ **Client-side data persistence** — cart and favorites stored in localStorage  
✅ **Custom 404 page** — graceful error handling for unmatched routes  

---

## What Was Learned?

This project served as a comprehensive learning exercise covering:

- **Component architecture** at scale (30+ components, 25+ pages)
- **Multi-role SPA routing** with dynamic parameters
- **Complex form UX** (masked date inputs, calendar pickers, real-time validation)
- **Animation system design** (combining Framer Motion + AOS without conflicts)
- **RTL/Arabic UI engineering** (bidirectional text, mirrored layouts)
- **Client-side e-commerce patterns** (cart, wishlist, localStorage sync)
- **Browser APIs** (Intersection Observer, Geolocation, FileReader, drag & drop)
- **Responsive design** across all device breakpoints

---

## Conclusions

Etqan demonstrates that a **production-quality, feature-rich marketplace** can be built entirely on the modern React front-end stack. The platform is fully prepared for backend integration — with authentication flows, API call templates, and structured data submissions already in place. It addresses a real market need in Egypt's skilled trades sector and serves as both a functional prototype and a comprehensive educational reference for modern web development.

---

<p align="center">
  <sub><b>© 2026 Etqan Platform — All Rights Reserved</b></sub>
  <br/>
  <sub>For the full technical documentation, see <a href="README.md">README.md</a></sub>
</p>
