import { Zap, Clock, TrendingUp, ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import WorkflowStatusBadge from "./WorkflowStatusBadge";

export default function WorkflowCard({
  name,
  trigger,
  status = "idle",
  lastRun,
  successRate,
  nextRun,
}) {
  return (
    <Card padding="md" className="hover:border-ink-200 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-ink-800">{name}</h3>
        <WorkflowStatusBadge status={status} />
      </div>

      <div className="flex items-center gap-1.5 text-xs text-ink-400 mb-4">
        <Zap size={13} />
        <span>Triggered by {trigger}</span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs border-t border-ink-50 pt-3">
        <div>
          <div className="flex items-center gap-1 text-ink-400 mb-1">
            <Clock size={12} /> Last run
          </div>
          <p className="text-ink-700 font-medium">{lastRun}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-ink-400 mb-1">
            <TrendingUp size={12} /> Success
          </div>
          <p className="text-ink-700 font-medium">{successRate}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-ink-400 mb-1">
            <ArrowRight size={12} /> Next run
          </div>
          <p className="text-ink-700 font-medium">{nextRun}</p>
        </div>
      </div>
    </Card>
  );
}
