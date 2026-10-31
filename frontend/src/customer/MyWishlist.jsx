import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

const MyWishlist = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>My Saved Medicines</h1>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Bookmark medicines and supplements for fast repeat refills</p>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '48px', textAlign: 'center' }}>
        <Heart size={40} color="#fca5a5" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>No items in your wishlist</h3>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>Save items from our catalogue to access them instantly.</p>
        <Link
          to="/catalogue"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#059669',
            color: '#ffffff',
            padding: '9px 16px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          Browse Catalogue <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default MyWishlist;
