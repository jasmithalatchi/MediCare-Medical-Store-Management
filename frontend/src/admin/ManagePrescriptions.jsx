import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { FileCheck2, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

const ManagePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/prescriptions');
      if (res.data?.data) {
        setPrescriptions(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load prescriptions', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/prescriptions/${id}/status`, { status });
      setPrescriptions((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
    } catch (err) {
      alert('Failed to update prescription status');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Prescription Verification Queue</h1>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Verify patient prescriptions before dispensing restricted pharmaceutical drugs</p>
      </div>

      {loading ? (
        <Loader message="Loading prescriptions queue..." />
      ) : prescriptions.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#64748b' }}>No customer prescriptions currently pending review.</p>
        </div>
      ) : (
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Patient Name</th>
                <th style={{ padding: '12px 16px' }}>Doctor Name</th>
                <th style={{ padding: '12px 16px' }}>User Account</th>
                <th style={{ padding: '12px 16px' }}>Prescription File</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((rx) => (
                <tr key={rx._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{rx.patientName}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{rx.doctorName || 'Not specified'}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{rx.user?.name || 'Customer'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <a
                      href={rx.filePath}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#0284c7', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      <ExternalLink size={14} /> View File
                    </a>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: rx.status === 'Verified' ? '#ecfdf5' : rx.status === 'Rejected' ? '#fef2f2' : '#fef3c7',
                      color: rx.status === 'Verified' ? '#059669' : rx.status === 'Rejected' ? '#dc2626' : '#d97706',
                    }}>
                      {rx.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleUpdateStatus(rx._id, 'Verified')}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#059669', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        <CheckCircle2 size={13} /> Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(rx._id, 'Rejected')}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ef4444', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        <XCircle size={13} /> Reject
                      </button>
                    </div>
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

export default ManagePrescriptions;
