import React from 'react';
import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';

const Reports = () => {
  const topSelling = [
    { name: 'Paracetamol 500mg', units: 620, revenue: '$3,093.80' },
    { name: 'Amoxicillin 250mg', units: 310, revenue: '$4,495.00' },
    { name: 'Cetirizine 10mg', units: 480, revenue: '$3,960.00' },
    { name: 'Gentle Baby Diaper Rash Cream', units: 190, revenue: '$1,898.10' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Pharmacy Reports & Analytics</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Dispensation volumes, top medicine revenue & monthly turnover</p>
        </div>
        <button
          onClick={() => alert('Exporting monthly pharmacy sales report...')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#1e293b',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          <Download size={16} /> Export CSV Report
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Top Dispensed Medicines This Month
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topSelling.map((item, idx) => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                <div>
                  <span style={{ fontWeight: 600, color: '#0f172a', display: 'block', fontSize: '0.9rem' }}>{idx + 1}. {item.name}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.units} units sold</span>
                </div>
                <span style={{ fontWeight: 700, color: '#059669', fontSize: '0.95rem' }}>{item.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Quarterly Revenue Projection
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Current recurring repeat refill rate stands at <strong>72%</strong>. Customer retention is bolstered by the Baby Care category and chronic illness maintenance prescriptions.
          </p>
          <div style={{ background: '#ecfdf5', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <TrendingUp size={24} color="#059669" />
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46' }}>+18.4% Net Growth</div>
              <span style={{ fontSize: '0.75rem', color: '#047857' }}>Compared to previous calendar quarter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
