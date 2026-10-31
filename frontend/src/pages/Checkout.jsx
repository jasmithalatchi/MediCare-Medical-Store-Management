import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';
import { CreditCard, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || '',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const estimatedTax = +(cartTotal * 0.05).toFixed(2);
  const shippingPrice = cartTotal >= 499 || cartTotal === 0 ? 0 : 49.00;
  const totalPrice = +(cartTotal + estimatedTax + shippingPrice).toFixed(2);

  const handleInputChange = (e) => {
    setShippingAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setSubmitting(true);
    setError('');

    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          medicine: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.imageUrl,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: cartTotal,
        taxPrice: estimatedTax,
        shippingPrice,
        totalPrice,
      };

      const res = await orderService.createOrder(orderPayload);
      clearCart();
      navigate('/customer/my-orders', { state: { orderPlaced: true, orderId: res?.data?._id } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please check details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '36px 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>
        Secure Checkout
      </h1>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Left Column: Shipping & Payment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Shipping Details */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>1. Delivery Address</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Full Recipient Name</label>
                <input type="text" name="fullName" required value={shippingAddress.fullName} onChange={handleInputChange} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Phone Contact</label>
                <input type="tel" name="phone" required value={shippingAddress.phone} onChange={handleInputChange} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Street Address / Flat No.</label>
                <input type="text" name="street" required value={shippingAddress.street} onChange={handleInputChange} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>City</label>
                <input type="text" name="city" required value={shippingAddress.city} onChange={handleInputChange} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>State / Region</label>
                <input type="text" name="state" required value={shippingAddress.state} onChange={handleInputChange} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Postal Code</label>
                <input type="text" name="postalCode" required value={shippingAddress.postalCode} onChange={handleInputChange} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Country</label>
                <input type="text" name="country" required value={shippingAddress.country} onChange={handleInputChange} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>2. Payment Options</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['COD', 'Online', 'Card', 'UPI'].map((method) => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', backgroundColor: paymentMethod === method ? '#ecfdf5' : '#ffffff' }}>
                  <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {method === 'COD' ? 'Cash On Delivery (COD)' : method === 'Online' ? 'Net Banking / Net Banking Gateway' : method === 'UPI' ? 'Instant UPI Payment (GPay, PhonePe, Paytm)' : 'Credit / Debit Card'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Review */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Order Breakdown</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', marginBottom: '16px', maxHeight: '200px', overflowY: 'auto' }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Items Total:</span>
              <strong style={{ color: '#0f172a' }}>₹{cartTotal.toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GST & Taxes (5%):</span>
              <strong style={{ color: '#0f172a' }}>₹{estimatedTax.toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery Charges:</span>
              <strong style={{ color: '#0f172a' }}>{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice.toFixed(2)}`}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#059669', borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '6px' }}>
              <span>Total Payable:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              marginTop: '24px',
              backgroundColor: '#059669',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            {submitting ? 'Placing Order...' : 'Confirm & Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
