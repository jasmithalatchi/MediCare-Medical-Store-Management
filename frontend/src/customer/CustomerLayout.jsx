import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Heart,
  FileCheck2,
} from 'lucide-react';

const customerNavLinks = [
  { to: '/customer', label: 'My Dashboard', icon: LayoutDashboard, end: true },
  { to: '/customer/profile', label: 'My Profile', icon: User },
  { to: '/customer/my-orders', label: 'Order History', icon: ShoppingBag },
  { to: '/customer/my-wishlist', label: 'Saved Wishlist', icon: Heart },
  { to: '/customer/my-prescriptions', label: 'My Prescriptions', icon: FileCheck2 },
];

const CustomerLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)', background: '#f8fafc' }}>
      <Sidebar links={customerNavLinks} title="Customer Portal" />
      <main style={{ flex: 1, padding: '32px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
