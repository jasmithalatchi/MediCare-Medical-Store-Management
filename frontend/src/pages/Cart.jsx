import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, cartTotal, clearCart, itemsCount } = useCart();

  const estimatedTax = +(cartTotal * 0.05).toFixed(2);
  const shipping = cartTotal >= 499 || cartTotal === 0 ? 0 : 49.00;
  const finalTotal = +(cartTotal + estimatedTax + shipping).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 1.5rem' }}>
        <div style={{ display: 'inline-flex', padding: '20px', background: '#ecfdf5', borderRadius: '50%', color: '#059669', marginBottom: '16px' }}>
          <ShoppingBag size={48} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Your Cart is Empty</h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>
          Looks like you haven't added any medicines or health products yet.
        </p>
        <Link to="/catalogue" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#059669',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: 700,
        }}>
          Explore 300+ Catalogue Items <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '36px 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Shopping Cart ({itemsCount} items)</h1>
        <button
          onClick={clearCart}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#ef4444', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
        >
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'start' }}>
        {/* Left: Cart Items List */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Right: Order Summary */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Order Summary</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#475569', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GST & Pharmacy Cess (5%)</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>₹{estimatedTax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Standard Home Delivery</span>
              <span style={{ fontWeight: 700, color: shipping === 0 ? '#059669' : '#0f172a' }}>
                {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping > 0 && (
              <span style={{ fontSize: '0.78rem', color: '#0284c7', background: '#f0f9ff', padding: '6px 10px', borderRadius: '6px' }}>
                Add ₹{(499 - cartTotal).toFixed(2)} more to qualify for Free Home Delivery!
              </span>
            )}
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Total Amount</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669' }}>₹{finalTotal.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#059669',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
