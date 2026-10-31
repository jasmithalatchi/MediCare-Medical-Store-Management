import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  LayoutDashboard,
  Pill,
  PlusCircle,
  Boxes,
  ClipboardList,
  Users,
  Tag,
  FileCheck2,
  BarChart3,
} from 'lucide-react';

const adminNavLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/medicines', label: 'Manage Medicines', icon: Pill },
  { to: '/admin/add-medicine', label: 'Add Medicine', icon: PlusCircle },
  { to: '/admin/inventory', label: 'Manage Inventory', icon: Boxes },
  { to: '/admin/orders', label: 'Manage Orders', icon: ClipboardList },
  { to: '/admin/customers', label: 'Manage Customers', icon: Users },
  { to: '/admin/offers', label: 'Manage Offers', icon: Tag },
  { to: '/admin/prescriptions', label: 'Prescriptions', icon: FileCheck2 },
  { to: '/admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
];

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)', background: '#f8fafc' }}>
      <Sidebar links={adminNavLinks} title="MediCare Admin Portal" />
      <main style={{ flex: 1, padding: '32px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
