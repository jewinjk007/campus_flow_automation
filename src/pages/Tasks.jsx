import { useState } from 'react';
import { tokens } from '../components/Navbar';
import { CalendarDays, Plus, BookOpen, CheckCircle, Circle } from 'lucide-react';

export default function Tasks({ dark }) {
  const t = dark ? tokens.dark : tokens.light;
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, subject: 'Data Structures Assignment', deadline: '2025-07-15', studyPlan: ['Revise arrays and linked lists', 'Practice trees and graphs', 'Mock problems + submission'], status: 'active' },
    { id: 2, subject: 'Physics Lab Report', deadline: '2025-07-10', studyPlan: ['Complete observations', 'Write analysis section', 'Proofread and submit'], status: 'active' },
    { id: 3, subject: 'Chemistry Project', deadline: '2025-07-08', studyPlan: ['Research topic', 'Prepare slides', 'Final review'], status: 'done' },
  ]);

  const inputStyle = {
    width: '100%', border: `1px solid ${t.border}`, borderRadius: '10px',
    padding: '11px 14px', marginBottom: '16px', backgroundColor: t.inputBg,
    color: t.text, fontSize: '14px', boxSizing: 'border-box',
    outline: 'none', fontFamily: 'Inter, sans-serif',
  };

  const handleAddTask = async () => {
    if (!subject.trim() || !deadline) { setError('Please enter both subject and deadline.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('http://localhost:5000/ai/studyplan', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, deadline }),
      });
      if (!res.ok) throw new Error('Failed');
      const { studyPlan } = await res.json();
      setTasks(prev => [{ id: Date.now(), subject, deadline, studyPlan, status: 'active' }, ...prev]);
    } catch {
      setTasks(prev => [{ id: Date.now(), subject, deadline, studyPlan: ['Start early and review notes', 'Practice problems', 'Final revision before deadline'], status: 'active' }, ...prev]);
    } finally {
      setLoading(false); setSubject(''); setDeadline('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: t.bg, padding: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarDays size={20} color="#fff" />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: t.text, letterSpacing: '-0.5px' }}>Smart Deadline Manager</h1>
        </div>
        <p style={{ color: t.muted, fontSize: '14px', marginBottom: '28px', marginLeft: '52px' }}>
          Add a deadline — AI will generate a day-by-day study plan and send reminders.
        </p>

        {/* Add task form */}
        <div style={{ backgroundColor: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '24px', marginBottom: '28px', boxShadow: dark ? 'none' : '0 1px 4px rgba(99,102,241,0.06)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: t.text, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} color={tokens.primary} /> Add New Deadline
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: t.text, display: 'block', marginBottom: '6px' }}>Subject / Task Name</label>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Data Structures Assignment" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: t.text, display: 'block', marginBottom: '6px' }}>Deadline Date</label>
              <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} style={inputStyle} />
            </div>
          </div>

          {error && <p style={{ color: tokens.error, fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

          <button onClick={handleAddTask} disabled={loading} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '11px 24px', fontWeight: '700', fontSize: '14px',
            cursor: 'pointer', opacity: loading ? 0.7 : 1,
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
          }}>
            <Plus size={16} />
            {loading ? 'Generating study plan...' : 'Add Deadline & Generate Plan'}
          </button>
        </div>

        {/* Tasks list */}
        <h2 style={{ fontSize: '15px', fontWeight: '700', color: t.text, marginBottom: '16px' }}>Your Deadlines</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {tasks.map(task => (
            <div key={task.id} style={{ backgroundColor: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '20px', boxShadow: dark ? 'none' : '0 1px 4px rgba(99,102,241,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {task.status === 'done'
                    ? <CheckCircle size={18} color={tokens.success} />
                    : <Circle size={18} color={tokens.primary} />}
                  <h3 style={{ fontWeight: '700', color: t.text, fontSize: '15px' }}>{task.subject}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', color: t.muted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CalendarDays size={12} /> {task.deadline}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', backgroundColor: task.status === 'done' ? '#D1FAE5' : '#EEF2FF', color: task.status === 'done' ? '#065F46' : tokens.primary }}>
                    {task.status === 'done' ? 'Done' : 'Active'}
                  </span>
                </div>
              </div>

              <div style={{ backgroundColor: t.planBg, borderRadius: '10px', padding: '14px' }}>
                <p style={{ fontSize: '11px', fontWeight: '700', color: tokens.primary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={12} /> AI Study Plan
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {task.studyPlan.map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: tokens.primary, minWidth: '20px' }}>D{i + 1}</span>
                      <p style={{ fontSize: '13px', color: t.text }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}