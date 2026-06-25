import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-ink-900/30 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-cream-50 rounded-lg border border-ink-100 shadow-subtle max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
          <h3 className="font-display text-lg text-ink-800">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink-400 hover:text-ink-700"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="px-5 py-4 border-t border-ink-100 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
