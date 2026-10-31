import React, { useState } from 'react';
import { Boxes, AlertTriangle, ArrowUpDown, RefreshCw } from 'lucide-react';

const mockInventory = [
  { id: 1, name: 'Paracetamol 500mg', batch: 'BAT-2026-08', currentStock: 250, reorderLevel: 50, shelf: 'A-12', status: 'Optimal' },
  { id: 2, name: 'Amoxicillin 250mg', batch: 'BAT-2026-11', currentStock: 120, reorderLevel: 40, shelf: 'B-04', status: 'Optimal' },
  { id: 3, name: 'Cetirizine 10mg', batch: 'BAT-2025-99', currentStock: 18, reorderLevel: 25, shelf: 'A-02', status: 'Low Stock' },
  { id: 4, name: 'Diaper Rash Cream', batch: 'BAT-2026-44', currentStock: 8, reorderLevel: 20, shelf: 'C-15', status: 'Critical' },
];

const ManageInventory = () => {
  const [inventoryList, setInventoryList] = useState(mockInventory);

  const handleRestock = (id) => {
    setInventoryList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, currentStock: item.currentStock + 50, status: 'Optimal' }
          : item
      )
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Inventory & Stock Control</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Monitor warehouse shelf locations, batch lots, and reorder levels</p>
        </div>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>Medicine</th>
              <th style={{ padding: '12px 16px' }}>Batch Code</th>
              <th style={{ padding: '12px 16px' }}>Shelf Location</th>
              <th style={{ padding: '12px 16px' }}>Current Quantity</th>
              <th style={{ padding: '12px 16px' }}>Reorder Level</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Restock</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{item.name}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#475569' }}>{item.batch}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.shelf}</td>
                <td style={{ padding: '14px 16px', fontWeight: 700 }}>{item.currentStock} units</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.reorderLevel} units</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: item.status === 'Optimal' ? '#ecfdf5' : item.status === 'Low Stock' ? '#fef3c7' : '#fef2f2',
                    color: item.status === 'Optimal' ? '#059669' : item.status === 'Low Stock' ? '#d97706' : '#dc2626',
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleRestock(item.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#ecfdf5',
                      color: '#059669',
                      border: '1px solid #a7f3d0',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    <RefreshCw size={13} /> +50 Units
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageInventory;
