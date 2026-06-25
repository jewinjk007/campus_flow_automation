import { Search, Bell } from "lucide-react";

export default function Navbar({ userName = "Student" }) {
  return (
    <header className="sticky top-0 z-10 bg-cream-200/90 backdrop-blur-sm border-b border-ink-100">
      <div className="flex items-center justify-between px-5 py-3 md:px-8">
        <div className="flex items-center gap-2 text-ink-400 bg-cream-50 border border-ink-100 rounded-md px-3 py-1.5 w-full max-w-xs">
          <Search size={15} />
          <input
            placeholder="Search tasks, notices, notes..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-ink-300"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-clay-100 text-clay-700 flex items-center justify-center text-sm font-medium">
              {userName.charAt(0)}
            </div>
            <span className="text-sm text-ink-700 hidden sm:inline">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
