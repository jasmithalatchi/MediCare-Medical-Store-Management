import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

const Wishlist = () => {
  return (
    <div className="container" style={{ padding: '36px 1.5rem' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>My Saved Wishlist</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Medicines and health supplements saved for future routine refills.
        </p>
      </div>

      <div style={{ textAlign: 'center', padding: '60px 1.5rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'inline-flex', padding: '16px', background: '#fef2f2', borderRadius: '50%', color: '#ef4444', marginBottom: '16px' }}>
          <Heart size={36} />
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Your Wishlist is Empty</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 24px' }}>
          Browse our catalogue and bookmark your everyday wellness items for quick re-ordering.
        </p>
        <Link to="/catalogue" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#059669',
          color: '#ffffff',
          padding: '10px 18px',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.9rem',
        }}>
          Browse Catalogue <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
