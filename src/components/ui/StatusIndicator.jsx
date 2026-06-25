// Used for workflow & automation status across Automation Center, Calendar sync, WhatsApp status, etc.
const STATES = {
  running: { color: "bg-clay-500", label: "Running", pulse: true },
  success: { color: "bg-success-500", label: "Success", pulse: false },
  failed: { color: "bg-danger-500", label: "Failed", pulse: false },
  idle: { color: "bg-ink-300", label: "Idle", pulse: false },
  scheduled: { color: "bg-sage-500", label: "Scheduled", pulse: false },
};

export default function StatusIndicator({ state = "idle", showLabel = true, className = "" }) {
  const config = STATES[state] || STATES.idle;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${config.color} opacity-50 animate-ping`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${config.color}`} />
      </span>
      {showLabel && (
        <span className="text-xs font-medium text-ink-600">{config.label}</span>
      )}
    </span>
  );
}
