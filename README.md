# MediCare – Medical Store Management System

A modern, full-stack Medical Store & Pharmacy Management web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Vite.

---

## 🚀 Tech Stack

- **Frontend:** React 18, Vite, React Router DOM, Axios, Lucide React (Icons), CSS3 / Vanilla Modern CSS
- **Backend:** Node.js, Express.js, Mongoose, JSON Web Tokens (JWT), Bcrypt.js, Multer, Cors, Dotenv
- **Database:** MongoDB & Mongoose ODM
- **Architecture:** Modular MVC backend pattern with separated Routes, Controllers, Models, and Middleware; Component-driven React frontend with Context API for state management.

---

## 📁 Project Structure

```
MediCare/
├── frontend/                     # React + Vite frontend application
│   ├── public/                   # Static assets (images, icons)
│   ├── src/
│   │   ├── assets/               # Local styles and static assets
│   │   ├── components/           # Reusable UI components (Navbar, Footer, Cards, etc.)
│   │   ├── pages/                # Public store pages (Home, Catalogue, Cart, etc.)
│   │   ├── admin/                # Admin portal dashboard and management screens
│   │   ├── customer/             # Customer portal dashboard and order tracking
│   │   ├── context/              # React Context providers (AuthContext, CartContext)
│   │   ├── services/             # Axios API integration layer
│   │   ├── App.jsx               # Main React router configuration
│   │   ├── main.jsx              # React DOM entry point
│   │   └── index.css             # Global styling
│   ├── index.html                # HTML5 entry template
│   ├── vite.config.js            # Vite configuration
│   ├── package.json              # Frontend dependencies and build scripts
│   └── .env.example              # Frontend environment variables template
│
├── backend/                      # Node.js + Express REST API
│   ├── config/                   # Database connection configuration (MongoDB)
│   ├── models/                   # Mongoose data schemas (User, Medicine, Order, etc.)
│   ├── controllers/              # Request handlers and business logic
│   ├── routes/                   # Express API route declarations
│   ├── middleware/               # Authentication, role verification & error handling
│   ├── utils/                    # Utility helpers (JWT token generation)
│   ├── uploads/                  # Upload directory for uploaded prescriptions
│   ├── server.js                 # Express server bootstrap & middleware pipeline
│   ├── package.json              # Backend dependencies and scripts
│   └── .env.example              # Backend environment variables template
│
├── database/
│   └── seed/
│       ├── seedMedicines.js      # Seed script for initial medicine catalog data (325 products)
│       └── seedUsers.js          # Safe seed script for initial Admin and Demo Customer accounts
│
├── screenshots/                  # Application previews and UI screenshots
├── package.json                  # Root monorepo workspace configuration
├── .gitignore                    # Git exclusions
└── README.md                     # Project documentation
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- npm or pnpm / yarn

### 2. Environment Configuration
Create `.env` files in both `backend/` and `frontend/` folders using their respective `.env.example` templates:

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/medicare_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

**Frontend (`frontend/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Installation
From the root workspace directory, install dependencies:
```bash
# Install root, backend, and frontend dependencies
npm run install:all
```

### 4. Database Seeding (Optional)
Populate the database with demo medicines and initial user accounts:
```bash
# Seed both medicines (325 products) and accounts (Admin & Customer)
npm run seed

# Or seed individually:
npm run seed:medicines
npm run seed:users
```

### 5. Running the Application
Run both backend and frontend concurrently:
```bash
npm run dev
```

Or run each service individually:
```bash
# Backend server (http://localhost:5000)
npm run dev:backend

# Frontend client (http://localhost:5173)
npm run dev:frontend
```

---

## 🔒 Roles & Access Control
- **Public:** Browse catalog, search medicines, view categories, filter offers.
- **Customer:** Authenticated portal for order history, prescription uploads, profile, and wishlist management.
- **Admin:** Protected portal for medicine catalog CRUD, inventory stock control, order status processing, and business reports.
