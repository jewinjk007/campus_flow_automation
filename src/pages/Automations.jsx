import { tokens } from '../components/Navbar';
import { CheckCircle, Clock, XCircle, Zap, Megaphone, CalendarDays } from 'lucide-react';

const SAMPLE_AUTOMATIONS = [
  { id: 1, type: 'Deadline Reminder', subject: 'Data Structures Assignment', triggeredAt: '2025-07-10 09:00 AM', status: 'success', message: 'WhatsApp sent + Calendar event created', typeIcon: <CalendarDays size={15} /> },
  { id: 2, type: 'Notice Broadcast', subject: 'Mid-Semester Exam Schedule', triggeredAt: '2025-07-09 03:30 PM', status: 'success', message: 'Broadcast sent to 12 students', typeIcon: <Megaphone size={15} /> },
  { id: 3, type: 'Deadline Reminder', subject: 'Physics Lab Report', triggeredAt: '2025-07-09 08:00 AM', status: 'pending', message: 'Scheduled for 1-hour nudge', typeIcon: <CalendarDays size={15} /> },
  { id: 4, type: 'Notice Broadcast', subject: 'Library Closure Notice', triggeredAt: '2025-07-08 11:15 AM', status: 'success', message: 'Broadcast sent to 34 students', typeIcon: <Megaphone size={15} /> },
  { id: 5, type: 'Deadline Reminder', subject: 'Chemistry Project Submission', triggeredAt: '2025-07-07 07:00 AM', status: 'failed', message: 'WhatsApp delivery failed — retry pending', typeIcon: <CalendarDays size={15} /> },
];

function StatusBadge({ status }) {
  const config = {
    success: { bg: '#D1FAE5', color: '#065F46', icon: <CheckCircle size={12} />, label: 'Success' },
    pending: { bg: '#FEF3C7', color: '#92400E', icon: <Clock size={12} />, label: 'Pending' },
    failed: { bg: '#FEE2E2', color: '#991B1B', icon: <XCircle size={12} />, label: 'Failed' },
  };
  const c = config[status];
  return (
    <span style={{ backgroundColor: c.bg, color: c.color, fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
      {c.icon}{c.label}
    </span>
  );
}

export default function Automations({ dark }) {
  const t = dark ? tokens.dark : tokens.light;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: t.bg, padding: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="#fff" />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: t.text, letterSpacing: '-0.5px' }}>My Automations</h1>
        </div>
        <p style={{ color: t.muted, fontSize: '14px', marginBottom: '28px', marginLeft: '52px' }}>
          Recent n8n workflow triggers and their delivery status.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SAMPLE_AUTOMATIONS.map(item => (
            <div key={item.id} style={{
              backgroundColor: t.surface, border: `1px solid ${t.border}`,
              borderRadius: '14px', padding: '18px 20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
              boxShadow: dark ? 'none' : '0 1px 4px rgba(99,102,241,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: dark ? '#1a1f4b' : '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: tokens.primary }}>
                  {item.typeIcon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '11px', color: tokens.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.type}</span>
                  </div>
                  <h3 style={{ fontWeight: '600', color: t.text, fontSize: '14px', marginBottom: '2px' }}>{item.subject}</h3>
                  <p style={{ fontSize: '12px', color: t.muted }}>{item.message}</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                <StatusBadge status={item.status} />
                <p style={{ fontSize: '11px', color: t.subtle, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={11} /> {item.triggeredAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}