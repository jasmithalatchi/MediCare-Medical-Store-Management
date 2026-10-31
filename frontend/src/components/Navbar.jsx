import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, ShieldCheck, HeartPulse, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 700, fontSize: '1.4rem' }}>
          <HeartPulse size={28} color="#059669" />
          <span>Medi<span style={{ color: '#0284c7' }}>Care</span></span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '24px', fontWeight: 500, fontSize: '0.95rem', color: '#475569' }}>
          <Link to="/" style={{ transition: 'color 0.2s' }}>Home</Link>
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/baby-care">Baby Care</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Action icons / User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {/* Cart Icon with badge */}
          <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#1e293b' }}>
            <ShoppingCart size={22} />
            {itemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: '#059669',
                color: 'white',
                borderRadius: '50%',
                fontSize: '0.75rem',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}>
                {itemsCount}
              </span>
            )}
          </Link>

          {/* User / Auth State */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {isAdmin ? (
                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#0284c7', background: '#e0f2fe', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
                  <ShieldCheck size={16} /> Admin
                </Link>
              ) : (
                <Link to="/customer" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#059669', background: '#ecfdf5', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
                  <User size={16} /> Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                title="Logout"
                style={{ background: 'none', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center' }}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #059669', color: '#059669', fontSize: '0.85rem', fontWeight: 600 }}>
                Login
              </Link>
              <Link to="/register" style={{ padding: '6px 14px', borderRadius: '6px', background: '#059669', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600 }}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
