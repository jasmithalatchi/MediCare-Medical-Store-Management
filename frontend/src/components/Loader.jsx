import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading MediCare data...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 0',
      color: '#059669',
    }}>
      <Loader2 size={36} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
      <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#64748b' }}>{message}</p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
