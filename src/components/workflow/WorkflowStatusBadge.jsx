import StatusIndicator from "../ui/StatusIndicator";

// Thin wrapper kept separate from generic StatusIndicator since Automation Center
// may need workflow-specific labelling (e.g. "Disabled") distinct from dashboard widgets.
export default function WorkflowStatusBadge({ status }) {
  return <StatusIndicator state={status} />;
}
