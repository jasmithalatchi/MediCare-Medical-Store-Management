import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getMedicineImage, handleImageFallback } from '../utils/imageUtils';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const unitPrice = item.price || 0;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 0',
      borderBottom: '1px solid #f1f5f9',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '64px', height: '64px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={getMedicineImage(item)}
            alt={item.name}
            style={{ maxHeight: '48px', maxWidth: '48px', objectFit: 'contain' }}
            onError={(e) => handleImageFallback(e, item.category)}
          />
        </div>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{item.name}</h4>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>₹{unitPrice.toFixed(2)} each</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Quantity Controls */}
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            style={{ padding: '6px 10px', background: 'none', border: 'none', color: '#475569' }}
          >
            <Minus size={14} />
          </button>
          <span style={{ padding: '0 8px', fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            style={{ padding: '6px 10px', background: 'none', border: 'none', color: '#475569' }}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Subtotal */}
        <span style={{ fontWeight: 700, fontSize: '1rem', width: '85px', textAlign: 'right' }}>
          ₹{(unitPrice * item.quantity).toFixed(2)}
        </span>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item._id)}
          style={{ background: 'none', border: 'none', color: '#ef4444', padding: '6px', cursor: 'pointer' }}
          title="Remove Item"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
