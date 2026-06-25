import Card from "../ui/Card";
import StatusIndicator from "../ui/StatusIndicator";
import { MessageCircle } from "lucide-react";

const SAMPLE = [
  { label: "DBMS Assignment reminder", state: "success", time: "Sent 2h ago" },
  { label: "Attendance warning — OS", state: "scheduled", time: "Sends at 6 PM" },
];

export default function WhatsAppStatusWidget({ reminders = SAMPLE }) {
  return (
    <Card
      title="WhatsApp Reminders"
      action={<MessageCircle size={16} className="text-sage-500" />}
    >
      <ul className="space-y-3">
        {reminders.map((r, i) => (
          <li key={i} className="flex items-center justify-between text-sm">
            <div>
              <p className="text-ink-800">{r.label}</p>
              <p className="text-ink-400 text-xs">{r.time}</p>
            </div>
            <StatusIndicator state={r.state} showLabel={false} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
