import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Megaphone, Zap, User, Moon, Sun, GraduationCap } from 'lucide-react';

export const tokens = {
  light: {
    bg: '#F8F9FF',
    surface: '#FFFFFF',
    border: '#E8EAFF',
    text: '#0F1035',
    muted: '#6B7280',
    subtle: '#9CA3AF',
    inputBg: '#FFFFFF',
    planBg: '#EEF2FF',
    navBg: '#FFFFFF',
  },
  dark: {
    bg: '#0A0B1E',
    surface: '#111228',
    border: '#1E2040',
    text: '#F1F2FF',
    muted: '#9CA3AF',
    subtle: '#6B7280',
    inputBg: '#1E2040',
    planBg: '#1a1f4b',
    navBg: '#0D0E24',
  },
  primary: '#6366F1',
  primaryHover: '#4F46E5',
  primaryLight: '#EEF2FF',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export default function Navbar({ dark, setDark }) {
  const location = useLocation();
  const t = dark ? tokens.dark : tokens.light;

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
    { to: '/tasks', label: 'Deadlines', icon: <CalendarDays size={15} /> },
    { to: '/summarize', label: 'Summarize', icon: <Megaphone size={15} /> },
    { to: '/automations', label: 'Automations', icon: <Zap size={15} /> },
    { to: '/register', label: 'Account', icon: <User size={15} /> },
  ];

  return (
    <nav style={{
      backgroundColor: t.navBg,
      borderBottom: `1px solid ${t.border}`,
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: dark ? '0 1px 0 #1E2040' : '0 1px 0 #E8EAFF',
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <GraduationCap size={18} color="#fff" />
        </div>
        <span style={{ fontSize: '18px', fontWeight: '700', color: tokens.primary, letterSpacing: '-0.3px' }}>
          CampusFlow
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {navLinks.map(link => {
          const active = location.pathname === link.to;
          return (
            <Link key={link.to} to={link.to} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '8px',
              fontSize: '14px', fontWeight: active ? '600' : '500',
              textDecoration: 'none',
              backgroundColor: active ? tokens.primaryLight : 'transparent',
              color: active ? tokens.primary : t.muted,
              transition: 'all 0.15s ease',
            }}>
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => setDark(prev => !prev)} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          backgroundColor: t.inputBg, border: `1px solid ${t.border}`,
          color: t.muted, borderRadius: '8px', padding: '6px 12px',
          cursor: 'pointer', fontSize: '13px', fontWeight: '500',
          transition: 'all 0.15s ease',
        }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
          {dark ? 'Light' : 'Dark'}
        </button>

        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer',
        }}>A</div>
      </div>
    </nav>
  );
}