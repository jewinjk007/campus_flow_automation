import { Link } from "react-router-dom";
import Card from "../ui/Card";
import StatusIndicator from "../ui/StatusIndicator";

const SAMPLE = [
  { name: "Notice → Calendar sync", state: "success" },
  { name: "Deadline reminder broadcast", state: "running" },
  { name: "Attendance risk check", state: "scheduled" },
];

export default function AutomationsWidget({ automations = SAMPLE }) {
  return (
    <Card
      title="Active Automations"
      action={
        <Link to="/automations" className="text-xs text-clay-600 hover:underline">
          View all
        </Link>
      }
    >
      <ul className="space-y-3">
        {automations.map((a, i) => (
          <li key={i} className="flex items-center justify-between text-sm">
            <span className="text-ink-800">{a.name}</span>
            <StatusIndicator state={a.state} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
