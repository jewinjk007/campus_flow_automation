export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="inline-flex border border-ink-100 rounded-md p-1 bg-ink-50/40">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
            active === tab.value
              ? "bg-cream-50 text-ink-800 shadow-subtle font-medium"
              : "text-ink-500 hover:text-ink-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
