import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ links = [], title = 'Navigation' }) => {
  return (
    <aside style={{
      width: '240px',
      background: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      minHeight: 'calc(100vh - 70px)',
      padding: '24px 16px',
    }}>
      <h3 style={{
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#94a3b8',
        marginBottom: '16px',
        paddingLeft: '12px',
      }}>
        {title}
      </h3>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isActive ? '#059669' : '#475569',
                backgroundColor: isActive ? '#ecfdf5' : 'transparent',
                transition: 'all 0.15s ease',
              })}
            >
              {Icon && <Icon size={18} />}
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
