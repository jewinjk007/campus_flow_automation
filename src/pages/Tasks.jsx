import { useState } from 'react';

// Tasks page — add deadlines and get AI study plans via backend
export default function Tasks() {
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      subject: 'Data Structures Assignment',
      deadline: '2025-07-15',
      studyPlan: ['Day 1: Revise arrays and linked lists', 'Day 2: Practice trees and graphs', 'Day 3: Mock problems + submission'],
      status: 'active',
    },
    {
      id: 2,
      subject: 'Physics Lab Report',
      deadline: '2025-07-10',
      studyPlan: ['Day 1: Complete observations', 'Day 2: Write analysis', 'Day 3: Proofread and submit'],
      status: 'active',
    },
    {
      id: 3,
      subject: 'Chemistry Project',
      deadline: '2025-07-08',
      studyPlan: ['Day 1: Research topic', 'Day 2: Prepare slides', 'Day 3: Final review'],
      status: 'done',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddTask = async () => {
    // Validate inputs before submitting
    if (!subject.trim() || !deadline) {
      setError('Please enter both subject and deadline.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call backend to get AI-generated study plan for this deadline
      const res = await fetch('http://localhost:5000/ai/studyplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, deadline }),
      });

      if (!res.ok) throw new Error('Failed to generate study plan');
      const { studyPlan } = await res.json();

      // Add new task with AI study plan to the list
      const newTask = {
        id: Date.now(),
        subject,
        deadline,
        studyPlan,
        status: 'active',
      };

      setTasks(prev => [newTask, ...prev]);
      setSubject('');
      setDeadline('');
    } catch (err) {
      // If backend isn't ready yet, add task with placeholder plan
      const newTask = {
        id: Date.now(),
        subject,
        deadline,
        studyPlan: ['Day 1: Start early and review notes', 'Day 2: Practice problems', 'Day 3: Final revision before deadline'],
        status: 'active',
      };
      setTasks(prev => [newTask, ...prev]);
      setSubject('');
      setDeadline('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">
          📅 Smart Deadline Manager
        </h1>
        <p className="text-gray-500 mb-6">
          Add a deadline — AI will generate a day-by-day study plan and send you reminders.
        </p>

        {/* Add new task form */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Deadline</h2>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject / Task Name
          </label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="e.g. Data Structures Assignment"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deadline Date
          </label>
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            onClick={handleAddTask}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? '⏳ Generating study plan...' : '➕ Add Deadline & Generate Plan'}
          </button>
        </div>

        {/* Existing tasks list */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Deadlines</h2>
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{task.subject}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">📅 {task.deadline}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    task.status === 'done'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {task.status === 'done' ? '✅ Done' : '🔵 Active'}
                  </span>
                </div>
              </div>

              {/* AI generated study plan */}
              <div className="bg-indigo-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-indigo-500 uppercase mb-2">
                  📋 AI Study Plan
                </p>
                <ul className="space-y-1">
                  {task.studyPlan.map((step, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}