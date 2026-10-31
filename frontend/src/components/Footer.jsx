import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '48px 0 24px', marginTop: '60px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 700, fontSize: '1.25rem', marginBottom: '12px' }}>
            <HeartPulse size={24} color="#10b981" />
            <span>MediCare</span>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            Your trusted neighborhood digital pharmacy providing certified generic & branded medicines, health supplements, and baby care essentials.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
            <li><Link to="/catalogue">Medicine Catalogue</Link></li>
            <li><Link to="/baby-care">Baby Care Corner</Link></li>
            <li><Link to="/offers">Promotional Offers</Link></li>
            <li><Link to="/contact">Help & Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Customer Care</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
            <li><Link to="/customer/my-orders">Track Orders</Link></li>
            <li><Link to="/customer/my-prescriptions">Prescription Verification</Link></li>
            <li><Link to="/customer/my-wishlist">Saved Wishlist</Link></li>
            <li><Link to="/customer/profile">Account Settings</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Contact Store</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="#10b981" /> 123 Healthcare Blvd, Medical City
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} color="#10b981" /> +1 (800) 555-CARE
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="#10b981" /> support@medicare.store
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', textAlign: 'center', fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} MediCare Pharmacy Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
