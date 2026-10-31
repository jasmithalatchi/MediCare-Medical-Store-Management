import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ShieldAlert, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getMedicineImage, handleImageFallback } from '../utils/imageUtils';

const ProductCard = ({ medicine }) => {
  const { addToCart } = useCart();

  if (!medicine) return null;

  const currentPrice = Number(medicine.price || 0);
  const mrp = Number(medicine.originalPrice || currentPrice);
  const discount = medicine.discountPercentage > 0
    ? medicine.discountPercentage
    : (mrp > currentPrice ? Math.round(((mrp - currentPrice) / mrp) * 100) : 0);

  const formattedDate = medicine.expiryDate
    ? new Date(medicine.expiryDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : 'Aug 2028';

  const inStock = medicine.stockQuantity > 0 && medicine.isAvailable !== false;

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
      }}
    >
      <div>
        {/* Top Badges: Category & Rx Required */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#0284c7',
              background: '#f0f9ff',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid #bae6fd',
            }}
          >
            {medicine.category}
          </span>
          {medicine.requiresPrescription ? (
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#dc2626',
                background: '#fef2f2',
                padding: '2px 6px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <ShieldAlert size={12} /> Rx Required
            </span>
          ) : (
            <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>OTC</span>
          )}
        </div>

        {/* Product Visual Area */}
        <Link to={`/catalogue/${medicine._id}`}>
          <div
            style={{
              height: '130px',
              background: '#f8fafc',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              overflow: 'hidden',
              position: 'relative',
              padding: '8px',
            }}
          >
            <img
              src={getMedicineImage(medicine)}
              alt={medicine.name}
              style={{ maxHeight: '110px', maxWidth: '85%', width: 'auto', height: 'auto', objectFit: 'contain' }}
              onError={(e) => handleImageFallback(e, medicine.category)}
            />
            {discount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  background: '#059669',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                {discount}% OFF
              </span>
            )}
          </div>
        </Link>

        {/* Brand Label */}
        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          {medicine.brand || medicine.manufacturer || 'Certified Pharma'}
        </div>

        {/* Product Name */}
        <Link to={`/catalogue/${medicine._id}`}>
          <h3
            style={{
              fontSize: '0.98rem',
              fontWeight: 700,
              color: '#0f172a',
              marginTop: '3px',
              marginBottom: '4px',
              lineHeight: 1.35,
              minHeight: '2.7em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            title={medicine.name}
          >
            {medicine.name}
          </h3>
        </Link>

        {/* Strength & Dosage Form */}
        <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '10px' }}>
          {medicine.strength ? `${medicine.strength} • ` : ''}{medicine.dosageForm || 'Dosage unit'}
        </p>

        {/* Availability & Expiry Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', marginBottom: '14px', color: '#64748b' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: inStock ? '#059669' : '#ef4444', fontWeight: 600 }}>
            {inStock ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
            {inStock ? `In Stock (${medicine.stockQuantity})` : 'Out of Stock'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Calendar size={12} /> {formattedDate}
          </span>
        </div>
      </div>

      {/* Pricing & Add to Cart Action */}
      <div
        style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              ₹{currentPrice.toFixed(2)}
            </span>
            {mrp > currentPrice && (
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                ₹{mrp.toFixed(2)}
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Inclusive of all taxes</span>
        </div>

        <button
          onClick={() => addToCart(medicine, 1)}
          disabled={!inStock}
          style={{
            backgroundColor: inStock ? '#059669' : '#cbd5e1',
            color: '#ffffff',
            border: 'none',
            padding: '9px 14px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: inStock ? 'pointer' : 'not-allowed',
            transition: 'background 0.15s ease',
          }}
        >
          <ShoppingCart size={15} /> Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
