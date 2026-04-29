<p align="center">
  <img src="readme-assets/etqan-logo.png" alt="ETQAN Logo — كل شيء بإتقان" width="450"/>
</p>

<h1 align="center">🛠 منصة إتقان — Etqan Platform</h1>

<p align="center">
  <b>A Comprehensive Digital Marketplace Connecting Customers with Skilled Craftsmen, Contractors, and Professional Tools across Egypt</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0050?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-7.13-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
</p>

---

## 📝 Project Overview

<img align="left" src="readme-assets/plumbing-workers.png" alt="Craftsmen at Work" width="250" style="margin-left: 15px;"/>

**Etqan (إتقان)** is a pioneering, full-stack front-end web platform designed to revolutionize the skilled trades and contracting market in Egypt. The name "Etqan" — Arabic for "mastery" and "perfection" — reflects the platform's core mission: to deliver high-quality, reliable craft services through a modern digital experience.

The platform serves as a **three-sided marketplace** that seamlessly connects **customers** seeking maintenance, renovation, and construction services with **verified craftsmen** across 20+ specialized trades and **contracting companies** capable of managing large-scale projects. Beyond services, Etqan features a fully integrated **e-commerce store** offering professional-grade tools and equipment from globally recognized brands such as DeWalt, Makita, Bosch, Milwaukee, and KNIPEX.

Built entirely as a **Single Page Application (SPA)** using React 19 and Vite 7, the platform emphasizes speed, interactivity, and a premium user experience — leveraging modern animations, responsive design, and intuitive navigation to ensure that every interaction feels polished and professional.

<br clear="both"/>

---

## 👥 Target Users

The platform is architected to serve **three distinct user roles**, each with a dedicated registration flow, profile system, and order management interface:

<table align="center">
  <tr>
    <td width="33%" align="center">
      <b>👤 Customers (العملاء)</b>
    </td>
    <td width="33%" align="center">
      <b>🔧 Craftsmen (الحرفيون)</b>
    </td>
    <td width="33%" align="center">
      <b>🏢 Companies (الشركات)</b>
    </td>
  </tr>
</table>

### 👤 Customers
- Browse and search for craftsmen across 20+ specialized trade categories.
- Submit service requests and track order statuses in real time.
- Shop professional tools and equipment from the integrated Etqan Store.
- Rate craftsmen and leave verified reviews to promote transparency.
- Manage a personal profile with service history and complaint submission capabilities.
- Communicate directly with craftsmen via the built-in real-time chat system.

### 🔧 Craftsmen
- Build a professional portfolio profile showcasing skills, experience, service areas, work gallery, and customer reviews.
- Receive and manage service requests from customers with a dedicated orders dashboard.
- Purchase necessary tools and equipment through the platform's store.
- Edit and update profile information, including date of birth (with age verification), service pricing, and password management.

### 🏢 Companies
- Create a comprehensive company profile displaying services, expertise, years of experience, and project portfolios.
- Receive large-scale project requests (construction, finishing, building material transport, heavy equipment rental, furniture moving).
- Manage company orders and interact with customers through a dedicated interface.

---

## ⚒️ Core Services

