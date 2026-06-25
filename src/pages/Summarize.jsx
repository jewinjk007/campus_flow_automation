import { useState } from 'react';

// Notice Summarizer — pastes a notice, gets AI bullets, broadcasts via WhatsApp
export default function Summarize() {
  const [noticeText, setNoticeText] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [phoneList, setPhoneList] = useState('');
  const [bullets, setBullets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    // Validate that all fields are filled before proceeding
    if (!noticeText.trim() || !eventDate || !phoneList.trim()) {
      setError('Please fill in all fields before submitting.');
      return;
    }

    setLoading(true);
    setError('');
    setSent(false);
    setBullets([]);

    try {
      // Step 1: Call backend to get AI-generated summary bullets
      const summaryRes = await fetch(`http://localhost:5000/ai/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noticeText }),
      });

      if (!summaryRes.ok) throw new Error('Summarization failed');
      const { bulletPoints } = await summaryRes.json();
      setBullets(bulletPoints);

      // Step 2: Send notice details to n8n broadcast webhook via backend
      const broadcastRes = await fetch(`http://localhost:5000/notify/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noticeText,
          eventDate,
          phoneList: phoneList.split(',').map(p => p.trim()),
          bulletPoints,
        }),
      });

      if (!broadcastRes.ok) throw new Error('Broadcast failed');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          📢 Notice Summarizer
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Paste a campus notice — AI will generate a 3-bullet TL;DR and broadcast it via WhatsApp.
        </p>

        {/* Notice text input */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notice Text
        </label>
        <textarea
          rows={6}
          value={noticeText}
          onChange={e => setNoticeText(e.target.value)}
          placeholder="Paste the full notice here..."
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Event date input */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Event Date
        </label>
        <input
          type="date"
          value={eventDate}
          onChange={e => setEventDate(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Phone numbers — comma separated */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone Numbers (comma-separated, with country code)
        </label>
        <input
          type="text"
          value={phoneList}
          onChange={e => setPhoneList(e.target.value)}
          placeholder="+919876543210, +919123456789"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Error message display */}
        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {/* Main action button */}
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? '⏳ Processing...' : '✨ Summarize & Broadcast'}
        </button>

        {/* AI bullet points result */}
        {bullets.length > 0 && (
          <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              📋 AI Summary
            </h2>
            <ul className="space-y-2">
              {bullets.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-indigo-500 font-bold mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Success message after broadcast */}
        {sent && (
          <div className="mt-4 bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg p-4 text-green-700 dark:text-green-300 font-medium">
            ✅ Broadcast sent! WhatsApp messages are on their way and the Calendar event has been created.
          </div>
        )}
      </div>
    </div>
  );
}