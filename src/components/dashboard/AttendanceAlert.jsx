import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { ShieldAlert } from "lucide-react";

const SAMPLE = [
  { subject: "Operating Systems", current: 71, required: 75 },
  { subject: "Mathematics III", current: 68, required: 75 },
];

export default function AttendanceAlert({ subjects = SAMPLE }) {
  const items = subjects && subjects.length ? subjects : SAMPLE;

  return (
    <Card
      title="Attendance Risk"
      action={<ShieldAlert size={16} className="text-warning-500" />}
    >
      <ul className="space-y-3">
        {items.map((s, i) => (
          <li key={i} className="flex items-center justify-between text-sm">
            <div>
              <p className="text-ink-800 font-medium">{s.subject}</p>
              <p className="text-ink-400 text-xs">
                {s.current}% — needs {s.required}%
              </p>
            </div>
            <Badge tone={s.current < s.required ? "danger" : "success"}>
              {s.current < s.required ? "At risk" : "Safe"}
            </Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
