import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, icon: Icon, count, categorySlug }) => {
  return (
    <Link
      to={`/category/${categorySlug || encodeURIComponent(title)}`}
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '10px',
        background: '#ecfdf5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#059669',
      }}>
        {Icon ? <Icon size={24} /> : null}
      </div>
      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b', marginBottom: '2px' }}>{title}</h4>
        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{count || 'Browse'} Items</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
