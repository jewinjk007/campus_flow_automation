export default function Card({
  children,
  title,
  subtitle,
  action,
  padding = "md",
  className = "",
}) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div
      className={`bg-cream-50 border border-ink-100 rounded-lg shadow-subtle ${paddings[padding]} ${className}`}
    >
      {(title || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-ink-800 font-sans">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-ink-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
