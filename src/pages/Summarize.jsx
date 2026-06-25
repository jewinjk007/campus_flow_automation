import { useState } from 'react';
import { tokens } from '../components/Navbar';
import { Megaphone, Send, CheckCircle, AlertCircle, FileText, Calendar, Phone } from 'lucide-react';

export default function Summarize({ dark }) {
  const t = dark ? tokens.dark : tokens.light;
  const [noticeText, setNoticeText] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [phoneList, setPhoneList] = useState('');
  const [bullets, setBullets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const inputStyle = {
    width: '100%', border: `1px solid ${t.border}`, borderRadius: '10px',
    padding: '11px 14px', marginBottom: '16px', backgroundColor: t.inputBg,
    color: t.text, fontSize: '14px', boxSizing: 'border-box',
    outline: 'none', fontFamily: 'Inter, sans-serif',
  };

  const handleSummarize = async () => {
    if (!noticeText.trim() || !eventDate || !phoneList.trim()) { setError('Please fill in all fields.'); return; }
    setLoading(true); setError(''); setSent(false); setBullets([]);
    try {
      const summaryRes = await fetch('http://localhost:5000/ai/summarize', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noticeText }),
      });
      if (!summaryRes.ok) throw new Error('Summarization failed');
      const { bulletPoints } = await summaryRes.json();
      setBullets(bulletPoints);
      const broadcastRes = await fetch('http://localhost:5000/notify/broadcast', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noticeText, eventDate, phoneList: phoneList.split(',').map(p => p.trim()), bulletPoints }),
      });
      if (!broadcastRes.ok) throw new Error('Broadcast failed');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: t.bg, padding: '32px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Megaphone size={20} color="#fff" />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: t.text, letterSpacing: '-0.5px' }}>Notice Summarizer</h1>
        </div>
        <p style={{ color: t.muted, fontSize: '14px', marginBottom: '28px', marginLeft: '52px' }}>
          Paste a campus notice — AI generates a 3-bullet TL;DR and broadcasts it via WhatsApp.
        </p>

        <div style={{ backgroundColor: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '24px', boxShadow: dark ? 'none' : '0 1px 4px rgba(99,102,241,0.06)' }}>

          <label style={{ fontSize: '13px', fontWeight: '600', color: t.text, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <FileText size={13} color={tokens.primary} /> Notice Text
          </label>
          <textarea rows={6} value={noticeText} onChange={e => setNoticeText(e.target.value)} placeholder="Paste the full campus notice here..." style={{ ...inputStyle, resize: 'vertical' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: t.text, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Calendar size={13} color={tokens.primary} /> Event Date
              </label>
              <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: t.text, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Phone size={13} color={tokens.primary} /> Phone Numbers
              </label>
              <input type="text" value={phoneList} onChange={e => setPhoneList(e.target.value)} placeholder="+919876543210, +919123456789" style={inputStyle} />
            </div>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.error, fontSize: '13px', marginBottom: '12px' }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button onClick={handleSummarize} disabled={loading} style={{
            width: '100%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '13px', fontWeight: '700', fontSize: '15px',
            cursor: 'pointer', opacity: loading ? 0.7 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
          }}>
            <Send size={16} />
            {loading ? 'Processing...' : 'Summarize & Broadcast'}
          </button>
        </div>

        {/* AI bullet results */}
        {bullets.length > 0 && (
          <div style={{ marginTop: '20px', backgroundColor: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '24px', boxShadow: dark ? 'none' : '0 1px 4px rgba(99,102,241,0.06)' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: t.text, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={15} color={tokens.primary} /> AI Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {bullets.map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', backgroundColor: t.planBg, borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: tokens.primary, minWidth: '20px', marginTop: '1px' }}>0{i + 1}</span>
                  <p style={{ fontSize: '14px', color: t.text, lineHeight: '1.5' }}>{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success message */}
        {sent && (
          <div style={{ marginTop: '16px', backgroundColor: dark ? '#052e16' : '#F0FDF4', border: `1px solid ${dark ? '#166534' : '#86EFAC'}`, borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: dark ? '#86efac' : '#065F46', fontWeight: '600', fontSize: '14px' }}>
            <CheckCircle size={18} /> Broadcast sent! WhatsApp messages are on their way and the Calendar event has been created.
          </div>
        )}
      </div>
    </div>
  );
}