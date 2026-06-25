import { Link } from 'react-router-dom';
import { useState } from 'react';

// Top navigation bar with dark mode toggle
export default function Navbar() {
  const [dark, setDark] = useState(false);

  // Apply dark background to entire page body when dark mode is on
  const bodyStyle = {
    backgroundColor: dark ? '#111827' : '#f9fafb',
    minHeight: '100vh',
    color: dark ? '#f3f4f6' : '#111827',
  };

  // Keep body in sync with dark mode toggle
  document.body.style.backgroundColor = dark ? '#111827' : '#f9fafb';
  document.body.style.color = dark ? '#f3f4f6' : '#111827';

  const navStyle = {
    backgroundColor: dark ? '#1f2937' : '#ffffff',
    borderBottom: `1px solid ${dark ? '#374151' : '#e5e7eb'}`,
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const linkStyle = {
    color: dark ? '#d1d5db' : '#4b5563',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  };

  return (
    <nav style={navStyle}>
      <span>
        <img src="./src/assets/campusflow_logo.svg" alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/tasks" style={linkStyle}>Tasks</Link>
        <Link to="/summarize" style={linkStyle}>Summarize</Link>
        <Link to="/automations" style={linkStyle}>Automations</Link>

        {/* Dark mode toggle button */}
        <button
          onClick={() => setDark(prev => !prev)}
          style={{
            backgroundColor: dark ? '#374151' : '#f3f4f6',
            color: dark ? '#f3f4f6' : '#111827',
            border: 'none',
            borderRadius: '999px',
            padding: '4px 12px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}