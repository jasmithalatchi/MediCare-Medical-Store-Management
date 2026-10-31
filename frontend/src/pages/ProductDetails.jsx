import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import medicineService from '../services/medicineService';
import Loader from '../components/Loader';
import { getMedicineImage, handleImageFallback } from '../utils/imageUtils';
import {
  ArrowLeft,
  ShoppingCart,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Building2,
  Calendar,
  Tag,
  ShieldCheck,
  Package,
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [medicine, setMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await medicineService.getMedicineById(id);
        if (res?.data) {
          setMedicine(res.data);
        } else {
          setError('Medicine item not found.');
        }
      } catch (err) {
        setError('Medicine details could not be retrieved from the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <Loader message="Loading medicine details..." />;
  if (error || !medicine) {
    return (
      <div className="container" style={{ padding: '60px 1.5rem', textAlign: 'center' }}>
        <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '1.1rem' }}>{error || 'Medicine not found'}</p>
        <Link
          to="/catalogue"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#059669',
            fontWeight: 700,
            textDecoration: 'underline',
          }}
        >
          <ArrowLeft size={16} /> Return to Catalogue
        </Link>
      </div>
    );
  }

  const currentPrice = Number(medicine.price || 0);
  const mrp = Number(medicine.originalPrice || currentPrice);
  const discount = medicine.discountPercentage > 0
    ? medicine.discountPercentage
    : (mrp > currentPrice ? Math.round(((mrp - currentPrice) / mrp) * 100) : 0);

  const formattedExpiry = medicine.expiryDate
    ? new Date(medicine.expiryDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'August 2028';

  const inStock = medicine.stockQuantity > 0 && medicine.isAvailable !== false;

  const handleAddToCart = () => {
    addToCart(medicine, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '36px 1.5rem' }}>
      <Link
        to="/catalogue"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#059669',
          fontSize: '0.9rem',
          fontWeight: 700,
          marginBottom: '24px',
        }}
      >
        <ArrowLeft size={16} /> Back to Full Catalogue
      </Link>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '36px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
        }}
      >
        {/* Left Column: Product Image */}
        <div
          style={{
            background: '#f8fafc',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            minHeight: '340px',
            border: '1px solid #f1f5f9',
            position: 'relative',
          }}
        >
          <img
            src={getMedicineImage(medicine)}
            alt={medicine.name}
            style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }}
            onError={(e) => handleImageFallback(e, medicine.category)}
          />
          {discount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: '#059669',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              SAVE {discount}%
            </span>
          )}
        </div>

        {/* Right Column: Detailed Product Specs */}
        <div>
          {/* Category & Prescription Pills */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#0284c7',
                background: '#e0f2fe',
                padding: '3px 10px',
                borderRadius: '6px',
              }}
            >
              {medicine.category}
            </span>
            {medicine.requiresPrescription ? (
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#dc2626',
                  background: '#fee2e2',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <ShieldAlert size={14} /> Prescription Required
              </span>
            ) : (
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#059669',
                  background: '#ecfdf5',
                  padding: '3px 10px',
                  borderRadius: '6px',
                }}
              >
                Over The Counter (OTC)
              </span>
            )}
          </div>

          {/* Brand & Name */}
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Brand: {medicine.brand || medicine.manufacturer || 'Certified Pharma Partner'}
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', margin: '6px 0 8px' }}>
            {medicine.name}
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '20px' }}>
            Active Substance / Generic: <strong>{medicine.genericName || 'Standard Pharmacological Preparation'}</strong>
          </p>

          {/* Pricing Row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
              ₹{currentPrice.toFixed(2)}
            </span>
            {mrp > currentPrice && (
              <span style={{ fontSize: '1.25rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                ₹{mrp.toFixed(2)}
              </span>
            )}
            {discount > 0 && (
              <span style={{ fontSize: '0.95rem', color: '#059669', fontWeight: 800, background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>
                {discount}% OFF
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '24px' }}>
            Inclusive of all taxes & local GST. Authentic batch guaranteed.
          </div>

          {/* Key Specifications Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
              background: '#f8fafc',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              marginBottom: '24px',
              fontSize: '0.9rem',
            }}
          >
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Dosage Form</span>
              <strong>{medicine.dosageForm || 'Standard'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Strength / Potency</span>
              <strong>{medicine.strength || 'N/A'}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={18} color="#059669" />
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Expiry Date</span>
                <strong>{formattedExpiry}</strong>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {inStock ? <CheckCircle2 size={18} color="#059669" /> : <XCircle size={18} color="#ef4444" />}
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Stock Status</span>
                <strong style={{ color: inStock ? '#059669' : '#ef4444' }}>
                  {inStock ? `In Stock (${medicine.stockQuantity} units)` : 'Out of Stock'}
                </strong>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
              Product Details & Indications
            </h4>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {medicine.description || 'Verified pharmaceutical preparation formulated under stringent clinical protocols. Packed in moisture-barrier blister packs.'}
            </p>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Qty:</label>
              <input
                type="number"
                min={1}
                max={medicine.stockQuantity || 1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  width: '70px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              style={{
                flex: 1,
                backgroundColor: added ? '#047857' : (inStock ? '#059669' : '#cbd5e1'),
                color: '#ffffff',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: inStock ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              <ShoppingCart size={18} />
              {added ? 'Added to Cart!' : (inStock ? 'Add to Shopping Cart' : 'Currently Unavailable')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
