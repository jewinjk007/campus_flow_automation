// My Automations page — shows recent n8n trigger history with status badges
// Data is seeded for demo purposes

const SAMPLE_AUTOMATIONS = [
  {
    id: 1,
    type: 'Deadline Reminder',
    subject: 'Data Structures Assignment',
    triggeredAt: '2025-07-10 09:00 AM',
    status: 'success',
    message: 'WhatsApp sent + Calendar event created',
  },
  {
    id: 2,
    type: 'Notice Broadcast',
    subject: 'Mid-Semester Exam Schedule',
    triggeredAt: '2025-07-09 03:30 PM',
    status: 'success',
    message: 'Broadcast sent to 12 students',
  },
  {
    id: 3,
    type: 'Deadline Reminder',
    subject: 'Physics Lab Report',
    triggeredAt: '2025-07-09 08:00 AM',
    status: 'pending',
    message: 'Scheduled for 1-hour nudge',
  },
  {
    id: 4,
    type: 'Notice Broadcast',
    subject: 'Library Closure Notice',
    triggeredAt: '2025-07-08 11:15 AM',
    status: 'success',
    message: 'Broadcast sent to 34 students',
  },
  {
    id: 5,
    type: 'Deadline Reminder',
    subject: 'Chemistry Project Submission',
    triggeredAt: '2025-07-07 07:00 AM',
    status: 'failed',
    message: 'WhatsApp delivery failed — retry pending',
  },
];

// Badge component — shows colored status pill for each automation
function StatusBadge({ status }) {
  const styles = {
    success: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
  };
  const labels = {
    success: '✅ Success',
    pending: '⏳ Pending',
    failed: '❌ Failed',
  };

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function Automations() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">
          ⚡ My Automations
        </h1>
        <p className="text-gray-500 mb-6">
          Recent n8n workflow triggers and their delivery status.
        </p>

        <div className="space-y-4">
          {SAMPLE_AUTOMATIONS.map(item => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-5 flex items-start justify-between gap-4"
            >
              <div>
                <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">
                  {item.type}
                </span>
                <h3 className="text-gray-800 font-semibold mt-1">{item.subject}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{item.message}</p>
                <p className="text-xs text-gray-400 mt-1">🕐 {item.triggeredAt}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}