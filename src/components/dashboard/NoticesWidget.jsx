import Card from "../ui/Card";
import { Megaphone } from "lucide-react";

const SAMPLE = [
  { title: "Mid-sem exam schedule released", time: "2h ago" },
  { title: "Placement drive — TCS, registration open", time: "1d ago" },
];

export default function NoticesWidget({ notices = SAMPLE }) {
  return (
    <Card
      title="Recent Notices"
      action={<Megaphone size={16} className="text-clay-500" />}
    >
      <ul className="space-y-3">
        {notices.map((n, i) => (
          <li key={i} className="text-sm">
            <p className="text-ink-800">{n.title}</p>
            <p className="text-ink-400 text-xs">{n.time}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
