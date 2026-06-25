import { useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Tabs from "../components/ui/Tabs";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function formatDue(deadline) {
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return "No deadline";
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function priorityForDeadline(deadline) {
  const dueDate = new Date(deadline);
  if (Number.isNaN(dueDate.getTime())) return "low";
  const days = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));
  if (days <= 1) return "high";
  if (days <= 3) return "medium";
  return "low";
}

const COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

const PRIORITY_TONE = { high: "danger", medium: "warning", low: "neutral" };

function TaskCard({ task }) {
  return (
    <Card padding="sm" className="mb-3">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-ink-800">{task.title}</p>
        <Badge tone={PRIORITY_TONE[task.priority]}>{task.priority}</Badge>
      </div>
      <p className="text-xs text-ink-400">{task.due}</p>
    </Card>
  );
}

function KanbanView({ tasks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLUMNS.map((col) => (
        <div key={col.key}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-3">
            {col.label} · {tasks.filter((t) => t.status === col.key).length}
          </h3>
          {tasks
            .filter((t) => t.status === col.key)
            .map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
        </div>
      ))}
    </div>
  );
}

function ListView({ tasks }) {
  return (
    <div className="space-y-2">
      {tasks.map((t) => (
        <Card key={t.id} padding="sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-800">{t.title}</p>
              <p className="text-xs text-ink-400">{t.due}</p>
            </div>
            <Badge tone={PRIORITY_TONE[t.priority]}>{t.priority}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TimelineView({ tasks }) {
  return (
    <div className="relative pl-4 border-l border-ink-100 space-y-5">
      {tasks.map((t) => (
        <div key={t.id} className="relative">
          <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-clay-500" />
          <p className="text-xs text-ink-400">{t.due}</p>
          <p className="text-sm text-ink-800 font-medium">{t.title}</p>
        </div>
      ))}
    </div>
  );
}

export default function Tasks() {
  const [view, setView] = useState("kanban");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "", deadline: "", add_to_calendar: true });
  const [error, setError] = useState("");
  const { student } = useAuth();

  useEffect(() => {
    async function loadTasks() {
      if (!student) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/tasks?student_id=${student.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load tasks");
        setTasks(data.tasks || []);
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [student]);

  const updateForm = (key) => (e) => {
    const value = key === "add_to_calendar" ? e.target.checked : e.target.value;
    setForm({ ...form, [key]: value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!student) {
      setError("Please log in first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, student_id: student.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not add task");

      setTasks((prev) => [...prev, data.task]);
      setForm({ title: "", subject: "", deadline: "", add_to_calendar: true });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="Tasks & Deadlines"
      subtitle="Every assignment, synced to your calendar and reminders."
      actions={
        <Button icon={Plus} size="sm" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Cancel" : "Add task"}
        </Button>
      }
    >
      {showForm && (
        <Card padding="md" className="mb-5">
          <form onSubmit={handleAddTask} className="space-y-4">
            <Input
              label="Title"
              placeholder="Submit DBMS assignment"
              value={form.title}
              onChange={updateForm("title")}
              required
            />
            <Input
              label="Subject"
              placeholder="Database Systems"
              value={form.subject}
              onChange={updateForm("subject")}
              required
            />
            <Input
              label="Deadline"
              type="date"
              value={form.deadline}
              onChange={updateForm("deadline")}
              required
            />
            <label className="flex items-center gap-2 text-sm text-ink-600">
              <input
                type="checkbox"
                checked={form.add_to_calendar}
                onChange={updateForm("add_to_calendar")}
              />
              Add to calendar reminders
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" size="md" disabled={loading}>
              {loading ? "Saving..." : "Save task"}
            </Button>
          </form>
        </Card>
      )}

      <div className="mb-5">
        <Tabs
          tabs={[
            { value: "kanban", label: "Kanban" },
            { value: "list", label: "List" },
            { value: "timeline", label: "Timeline" },
          ]}
          active={view}
          onChange={setView}
        />
      </div>

      {view === "kanban" && <KanbanView tasks={tasks.map((task) => ({
        ...task,
        status: "todo",
        priority: priorityForDeadline(task.deadline),
        due: formatDue(task.deadline),
      }))} />}
      {view === "list" && <ListView tasks={tasks.map((task) => ({
        ...task,
        status: "todo",
        priority: priorityForDeadline(task.deadline),
        due: formatDue(task.deadline),
      }))} />}
      {view === "timeline" && <TimelineView tasks={tasks.map((task) => ({
        ...task,
        status: "todo",
        priority: priorityForDeadline(task.deadline),
        due: formatDue(task.deadline),
      }))} />}
    </PageContainer>
  );
}
