import React, { useState } from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';

const mockOffers = [
  { id: 1, title: 'New Customer Welcome', code: 'WELCOME20', discount: 20, minOrder: 25, active: true },
  { id: 2, title: 'Baby Care Special', code: 'BABYCARE15', discount: 15, minOrder: 30, active: true },
  { id: 3, title: 'Elder Wellness Discount', code: 'SENIOR10', discount: 10, minOrder: 20, active: false },
];

const ManageOffers = () => {
  const [offers, setOffers] = useState(mockOffers);

  const toggleStatus = (id) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Manage Promotional Offers</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Active coupons, discount campaigns and seasonal sales</p>
        </div>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>Campaign Title</th>
              <th style={{ padding: '12px 16px' }}>Promo Code</th>
              <th style={{ padding: '12px 16px' }}>Discount %</th>
              <th style={{ padding: '12px 16px' }}>Min Order</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{offer.title}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>{offer.code}</td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#059669' }}>{offer.discount}% OFF</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>₹{offer.minOrder}.00</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: offer.active ? '#ecfdf5' : '#f1f5f9',
                    color: offer.active ? '#059669' : '#94a3b8',
                  }}>
                    {offer.active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => toggleStatus(offer.id)}
                    style={{
                      background: 'none',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {offer.active ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOffers;
