import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { UploadCloud, FileCheck2, Clock, CheckCircle2, XCircle } from 'lucide-react';

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/prescriptions/my');
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

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const res = await api.post('/prescriptions', {
        patientName,
        doctorName,
        notes,
        filePath: '/uploads/prescriptions/prescription-sample.pdf',
      });
      if (res.data?.data) {
        setPrescriptions((prev) => [res.data.data, ...prev]);
        setPatientName('');
        setDoctorName('');
        setNotes('');
        alert('Prescription submitted for verification!');
      }
    } catch (err) {
      alert('Failed to upload prescription');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>My Prescriptions</h1>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Upload doctor slips and track pharmacist verification</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'start' }}>
        {/* Upload Form */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
            Upload New Prescription
          </h3>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Patient Full Name</label>
              <input type="text" required value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="e.g. John Doe" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Prescribing Doctor (Optional)</label>
              <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} placeholder="Dr. Jane Smith" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Notes / Specific Instructions</label>
              <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. 30 days refill needed" style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Prescription Image / Document</label>
              <input type="file" accept="image/*,.pdf" style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }} />
            </div>

            <button
              type="submit"
              disabled={uploading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                backgroundColor: '#059669',
                color: '#ffffff',
                border: 'none',
                padding: '11px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                marginTop: '6px',
              }}
            >
              <UploadCloud size={16} /> {uploading ? 'Submitting...' : 'Submit Prescription'}
            </button>
          </form>
        </div>

        {/* Existing Prescriptions List */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
            Submitted Prescriptions ({prescriptions.length})
          </h3>

          {loading ? (
            <Loader message="Loading prescriptions..." />
          ) : prescriptions.length === 0 ? (
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '36px', textAlign: 'center' }}>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>No prescriptions submitted yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {prescriptions.map((rx) => (
                <div key={rx._id} style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{rx.patientName}</strong>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: rx.status === 'Verified' ? '#ecfdf5' : rx.status === 'Rejected' ? '#fef2f2' : '#fef3c7',
                      color: rx.status === 'Verified' ? '#059669' : rx.status === 'Rejected' ? '#dc2626' : '#d97706',
                    }}>
                      {rx.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Doctor: {rx.doctorName || 'Not specified'} • Submitted: {new Date(rx.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPrescriptions;
