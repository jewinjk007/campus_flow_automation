import PageContainer from "../components/layout/PageContainer";
import WorkflowCard from "../components/workflow/WorkflowCard";

const WORKFLOWS = [
  {
    name: "Notice → Calendar Sync",
    trigger: "New notice posted",
    status: "success",
    lastRun: "10m ago",
    successRate: "98%",
    nextRun: "On trigger",
  },
  {
    name: "Deadline Reminder Broadcast",
    trigger: "24h before due date",
    status: "running",
    lastRun: "Just now",
    successRate: "100%",
    nextRun: "Tomorrow 9 AM",
  },
  {
    name: "Attendance Risk Check",
    trigger: "Daily schedule",
    status: "scheduled",
    lastRun: "Yesterday",
    successRate: "100%",
    nextRun: "Today 6 PM",
  },
  {
    name: "Placement Drive Alert",
    trigger: "New placement notice",
    status: "idle",
    lastRun: "3 days ago",
    successRate: "92%",
    nextRun: "On trigger",
  },
];

export default function Automations() {
  return (
    <PageContainer
      title="Automation Center"
      subtitle="Every workflow CampusFlow is running quietly in the background."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WORKFLOWS.map((w) => (
          <WorkflowCard key={w.name} {...w} />
        ))}
      </div>
    </PageContainer>
  );
}
