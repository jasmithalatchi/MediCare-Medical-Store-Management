import React from 'react';
import { Tag, Sparkles, Copy, Clock } from 'lucide-react';

const promotionalOffers = [
  {
    id: 1,
    code: 'WELCOME20',
    title: 'New Customer Welcome Bonus',
    discount: '20% OFF',
    description: 'Enjoy 20% off on your first order of over-the-counter medicines & health supplements.',
    minOrder: '$25.00',
    expires: 'Nov 30, 2026',
  },
  {
    id: 2,
    code: 'BABYCARE15',
    title: 'Infant & Pediatric Care Discount',
    discount: '15% OFF',
    description: 'Save 15% on all gentle baby skincare, formulas, and pediatric drops.',
    minOrder: '$30.00',
    expires: 'Dec 15, 2026',
  },
  {
    id: 3,
    code: 'HEALTH50',
    title: 'Seasonal Wellness Booster',
    discount: 'Flat $10 OFF',
    description: 'Get $10 instant discount on orders exceeding $60 across all categories.',
    minOrder: '$60.00',
    expires: 'Dec 31, 2026',
  },
];

const Offers = () => {
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied to clipboard!`);
  };

  return (
    <div className="container" style={{ padding: '36px 1.5rem' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef3c7', color: '#b45309', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
          <Sparkles size={16} /> Exclusive Pharmacy Deals
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>MediCare Offers & Coupons</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '500px', margin: '8px auto 0' }}>
          Apply these verified promotional promo codes during checkout to maximize your healthcare savings.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {promotionalOffers.map((offer) => (
          <div
            key={offer.id}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px dashed #059669',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{offer.discount}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> Valid till {offer.expires}
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{offer.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>{offer.description}</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Coupon Code</span>
                <strong style={{ fontSize: '1.05rem', color: '#0f172a', letterSpacing: '0.05em' }}>{offer.code}</strong>
              </div>
              <button
                onClick={() => handleCopy(offer.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                <Copy size={14} /> Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
