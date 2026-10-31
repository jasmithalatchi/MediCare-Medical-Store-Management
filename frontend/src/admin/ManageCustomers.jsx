import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { Mail, Phone, MapPin } from 'lucide-react';

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/users');
        if (res.data?.data) {
          setCustomers(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load customers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Manage Customers & Patients</h1>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Registered profiles, patient contacts & loyalty records</p>
      </div>

      {loading ? (
        <Loader message="Loading registered patients..." />
      ) : customers.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#64748b' }}>No registered customers found yet.</p>
        </div>
      ) : (
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Name</th>
                <th style={{ padding: '12px 16px' }}>Email</th>
                <th style={{ padding: '12px 16px' }}>Phone</th>
                <th style={{ padding: '12px 16px' }}>Role</th>
                <th style={{ padding: '12px 16px' }}>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{c.name}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{c.email}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{c.phone || 'N/A'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: c.role === 'admin' ? '#f0f9ff' : '#ecfdf5',
                      color: c.role === 'admin' ? '#0284c7' : '#059669',
                    }}>
                      {c.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '0.85rem' }}>
                    {new Date(c.createdAt).toLocaleDateString()}
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

export default ManageCustomers;
