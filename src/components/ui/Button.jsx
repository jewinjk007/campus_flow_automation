export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  const variants = {
    primary: "bg-clay-500 text-cream-50 hover:bg-clay-600",
    secondary:
      "bg-transparent text-ink-800 border border-ink-200 hover:bg-ink-50",
    ghost: "bg-transparent text-ink-600 hover:bg-ink-50",
    danger: "bg-danger-500 text-cream-50 hover:bg-danger-600",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 16} strokeWidth={2} />}
      {children}
    </button>
  );
}
