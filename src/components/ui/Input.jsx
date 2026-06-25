export function Input({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-xs font-medium text-ink-600 mb-1.5">{label}</span>
      )}
      <input
        className={`w-full px-3 py-2 text-sm bg-cream-50 border rounded-md placeholder:text-ink-300 focus:border-clay-500 ${
          error ? "border-danger-500" : "border-ink-200"
        } ${className}`}
        {...props}
      />
      {error && <span className="block text-xs text-danger-500 mt-1">{error}</span>}
    </label>
  );
}

export function Select({ label, options = [], error, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-xs font-medium text-ink-600 mb-1.5">{label}</span>
      )}
      <select
        className={`w-full px-3 py-2 text-sm bg-cream-50 border rounded-md focus:border-clay-500 ${
          error ? "border-danger-500" : "border-ink-200"
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="block text-xs text-danger-500 mt-1">{error}</span>}
    </label>
  );
}
