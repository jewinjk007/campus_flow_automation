import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  CalendarDays,
  Sparkles,
  Megaphone,
  ShieldAlert,
  Briefcase,
  Users,
  Workflow,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks & Deadlines", icon: ListChecks },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/ai-hub", label: "AI Study Hub", icon: Sparkles },
  { to: "/notices", label: "Notice Intelligence", icon: Megaphone },
  { to: "/attendance", label: "Attendance Risk", icon: ShieldAlert },
  { to: "/placement", label: "Placement Tracker", icon: Briefcase },
  { to: "/study-groups", label: "Study Groups", icon: Users },
  { to: "/automations", label: "Automation Center", icon: Workflow },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-ink-100 bg-cream-100 h-screen sticky top-0 px-3 py-5">
      <div className="px-2 mb-6">
        <span className="font-display text-lg text-ink-800">CampusFlow</span>
      </div>
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-clay-50 text-clay-700 font-medium"
                  : "text-ink-600 hover:bg-ink-50"
              }`
            }
          >
            <Icon size={16} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
