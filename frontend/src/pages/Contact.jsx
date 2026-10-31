import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ padding: '36px 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Contact MediCare Support</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>
          Have questions regarding an order, medicine availability, or prescription approval? We are here to assist.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px' }}>
        {/* Contact Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Store & Pharmacy Location</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#475569' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>123 Healthcare Boulevard, Suite 400, Medical Center District</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={20} color="#059669" style={{ flexShrink: 0 }} />
                <span>+1 (800) 555-CARE / +1 (800) 555-2273</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={20} color="#059669" style={{ flexShrink: 0 }} />
                <span>support@medicare.store</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Clock size={20} color="#059669" style={{ flexShrink: 0 }} />
                <span>Mon – Sat: 8:00 AM – 10:00 PM | Sun: Emergency Dispensing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form Column */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '28px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Send Us a Message</h3>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#059669' }}>
              <CheckCircle2 size={48} style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Thank You!</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px' }}>Your message has been received. Our pharmacist will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Name</label>
                <input type="text" required placeholder="Your full name" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Email</label>
                <input type="email" required placeholder="your.email@example.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Subject</label>
                <input type="text" required placeholder="e.g. Order query, Prescription question" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Message</label>
                <textarea rows={4} required placeholder="How can our pharmacy staff assist you today?" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }}></textarea>
              </div>
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: '6px',
                }}
              >
                <Send size={16} /> Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
