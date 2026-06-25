export default function Badge({ children, tone = "neutral", className = "" }) {
  const tones = {
    neutral: "bg-ink-50 text-ink-600 border-ink-100",
    primary: "bg-clay-50 text-clay-700 border-clay-100",
    success: "bg-success-50 text-success-600 border-success-50",
    warning: "bg-warning-50 text-warning-600 border-warning-50",
    danger: "bg-danger-50 text-danger-600 border-danger-50",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
