// Dashboard — main landing page showing summary stats and quick actions
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Welcome header */}
        <h1 className="text-3xl font-bold text-indigo-600 mb-1">
          👋 Welcome to CampusFlow
        </h1>
        <p className="text-gray-500 mb-8">
          Your smart campus automation platform — deadlines, notices, and reminders all in one place.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
            <p className="text-3xl font-bold text-indigo-600">5</p>
            <p className="text-sm text-gray-500 mt-1">Active Deadlines</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
            <p className="text-3xl font-bold text-green-500">12</p>
            <p className="text-sm text-gray-500 mt-1">Notices Broadcast</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
            <p className="text-3xl font-bold text-yellow-500">3</p>
            <p className="text-sm text-gray-500 mt-1">Pending Reminders</p>
          </div>
        </div>

        {/* Quick actions */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <a href="/summarize" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-5 block transition-colors">
            <p className="text-xl mb-1">📢</p>
            <p className="font-semibold">Summarize a Notice</p>
            <p className="text-sm text-indigo-200 mt-1">Paste notice → AI bullets → WhatsApp broadcast</p>
          </a>
          <a href="/tasks" className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-5 block transition-colors">
            <p className="text-xl mb-1">📅</p>
            <p className="font-semibold">Add a Deadline</p>
            <p className="text-sm text-gray-500 mt-1">AI generates a study plan and sends reminders</p>
          </a>
          <a href="/automations" className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-5 block transition-colors">
            <p className="text-xl mb-1">⚡</p>
            <p className="font-semibold">View Automations</p>
            <p className="text-sm text-gray-500 mt-1">Track all your n8n workflow triggers</p>
          </a>
          <a href="/register" className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-5 block transition-colors">
            <p className="text-xl mb-1">🎓</p>
            <p className="font-semibold">Register</p>
            <p className="text-sm text-gray-500 mt-1">Set up your campus profile</p>
          </a>
        </div>

      </div>
    </div>
  );
}