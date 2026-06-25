import { tokens } from '../components/Navbar';
import { Link } from 'react-router-dom';
import { CalendarDays, Megaphone, Clock, CheckCircle, Zap, User, TrendingUp, Bell } from 'lucide-react';

export default function Dashboard({ dark }) {
  const t = dark ? tokens.dark : tokens.light;

  const stats = [
    { value: '5', label: 'Active Deadlines', icon: <CalendarDays size={18} color="#6366F1" />, color: tokens.primary, bg: dark ? '#1a1f4b' : '#EEF2FF' },
    { value: '12', label: 'Notices Broadcast', icon: <Megaphone size={18} color="#10B981" />, color: tokens.success, bg: dark ? '#052e16' : '#D1FAE5' },
    { value: '3', label: 'Pending Reminders', icon: <Clock size={18} color="#F59E0B" />, color: tokens.warning, bg: dark ? '#3d2200' : '#FEF3C7' },
    { value: '98%', label: 'Delivery Rate', icon: <TrendingUp size={18} color="#8B5CF6" />, color: '#8B5CF6', bg: dark ? '#2e1065' : '#EDE9FE' },
  ];

  const quickActions = [
    { href: '/summarize', icon: <Megaphone size={22} color="#6366F1" />, title: 'Summarize Notice', desc: 'AI bullets + WhatsApp broadcast', light: dark ? '#1a1f4b' : '#EEF2FF' },
    { href: '/tasks', icon: <CalendarDays size={22} color="#10B981" />, title: 'Add Deadline', desc: 'AI generates a study plan', light: dark ? '#052e16' : '#D1FAE5' },
    { href: '/automations', icon: <Zap size={22} color="#F59E0B" />, title: 'View Automations', desc: 'Track n8n workflow triggers', light: dark ? '#3d2200' : '#FEF3C7' },
    { href: '/register', icon: <User size={22} color="#8B5CF6" />, title: 'My Account', desc: 'Manage your profile', light: dark ? '#2e1065' : '#EDE9FE' },
  ];

  const recentActivity = [
    { icon: <CheckCircle size={15} color={tokens.success} />, text: 'Deadline reminder sent for Data Structures', time: '2 min ago' },
    { icon: <Megaphone size={15} color={tokens.primary} />, text: 'Notice broadcast to 34 students', time: '1 hr ago' },
    { icon: <Zap size={15} color="#8B5CF6" />, text: 'n8n workflow triggered successfully', time: '3 hr ago' },
    { icon: <Bell size={15} color={tokens.warning} />, text: 'Physics Lab Report deadline added', time: 'Yesterday' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: t.bg, padding: '32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: t.text, letterSpacing: '-0.5px', marginBottom: '6px' }}>
            Good morning, Abin
          </h1>
          <p style={{ color: t.muted, fontSize: '15px' }}>
            Here's what's happening with your campus automations today.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              backgroundColor: t.surface, border: `1px solid ${t.border}`,
              borderRadius: '16px', padding: '20px',
              boxShadow: dark ? 'none' : '0 1px 4px rgba(99,102,241,0.06)',
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                {s.icon}
              </div>
              <p style={{ fontSize: '28px', fontWeight: '800', color: s.color, letterSpacing: '-1px' }}>{s.value}</p>
              <p style={{ fontSize: '13px', color: t.muted, marginTop: '2px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>

          {/* Quick actions */}
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: t.text, marginBottom: '16px' }}>Quick Actions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {quickActions.map((a, i) => (
                <Link key={i} to={a.href} style={{
                  backgroundColor: t.surface, border: `1px solid ${t.border}`,
                  borderRadius: '16px', padding: '20px', textDecoration: 'none',
                  display: 'block', transition: 'all 0.2s ease',
                  boxShadow: dark ? 'none' : '0 1px 4px rgba(99,102,241,0.06)',
                }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: a.light, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                    {a.icon}
                  </div>
                  <p style={{ fontWeight: '700', color: t.text, fontSize: '15px', marginBottom: '4px' }}>{a.title}</p>
                  <p style={{ fontSize: '13px', color: t.muted }}>{a.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: t.text, marginBottom: '16px' }}>Recent Activity</h2>
            <div style={{
              backgroundColor: t.surface, border: `1px solid ${t.border}`,
              borderRadius: '16px', padding: '8px',
              boxShadow: dark ? 'none' : '0 1px 4px rgba(99,102,241,0.06)',
            }}>
              {recentActivity.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {a.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: t.text, fontWeight: '500', lineHeight: '1.4' }}>{a.text}</p>
                    <p style={{ fontSize: '12px', color: t.subtle, marginTop: '2px' }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}