<table>
  <tr>
    <td width="55%">
      <h3>🔗 Customer-to-Craftsman Matching</h3>
      <p>An intelligent filtering and browsing system that connects customers with the best-suited professionals across 20+ specializations — including plumbing, carpentry, electrical, welding, HVAC, painting, plastering, masonry, tile work, aluminum work, demolition, pest control, satellite installation, smart security systems, engineering consultancy, and more.</p>
      <h3>🛒 Etqan Store (E-Commerce)</h3>
      <p>A full-featured online store for professional tools and equipment from premium international brands (DeWalt, Makita, Bosch, Milwaukee, KNIPEX, Metabo, RYOBI, Snap-on, BAHCO). Features include product search, discount badges, favorites/wishlist, shopping cart with quantity controls (max 5 per item), product ratings, and integrated Google Maps for delivery location pinpointing.</p>
      <h3>🏗️ Contracting & Logistics Services</h3>
      <p>A dedicated directory connecting customers with contracting companies for construction, finishing, building waste removal, sand & gravel transport, heavy equipment rental, and furniture moving — each with its own provider listing page.</p>
      <h3>⭐ Rating & Trust System</h3>
      <p>A transparent review and rating mechanism where customers can rate craftsmen and companies, view rating distributions (bar charts), and submit complaints — ensuring accountability and quality assurance across the platform.</p>
      <h3>💬 Real-Time Chat</h3>
      <p>A built-in messaging system with conversation list, search, online status indicators, unread message badges, file/image attachment support (via drag & drop or file picker), and an intuitive message interface.</p>
    </td>
  </tr>
</table>

---

## 🗂️ Application Architecture & Page Structure

The application comprises **25+ distinct pages/views**, managed via React Router v7 with dynamic route parameters:

```
📁 Etqan (إتقان)
├── 🏠 Index Page — Role selection (Customer / Craftsman / Company) with animated landing
├── 🔑 Authentication System
│   ├── Login (role-specific: /login/:role)
│   ├── Login via OTP (/login-otp/:role)
│   ├── Forgot Password (/forgot-password/:role)
│   ├── Verify OTP (/verify-otp/:role)
│   ├── Set New Password (/new-password/:role)
│   ├── Customer Registration
│   ├── Craftsman Registration
│   └── Company Registration
├── 🏡 Home Page
│   ├── Hero Section — Animated statistics counter (500+ craftsmen, 1300+ satisfied clients, 4.8★ rating)
│   ├── Main Services Grid (Craftsmen, Contractors, Products)
│   ├── Top Craftsmen Carousel (Swiper with auto-play)
│   ├── Customer Testimonials Carousel
│   └── Contact Us Form (with validation)
├── 🔧 Services Page — 20+ trade specializations with search filtering
├── 👷 Artisans Page — Browse craftsmen by specialization
├── 🏢 Companies Directory — Service categories (Construction, Transport, Equipment Rental, etc.)
├── 📋 Provider Listings — Filtered company results per category
├── 🛒 Store (Products Page) — Best sellers, brands grid, offers section, search, map, ratings modal
├── 📦 Product Details — Individual product view
├── ❤️ Favorites / Wishlist — Saved products with bulk cart addition
├── 🛍️ Shopping Cart — Quantity control, order summary, checkout
├── 🧾 Invoice (Faturuh) — Detailed service invoice with payment methods
├── 👤 User Profiles
│   ├── Craftsman Profile (/CraftmanProfile/:id) — Portfolio, works gallery, reviews, edit form
│   ├── Company Profile (/CompanyProfile/:id) — Stats, about, services, reviews, edit form
│   └── Client Profile — Service history, reviews, complaints, edit form
├── 📋 Order Management
│   ├── Customer Orders Page
│   ├── Craftsman Orders Page
│   └── Company Orders Page
├── 💬 Chat Page — Real-time messaging with conversation sidebar
├── ℹ️ About Us — Mission, features, vision with animated sections
├── 📞 Contact Us — Contact form with validation & complaint submission
├── 🔐 Order Details — Detailed order view
└── 🚫 404 Page — Custom "Page Not Found"
```

---

## 💻 Technologies Used

<img align="right" src="readme-assets/electrician-ladder.png" alt="Electrician Working" width="200" style="margin-right: 15px;"/>

The front-end is built using a modern, performance-oriented technology stack carefully selected for speed, developer experience, and scalability:

<br clear="both"/>

