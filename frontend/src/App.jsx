import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Core UI Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalogue from './pages/Catalogue';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetails from './pages/ProductDetails';
import BabyCare from './pages/BabyCare';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';

// Admin Portal Pages
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ManageMedicines from './admin/ManageMedicines';
import AddMedicine from './admin/AddMedicine';
import ManageInventory from './admin/ManageInventory';
import ManageOrders from './admin/ManageOrders';
import ManageCustomers from './admin/ManageCustomers';
import ManageOffers from './admin/ManageOffers';
import ManagePrescriptions from './admin/ManagePrescriptions';
import Reports from './admin/Reports';

// Customer Portal Pages
import CustomerLayout from './customer/CustomerLayout';
import CustomerDashboard from './customer/CustomerDashboard';
import MyProfile from './customer/MyProfile';
import MyOrders from './customer/MyOrders';
import MyWishlist from './customer/MyWishlist';
import MyPrescriptions from './customer/MyPrescriptions';

// Store Layout Wrapper with Navbar & Footer
const StoreLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Storefront Layout */}
            <Route element={<StoreLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/catalogue/:id" element={<ProductDetails />} />
              <Route path="/category/:categoryName" element={<CategoryProducts />} />
              <Route path="/baby-care" element={<BabyCare />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Storefront Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Route>

            {/* Admin Portal (Protected: Admin Only) */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="medicines" element={<ManageMedicines />} />
                <Route path="add-medicine" element={<AddMedicine />} />
                <Route path="inventory" element={<ManageInventory />} />
                <Route path="orders" element={<ManageOrders />} />
                <Route path="customers" element={<ManageCustomers />} />
                <Route path="offers" element={<ManageOffers />} />
                <Route path="prescriptions" element={<ManagePrescriptions />} />
                <Route path="reports" element={<Reports />} />
              </Route>
            </Route>

            {/* Customer Portal (Protected: Authenticated Users) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/customer" element={<CustomerLayout />}>
                <Route index element={<CustomerDashboard />} />
                <Route path="profile" element={<MyProfile />} />
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="my-wishlist" element={<MyWishlist />} />
                <Route path="my-prescriptions" element={<MyPrescriptions />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
