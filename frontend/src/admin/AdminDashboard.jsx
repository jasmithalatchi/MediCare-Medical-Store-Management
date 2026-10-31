import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingBag, Pill, AlertTriangle, FileCheck2, ArrowUpRight } from 'lucide-react';

const AdminDashboard = () => {
  const statCards = [
    { title: 'Total Revenue', value: '$12,450.00', change: '+14% this month', icon: DollarSign, color: '#059669', bg: '#ecfdf5' },
    { title: 'Total Orders', value: '384', change: '+8% this week', icon: ShoppingBag, color: '#0284c7', bg: '#f0f9ff' },
    { title: 'Active Medicines', value: '1,240', change: 'Catalog items', icon: Pill, color: '#8b5cf6', bg: '#f5f3ff' },
    { title: 'Pending Rx Verification', value: '7', change: 'Requires Pharmacist sign-off', icon: FileCheck2, color: '#d97706', bg: '#fef3c7' },
    { title: 'Low Stock Warnings', value: '4 items', change: 'Below reorder threshold', icon: AlertTriangle, color: '#ef4444', bg: '#fef2f2' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Admin Operational Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Store activity, pharmaceutical inventory status & order fulfillment</p>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {statCards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{c.title}</span>
                <div style={{ background: c.bg, color: c.color, padding: '8px', borderRadius: '8px' }}>
                  <Icon size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{c.value}</div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.change}</span>
            </div>
          );
        })}
      </div>

      {/* Quick Action Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Quick Inventory Tasks</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/admin/add-medicine" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px', color: '#1e293b', fontWeight: 500, fontSize: '0.9rem' }}>
              <span>Add New Medicine Batch</span>
              <ArrowUpRight size={16} color="#059669" />
            </Link>
            <Link to="/admin/inventory" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px', color: '#1e293b', fontWeight: 500, fontSize: '0.9rem' }}>
              <span>Review Low Stock Reorders</span>
              <ArrowUpRight size={16} color="#059669" />
            </Link>
            <Link to="/admin/prescriptions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px', color: '#1e293b', fontWeight: 500, fontSize: '0.9rem' }}>
              <span>Review Pending Prescriptions</span>
              <ArrowUpRight size={16} color="#059669" />
            </Link>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Order Dispatch Status</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
            All incoming prescriptions and customer orders ready for packaging & courier handover.
          </p>
          <Link to="/admin/orders" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#059669',
            color: '#ffffff',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}>
            Manage Orders Queue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
