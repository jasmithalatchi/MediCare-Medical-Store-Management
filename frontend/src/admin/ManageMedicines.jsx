import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import medicineService from '../services/medicineService';
import Loader from '../components/Loader';
import { PlusCircle, Trash2, Edit3, ShieldAlert } from 'lucide-react';
import { getMedicineImage, handleImageFallback } from '../utils/imageUtils';

const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const res = await medicineService.getMedicines({ limit: 50 });
      if (res?.data) {
        setMedicines(res.data);
      }
    } catch (err) {
      console.error('Failed to load medicines', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this medicine from inventory?')) {
      try {
        await medicineService.deleteMedicine(id);
        setMedicines((prev) => prev.filter((m) => m._id !== id));
      } catch (err) {
        alert('Failed to delete medicine');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Manage Medicines Catalog</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>View, modify, or retire pharmaceutical products</p>
        </div>
        <Link
          to="/admin/add-medicine"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#059669',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          <PlusCircle size={18} /> Add New Medicine
        </Link>
      </div>

      {loading ? (
        <Loader message="Loading medicines database..." />
      ) : (
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Name & Generic</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Price</th>
                <th style={{ padding: '12px 16px' }}>Stock</th>
                <th style={{ padding: '12px 16px' }}>Rx Required</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={getMedicineImage(m)}
                        alt={m.name}
                        style={{ width: '38px', height: '38px', objectFit: 'contain', background: '#f8fafc', borderRadius: '6px', padding: '3px', border: '1px solid #e2e8f0', flexShrink: 0 }}
                        onError={(e) => handleImageFallback(e, m.category)}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{m.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.genericName || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{m.category}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>₹{m.price.toFixed(2)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: m.stockQuantity > 20 ? '#ecfdf5' : '#fef2f2',
                      color: m.stockQuantity > 20 ? '#059669' : '#dc2626',
                    }}>
                      {m.stockQuantity} units
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {m.requiresPrescription ? (
                      <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                        <ShieldAlert size={14} /> Yes
                      </span>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>No (OTC)</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(m._id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', padding: '6px' }}
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMedicines;