| Technology | Version | Purpose & Rationale |
| :--- | :---: | :--- |
| **React.js** | 19.2 | Core UI library using functional components, hooks (`useState`, `useEffect`, `useRef`, `useLayoutEffect`), and the component composition pattern for maximum reusability. Chosen for its massive ecosystem, stability, and ideal fit for interactive SPA platforms. |
| **Vite** | 7.2 | Lightning-fast build tool and dev server with near-instant Hot Module Replacement (HMR). Selected over Webpack for its superior cold-start performance and modern ESM-first architecture. |
| **React Router** | 7.13 | Client-side routing with dynamic parameters (`:role`, `:id`), nested routes, and `NavLink` active state management. Provides seamless page transitions without full-page reloads. |
| **Framer Motion** | 12.29 | Advanced declarative animation library used for the landing page's entrance animations, floating effects, and frame reveal transitions. Provides production-grade motion with minimal code. |
| **AOS (Animate On Scroll)** | 2.3 | Scroll-triggered animations (`fade-up`, `fade-left`, `zoom-in`, `flip-left`) applied globally across sections. Adds visual polish and engagement during browsing. |
| **Swiper** | 12.1 | Touch-enabled carousel/slider library with autoplay, pagination, and navigation. Used for the "Top Craftsmen" and "Testimonials" sections on the home page. Fully responsive with mobile breakpoints. |
| **Bootstrap** | 5.3 | CSS framework providing a responsive grid system and pre-built utility classes. Ensures consistent layout behavior across all device sizes. |
| **Tailwind CSS** | 4.1 | Utility-first CSS framework integrated via PostCSS for rapid styling and fine-grained design control where needed alongside CSS Modules. |
| **React-Leaflet / Leaflet** | 5.0 / 1.9 | Open-source mapping library used in the Store page for delivery location selection. Integrates Google Maps embed for geolocation-based experiences. |
| **React Icons** | 5.5 | Comprehensive icon library supporting Font Awesome, Material Design, Feather, Ionicons, and more — providing consistent, high-quality iconography throughout the application. |
| **React Select** | 5.10 | Enhanced dropdown/select component with search, filtering, and customizable styling. Used for specialty and region selection in forms. |
| **ESLint** | 9.39 | JavaScript linter with React Hooks and React Refresh plugins for code quality enforcement and catching common errors during development. |
| **PostCSS + Autoprefixer** | 8.5 / 10.4 | CSS processing pipeline ensuring cross-browser compatibility and modern CSS feature support. |
| **gh-pages** | 6.3 | Deployment utility for publishing the production build to GitHub Pages. |

### Design & Styling Approach

The project employs a **hybrid styling architecture** combining:
- **Component-scoped CSS files** (e.g., `Home.jsx` → `HomeStyle.css`) — one CSS file per component for isolation and maintainability.
- **Custom Google Fonts** — Arabic typography via Almarai, El Messiri, and Lateef; Latin typography via Montserrat, Ubuntu, and Work Sans.
- **Custom scrollbar styling** — Branded teal-colored scrollbar (`#3e7c87`) matching the platform's design language.
- **RTL (Right-to-Left) support** — Full Arabic language interface with proper RTL layout, text alignment, and component direction.

---

## 🌟 Key Features & Advantages

### Platform Features

