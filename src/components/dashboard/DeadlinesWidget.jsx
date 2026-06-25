import Card from "../ui/Card";
import Badge from "../ui/Badge";

const SAMPLE = [
  { title: "DBMS Assignment 3", due: "Tomorrow, 11:59 PM", priority: "high" },
  { title: "OS Lab Report", due: "In 3 days", priority: "medium" },
  { title: "Placement Resume Draft", due: "In 5 days", priority: "low" },
];

const PRIORITY_TONE = { high: "danger", medium: "warning", low: "neutral" };

export default function DeadlinesWidget({ deadlines = SAMPLE }) {
  return (
    <Card title="Upcoming Deadlines">
      <ul className="space-y-3">
        {deadlines.map((d, i) => (
          <li key={i} className="flex items-center justify-between text-sm">
            <div>
              <p className="text-ink-800 font-medium">{d.title}</p>
              <p className="text-ink-400 text-xs">{d.due}</p>
            </div>
            <Badge tone={PRIORITY_TONE[d.priority]}>{d.priority}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
