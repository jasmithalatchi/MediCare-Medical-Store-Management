import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';
import Loader from '../components/Loader';
import { Package, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await orderService.getMyOrders();
        if (res?.data) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Failed to load my orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>My Order History</h1>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Track real-time delivery status of all your medication orders</p>
      </div>

      {loading ? (
        <Loader message="Loading your orders..." />
      ) : orders.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '48px', textAlign: 'center' }}>
          <Package size={40} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>No orders placed yet</h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>When you complete an order, details and tracking will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map((order) => (
            <div key={order._id} style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Order Number</span>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>#{order._id.slice(-8).toUpperCase()}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Order Date</span>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total Amount</span>
                  <div style={{ fontWeight: 800, color: '#059669', fontSize: '1rem' }}>₹{order.totalPrice?.toFixed(2)}</div>
                </div>
                <div>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: order.orderStatus === 'Delivered' ? '#ecfdf5' : '#f0f9ff',
                    color: order.orderStatus === 'Delivered' ? '#059669' : '#0284c7',
                  }}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {order.orderItems?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