| Feature | Description |
| :--- | :--- |
| **Multi-Role Authentication** | Separate registration and login flows for Customers, Craftsmen, and Companies — each with role-specific form fields, validation, and OTP verification. |
| **20+ Trade Specializations** | Comprehensive coverage of skilled trades (plumbing, carpentry, electrical, welding, HVAC, painting, plastering, masonry, tiling, aluminum, demolition, gas, upholstery, transportation, appliance repair, pest control, cleaning, satellite, smart security, engineering consultancy). |
| **Rich Craftsman Profiles** | Portfolio pages with cover photos, avatars, verification badges, about sections, services lists, work information (area, hours, response time, emergency service), work gallery with lightbox viewer, and customer reviews with rating distribution. |
| **E-Commerce Store** | Product catalog with image sliders, discount badges, search filtering, wishlist (localStorage-persisted), shopping cart with quantity limits, brands directory, and product rating modals. |
| **Geolocation Integration** | Google Maps embed with browser geolocation API for delivery location pinpointing in the store. |
| **Real-Time Chat** | Full messaging interface with conversation list, search, online/offline indicators, unread badges, image attachments (file picker + drag & drop), and keyboard shortcuts (Enter to send, Escape to close). |
| **Invoice Generation** | Detailed service invoice page with craftsman/customer data cards, itemized service table, pricing summary (subtotal, fees, discounts, tax), and multiple payment method options. |
| **Animated Statistics** | Intersection Observer-based animated number counters on the home page hero section, counting up to platform metrics on scroll. |
| **Form Validation** | Client-side validation across all forms: email format (regex), Egyptian phone numbers (01x pattern, 11 digits), password matching, date of birth with masked input (`DD/MM/YYYY`) and calendar picker with 18+ age verification. |
| **Service Pricing Logic** | Craftsman service price input that rounds to the nearest 5 EGP on blur. |
| **Favorites Persistence** | Wishlist data persisted via `localStorage` with add-all-to-cart functionality. |
| **Responsive Design** | Fully responsive layouts from mobile (320px) to desktop, with hamburger menu navigation, breakpoint-aware Swiper configurations, and adaptive grid layouts. |
| **404 Error Page** | Custom "Page Not Found" component for unmatched routes. |

### Technical Advantages

- **Zero-reload Navigation** — SPA architecture ensures instant page transitions.
- **Optimized Asset Loading** — SVG-first approach for icons and illustrations, reducing payload size.
- **State Isolation** — Component-level state management with React hooks for predictable data flow.
- **Conditional Rendering** — Navbar and Footer are intelligently hidden on authentication and landing pages.
- **Scroll Management** — Programmatic scroll-to-top on page mount with multi-timeout strategy to counteract AOS layout shifts.
- **Accessibility Considerations** — Semantic HTML, aria-labels on interactive elements, and keyboard navigation support.

---

## 📚 Lessons Learned

Building the Etqan platform provided invaluable hands-on experience across multiple dimensions of modern front-end development:

### Architecture & Design Patterns
- **Component-Driven Architecture**: Structuring a large application (25+ pages, 30+ components) into reusable, self-contained modules reinforced the importance of composition over inheritance in React.
- **Role-Based Routing**: Implementing dynamic routes with parameters (`:role`, `:id`) taught effective patterns for multi-user-type applications without code duplication.
- **State Management at Scale**: Managing complex form state (multi-step validations, masked inputs, password visibility toggles) within functional components demonstrated both the power and limitations of `useState`/`useRef` hooks.

### UI/UX Engineering
- **Animation Libraries Synergy**: Combining Framer Motion (entrance/layout animations) with AOS (scroll-triggered effects) showed how multiple animation systems can coexist — while also revealing the need for careful scroll management to prevent conflicts.
- **RTL Design Complexity**: Building a fully Arabic-language interface required deep understanding of bidirectional text rendering, mirrored layouts, and RTL-aware component libraries.
- **Form UX Best Practices**: Implementing the date-of-birth masked input (`--/--/----` with auto-fill, backspace handling, cursor positioning, and calendar picker fallback) demonstrated the complexity of creating truly user-friendly form inputs.

### E-Commerce Patterns
- **Client-Side Cart Management**: Using `localStorage` for cart and favorites persistence provided a practical understanding of offline-first data patterns, including synchronization between pages and quantity limit enforcement.
- **Search & Filter Architecture**: Implementing real-time search filtering across products, services, and chat conversations reinforced efficient array filtering and state derivation techniques.

