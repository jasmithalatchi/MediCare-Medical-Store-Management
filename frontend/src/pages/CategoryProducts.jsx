import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import medicineService from '../services/medicineService';
import { ArrowLeft } from 'lucide-react';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const decodedCategory = decodeURIComponent(categoryName || '');

  useEffect(() => {
    const fetchCategoryMedicines = async () => {
      setLoading(true);
      try {
        const res = await medicineService.getMedicines({ category: decodedCategory, limit: 100 });
        if (res?.data) {
          setMedicines(res.data);
        }
      } catch (err) {
        console.error('Failed to load category products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryMedicines();
  }, [decodedCategory]);

  return (
    <div className="container" style={{ padding: '36px 1.5rem' }}>
      <Link to="/catalogue" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.9rem', fontWeight: 600, marginBottom: '20px' }}>
        <ArrowLeft size={16} /> Back to Full Catalogue
      </Link>

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          {decodedCategory}
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Showing all products available under this category
        </p>
      </div>

      {loading ? (
        <Loader message={`Loading ${decodedCategory} products...`} />
      ) : medicines.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '1.1rem', color: '#64748b' }}>No products found in this category.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {medicines.map((med) => (
            <ProductCard key={med._id} medicine={med} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
