import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import medicineService from '../services/medicineService';
import { Baby, Sparkles, Heart } from 'lucide-react';

const BabyCare = () => {
  const [babyProducts, setBabyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBabyCare = async () => {
      setLoading(true);
      try {
        const res = await medicineService.getMedicines({ category: 'Baby Care', limit: 50 });
        if (res?.data) {
          setBabyProducts(res.data);
        }
      } catch (err) {
        console.error('Failed to load Baby Care items', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBabyCare();
  }, []);

  return (
    <div className="container" style={{ padding: '36px 1.5rem' }}>
      {/* Baby Care Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
        borderRadius: '16px',
        padding: '36px',
        marginBottom: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', color: '#d97706', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
            <Baby size={16} /> Pediatric & Infant Care
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#78350f', marginBottom: '8px' }}>
            Gentle Essentials For Your Little One
          </h1>
          <p style={{ color: '#92400e', maxWidth: '520px', fontSize: '0.95rem' }}>
            Dermatologist-tested creams, pediatric vitamins, hypoallergenic wipes, and baby care formulas curated with gentle ingredients.
          </p>
        </div>
      </div>

      {loading ? (
        <Loader message="Loading Baby Care products..." />
      ) : babyProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '1.1rem', color: '#64748b' }}>No baby care products currently available.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {babyProducts.map((med) => (
            <ProductCard key={med._id} medicine={med} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BabyCare;