### Technical Depth
- **Intersection Observer API**: Using the Intersection Observer for animated number counters on the home page provided hands-on experience with this powerful browser API for scroll-based interactions.
- **File Handling in the Browser**: The chat system's image attachment feature (FileReader API, drag & drop events, data URLs) deepened understanding of browser-native file processing.
- **Geolocation API**: Integrating the browser's Geolocation API with Google Maps embeds for the store's delivery feature showcased real-world location-based service implementation.

---

## 🎯 Conclusions

The **Etqan Platform** successfully demonstrates the viability and depth of building a comprehensive, production-quality marketplace front-end using modern React and its ecosystem. Key outcomes include:

1. **Comprehensive Marketplace Architecture**: The three-sided marketplace model (Customer ↔ Craftsman ↔ Company) proves that complex multi-stakeholder platforms can be elegantly structured using React's component model and dynamic routing — serving distinct user journeys from a single, unified codebase.

2. **Rich User Experience at Scale**: With 25+ interconnected pages, animated transitions, interactive carousels, real-time chat, geolocation integration, and a full e-commerce flow, the platform demonstrates that modern front-end technologies can deliver feature-rich experiences rivaling native applications.

3. **Design System Maturity**: The hybrid styling approach (component-scoped CSS + Bootstrap grid + Tailwind utilities + custom Google Fonts) establishes a flexible and maintainable design system capable of supporting a visually cohesive, RTL-first Arabic interface with premium aesthetics.

4. **Frontend-Ready for Backend Integration**: The entire application is architecturally prepared for backend integration. Authentication flows include commented API call templates, form submissions log structured data, and the chat system's mock data layer can be transparently replaced with WebSocket or REST API connections.

5. **Real-World Problem Solving**: Etqan addresses a genuine market gap in the Egyptian skilled trades sector. By digitizing the craftsman discovery, hiring, and review process — and combining it with an e-commerce store and contracting services — the platform creates a unified ecosystem that benefits all stakeholders.

6. **Educational Foundation**: The project serves as a comprehensive learning artifact covering virtually every core aspect of modern front-end development: SPA routing, state management, form validation, animation, responsive design, e-commerce patterns, real-time communication interfaces, geolocation, and file handling.

---

## ⚙️ Local Development Setup

To clone and run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khaled-el-badawy/etqan.git
   cd etqan
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
etqan/
├── public/
│   └── images/              # Static assets (SVG icons, product images, user avatars, brand logos)
├── src/
│   ├── assets/              # React-managed assets
│   ├── components/          # 30+ React components (JSX + scoped CSS files)
│   │   ├── Index.jsx        # Landing page with role selection
│   │   ├── Home.jsx         # Main dashboard with hero, services, testimonials
│   │   ├── Login.jsx        # Role-based authentication
│   │   ├── Service.jsx      # 20+ trade specialization grid
│   │   ├── Products.jsx     # E-commerce store with search, cart, map
│   │   ├── Chat.jsx         # Real-time messaging interface
│   │   ├── CraftmanProfile.jsx  # Detailed craftsman portfolio
│   │   ├── CompanyProfile.jsx   # Company profile with services & reviews
│   │   ├── Clientprofile.jsx    # Customer profile with history & settings
│   │   ├── Navbar.jsx       # Dynamic navigation with role-based links
│   │   ├── Footer.jsx       # Site-wide footer with social links
│   │   └── ...              # Registration, orders, cart, favorites, invoice, etc.
│   ├── App.jsx              # Root component with routing configuration
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles (fonts, scrollbar, selection)
├── index.html               # HTML entry point
├── vite.config.js           # Vite build configuration
├── package.json             # Dependencies and scripts
├── eslint.config.js         # Linting configuration
└── README.md                # This file
```

---

<p align="center">
  <img src="readme-assets/etqan-logo.png" alt="ETQAN Logo" width="300"/>
  <br/><br/>
  <b>صُنع بإتقان بواسطة فريق إتقان — Built with Mastery by Team Etqan</b>
  <br/>
  <sub>© 2026 Etqan Platform — All Rights Reserved</sub>
</p>
