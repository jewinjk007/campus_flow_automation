import Card from "../ui/Card";
import { CalendarCheck } from "lucide-react";

const SAMPLE = [
  { time: "9:00", label: "Data Structures class", synced: true },
  { time: "2:00", label: "Mock Interview", synced: true },
  { time: "6:00", label: "Study Group — DBMS", synced: false },
];

export default function CalendarTimeline({ events = SAMPLE }) {
  return (
    <Card
      title="Calendar Timeline"
      subtitle="Today"
      action={<CalendarCheck size={16} className="text-sage-500" />}
    >
      <div className="relative pl-4 border-l border-ink-100 space-y-4">
        {events.map((e, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-clay-500" />
            <p className="text-xs text-ink-400">{e.time}</p>
            <p className="text-sm text-ink-800">{e.label}</p>
            {e.synced && (
              <span className="text-xs text-sage-600">Synced to Google Calendar</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
