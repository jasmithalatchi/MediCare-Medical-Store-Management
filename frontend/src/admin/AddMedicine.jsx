import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import medicineService from '../services/medicineService';
import { ArrowLeft, Save } from 'lucide-react';

const CATEGORIES = [
  'Tablets',
  'Capsules',
  'Syrups',
  'Tonics',
  'Serums',
  'Injections',
  'Creams',
  'Gels',
  'ORS',
  'First Aid',
  'Vitamins',
  'Supplements',
  'Baby Care'
];

const AddMedicine = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    category: 'Tablets',
    manufacturer: '',
    price: '',
    discountPercentage: 0,
    stockQuantity: '',
    dosageForm: 'Tablet',
    strength: '',
    requiresPrescription: false,
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await medicineService.createMedicine({
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity, 10),
        discountPercentage: parseFloat(formData.discountPercentage) || 0,
      });
      navigate('/admin/medicines');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add medicine record.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#059669', fontSize: '0.9rem', fontWeight: 600, marginBottom: '20px' }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '32px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Add Medicine to Inventory</h1>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>Fill in certified pharmaceutical details and stock specifications</p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Medicine Commercial Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Paracetamol 500mg" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Generic Name (Active Substance)</label>
              <input type="text" name="genericName" value={formData.genericName} onChange={handleChange} placeholder="e.g. Acetaminophen" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Dosage Form</label>
              <input type="text" name="dosageForm" value={formData.dosageForm} onChange={handleChange} placeholder="Tablet / Syrup / Drops" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Strength</label>
              <input type="text" name="strength" value={formData.strength} onChange={handleChange} placeholder="500mg / 10ml" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Price (₹)</label>
              <input type="number" step="0.01" min="0" required name="price" value={formData.price} onChange={handleChange} placeholder="9.99" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Discount (%)</label>
              <input type="number" min="0" max="90" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} placeholder="0" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Initial Stock Quantity</label>
              <input type="number" min="0" required name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} placeholder="100" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Manufacturer Lab</label>
            <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} placeholder="e.g. Pfizer, Novartis, HealthCorp" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Description & Medical Indication</label>
            <textarea name="description" rows={3} value={formData.description} onChange={handleChange} placeholder="Active substance details, indications and packaging format" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#1e293b' }}>
            <input type="checkbox" name="requiresPrescription" checked={formData.requiresPrescription} onChange={handleChange} />
            <span style={{ fontWeight: 600 }}>Requires Valid Doctor's Prescription (Rx Only)</span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#059669',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              marginTop: '12px',
            }}
          >
            <Save size={18} /> {submitting ? 'Adding...' : 'Save Medicine to Catalog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
