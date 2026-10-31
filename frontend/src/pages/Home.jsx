import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Clock, Award, ArrowRight, Pill, Baby, Sparkles, Stethoscope, Droplets, HeartPulse } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import medicineService from '../services/medicineService';

const Home = () => {
  const [featuredMedicines, setFeaturedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await medicineService.getMedicines({ limit: 8 });
        if (res?.data) {
          setFeaturedMedicines(res.data);
        }
      } catch (err) {
        console.error('Failed to load featured medicines', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { title: 'Tablets', icon: Pill, count: '25+' },
    { title: 'Capsules', icon: HeartPulse, count: '25+' },
    { title: 'Syrups', icon: Droplets, count: '25+' },
    { title: 'Baby Care', icon: Baby, count: '25+' },
    { title: 'Vitamins', icon: Sparkles, count: '25+' },
    { title: 'First Aid', icon: Stethoscope, count: '25+' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 100%)', padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', gap: '40px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#059669', background: '#d1fae5', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
              Certified Online Medical Store
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, margin: '16px 0' }}>
              Genuine Medicines & Health Essentials Delivered Fast
            </h1>
            <p style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '24px' }}>
              Browse over 300+ certified medicines, generics, baby care essentials, and health supplements with fast home delivery and transparent INR pricing.
            </p>
            <Link
              to="/catalogue"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#059669',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 4px 6px -1px rgba(5,150,105,0.3)',
              }}
            >
              Explore Full Catalogue (300+ Products) <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              display: 'inline-block',
              maxWidth: '380px'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
                Need Prescription Medicines?
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
                Upload your valid doctor's prescription. Our certified pharmacists will verify and prepare your order.
              </p>
              <Link to="/customer/my-prescriptions" style={{
                display: 'block',
                background: '#059669',
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}>
                Upload Prescription
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <section style={{ borderBottom: '1px solid #e2e8f0', background: '#ffffff', padding: '24px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={32} color="#059669" />
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>100% Genuine</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Direct from verified labs</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Truck size={32} color="#059669" />
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Speedy Delivery</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Dispatched within 24 hours</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock size={32} color="#059669" />
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>24/7 Support</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Pharmacist consultation</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Award size={32} color="#059669" />
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Best INR Prices</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Up to 30% savings on generics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container" style={{ padding: '48px 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Shop By Category</h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Explore our certified healthcare departments</p>
          </div>
          <Link to="/catalogue" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 600, fontSize: '0.9rem' }}>
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {categories.map((c) => (
            <CategoryCard key={c.title} title={c.title} icon={c.icon} count={c.count} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: '0 1.5rem 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Popular & Essential Medicines</h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Top dispensed healthcare items this week</p>
          </div>
          <Link to="/catalogue" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 600, fontSize: '0.9rem' }}>
            Browse All 300+ Products <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {featuredMedicines.map((med) => (
              <ProductCard key={med._id} medicine={med} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
