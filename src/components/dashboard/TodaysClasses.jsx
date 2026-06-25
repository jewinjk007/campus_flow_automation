import Card from "../ui/Card";

const SAMPLE = [
  { time: "9:00 AM", subject: "Data Structures", room: "Room 204" },
  { time: "11:00 AM", subject: "Operating Systems", room: "Room 110" },
  { time: "2:00 PM", subject: "Placement Prep — Mock Interview", room: "Lab 3" },
];

export default function TodaysClasses({ classes = SAMPLE }) {
  return (
    <Card title="Today's Classes">
      <ul className="space-y-3">
        {classes.map((c, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="w-20 shrink-0 text-ink-400 text-xs pt-0.5">{c.time}</span>
            <div>
              <p className="text-ink-800 font-medium">{c.subject}</p>
              <p className="text-ink-400 text-xs">{c.room}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
