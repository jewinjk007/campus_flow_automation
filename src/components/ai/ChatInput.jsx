import { useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ChatInput({ onSend, placeholder = "Ask Study Buddy anything..." }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue("");
  };

  return (
    <div className="flex items-end gap-2 border border-ink-200 bg-cream-50 rounded-lg px-3 py-2.5 focus-within:border-clay-500">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={placeholder}
        rows={1}
        className="flex-1 resize-none bg-transparent outline-none text-sm placeholder:text-ink-300 max-h-32"
      />
      <button
        onClick={handleSend}
        aria-label="Send"
        className="shrink-0 bg-clay-500 hover:bg-clay-600 text-cream-50 rounded-md p-2 disabled:opacity-40"
        disabled={!value.trim()}
      >
        <ArrowUp size={15} />
      </button>
    </div>
  );
}
