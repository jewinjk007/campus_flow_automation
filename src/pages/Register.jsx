import { useState } from 'react';
import { tokens } from '../components/Navbar';

export default function Register({ dark }) {
  const t = dark ? tokens.dark : tokens.light;
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: '100%', border: `1px solid ${t.border}`, borderRadius: '10px',
    padding: '11px 14px', marginBottom: '16px', backgroundColor: t.inputBg,
    color: t.text, fontSize: '14px', boxSizing: 'border-box', outline: 'none',
    fontFamily: 'Inter, sans-serif',
  };

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields.'); return; }
    if (mode === 'signup' && !name.trim()) { setError('Please enter your name.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await fetch(`http://localhost:5000/auth/${mode === 'login' ? 'login' : 'register'}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'login' ? { email, password } : { name, email, password }),
      });
      if (!res.ok) throw new Error(mode === 'login' ? 'Invalid credentials.' : 'Registration failed.');
      setSuccess(mode === 'login' ? '✅ Logged in! Redirecting...' : '✅ Account created! You can now log in.');
      setTimeout(() => { window.location.href = '/dashboard'; }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: t.bg, display: 'flex' }}>

      {/* Left panel — branding */}
      <div style={{
        width: '45%', background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎓</div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>CampusFlow</span>
        </div>

        <div>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-1px' }}>
            Automate your campus life.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: '1.7' }}>
            AI-powered deadline reminders, notice broadcasts, and study plans — all in one place.
          </p>

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '📢', text: 'Broadcast notices to 1000+ students instantly' },
              { icon: '📅', text: 'AI generates personalized study plans' },
              { icon: '⚡', text: 'Automated WhatsApp reminders via n8n' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: '500' }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>© 2025 CampusFlow. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          <h1 style={{ fontSize: '26px', fontWeight: '800', color: t.text, marginBottom: '4px', letterSpacing: '-0.5px' }}>
            {mode === 'login' ? 'Welcome back 👋' : 'Create account 🚀'}
          </h1>
          <p style={{ color: t.muted, fontSize: '14px', marginBottom: '32px' }}>
            {mode === 'login' ? 'Log in to your CampusFlow account.' : 'Join thousands of students on CampusFlow.'}
          </p>

          {/* Mode toggle */}
          <div style={{ display: 'flex', backgroundColor: t.bg, borderRadius: '12px', padding: '4px', marginBottom: '28px', border: `1px solid ${t.border}` }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }} style={{
                flex: 1, padding: '9px', border: 'none', borderRadius: '9px',
                fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                backgroundColor: mode === m ? tokens.primary : 'transparent',
                color: mode === m ? '#ffffff' : t.muted,
                transition: 'all 0.2s ease',
              }}>
                {m === 'login' ? '🔑 Login' : '📝 Sign Up'}
              </button>
            ))}
          </div>

          {mode === 'signup' && (
            <>
              <label style={{ fontSize: '13px', fontWeight: '600', color: t.text, display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Abin Thomas" style={inputStyle} />
            </>
          )}

          <label style={{ fontSize: '13px', fontWeight: '600', color: t.text, display: 'block', marginBottom: '6px' }}>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@university.edu" style={inputStyle} />

          <label style={{ fontSize: '13px', fontWeight: '600', color: t.text, display: 'block', marginBottom: '6px' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" style={inputStyle} />

          {error && <p style={{ color: tokens.error, fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
          {success && <p style={{ color: tokens.success, fontSize: '13px', marginBottom: '12px' }}>{success}</p>}

          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '13px', fontWeight: '700', fontSize: '15px',
            cursor: 'pointer', opacity: loading ? 0.7 : 1,
            marginBottom: '20px', fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
          }}>
            {loading ? '⏳ Please wait...' : mode === 'login' ? '🔑 Login to CampusFlow' : '🚀 Create My Account'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: t.muted }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <span onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); }}
              style={{ color: tokens.primary, fontWeight: '600', cursor: 'pointer' }}>
              {mode === 'login' ? 'Sign up free' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}