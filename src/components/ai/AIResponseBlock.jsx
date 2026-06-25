import { Sparkles } from "lucide-react";

// Large, readable, structured AI output — minimal chrome, generous whitespace.
// Use for Study Buddy answers, AI Tip of the Day, notice summaries, etc.
export default function AIResponseBlock({ label = "AI", children, className = "" }) {
  return (
    <div
      className={`bg-cream-50 border border-clay-100 rounded-lg p-5 md:p-6 ${className}`}
    >
      <div className="flex items-center gap-2 mb-3 text-clay-600">
        <Sparkles size={15} strokeWidth={2} />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="prose-sm text-ink-700 leading-relaxed text-[15px] space-y-3">
        {children}
      </div>
    </div>
  );
}
