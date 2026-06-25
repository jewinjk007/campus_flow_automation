import { Plus, Sparkles, FileText, Users } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const ACTIONS = [
  { label: "Add task", icon: Plus },
  { label: "Ask AI", icon: Sparkles },
  { label: "Summarize notice", icon: FileText },
  { label: "Start study group", icon: Users },
];

export default function QuickActions({ onAction }) {
  return (
    <Card title="Quick Actions">
      <div className="grid grid-cols-2 gap-2">
        {ACTIONS.map(({ label, icon }) => (
          <Button
            key={label}
            variant="secondary"
            size="sm"
            icon={icon}
            onClick={() => onAction?.(label)}
            className="justify-start"
          >
            {label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
