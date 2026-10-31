import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, FileCheck2, Heart, ArrowRight, UploadCloud } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Welcome back, {user?.name || 'Customer'}!
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Manage your medication orders, prescription renewals, and delivery addresses.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>My Orders</span>
            <div style={{ background: '#ecfdf5', color: '#059669', padding: '8px', borderRadius: '8px' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>View History</div>
          <Link to="/customer/my-orders" style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            Track Shipments <ArrowRight size={13} />
          </Link>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Prescriptions</span>
            <div style={{ background: '#f0f9ff', color: '#0284c7', padding: '8px', borderRadius: '8px' }}>
              <FileCheck2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>My Rx Files</div>
          <Link to="/customer/my-prescriptions" style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            Upload & Verify <ArrowRight size={13} />
          </Link>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Wishlist</span>
            <div style={{ background: '#fef2f2', color: '#ef4444', padding: '8px', borderRadius: '8px' }}>
              <Heart size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Saved Meds</div>
          <Link to="/customer/my-wishlist" style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            View Saved Items <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Quick Prescription Action */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', color: '#059669' }}>
            <UploadCloud size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Need to order prescription medication?</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
              Upload your doctor's signed note or prescription slip. Our clinical pharmacists review and approve valid prescriptions within 15 minutes.
            </p>
          </div>
          <Link
            to="/customer/my-prescriptions"
            style={{
              background: '#059669',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            Upload Rx Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
