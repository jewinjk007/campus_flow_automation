import { useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import TodaysClasses from "../components/dashboard/TodaysClasses";
import DeadlinesWidget from "../components/dashboard/DeadlinesWidget";
import CalendarTimeline from "../components/dashboard/CalendarTimeline";
import AITipWidget from "../components/dashboard/AITipWidget";
import AttendanceAlert from "../components/dashboard/AttendanceAlert";
import WhatsAppStatusWidget from "../components/dashboard/WhatsAppStatusWidget";
import AutomationsWidget from "../components/dashboard/AutomationsWidget";
import NoticesWidget from "../components/dashboard/NoticesWidget";
import QuickActions from "../components/dashboard/QuickActions";
import { useAuth } from "../context/AuthContext";

function formatDue(deadline) {
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return "Unknown";
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

export default function Dashboard() {
  const { student } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!student) return;
      setLoading(true);

      try {
        const [tasksRes, attendanceRes] = await Promise.all([
          fetch(`/api/tasks?student_id=${student.id}`),
          fetch(`/api/attendance?student_id=${student.id}`),
        ]);

        const tasksData = await tasksRes.json();
        const attendanceData = await attendanceRes.json();

        if (tasksRes.ok) {
          setTasks(tasksData.tasks || []);
        }

        if (attendanceRes.ok) {
          setAttendance(attendanceData.attendance || []);
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [student]);

  const deadlines = tasks.length
    ? tasks.slice(0, 3).map((task) => ({
        title: task.title,
        due: formatDue(task.deadline),
        priority: priorityForDeadline(task.deadline),
      }))
    : undefined;

  const calendarEvents = tasks.length
    ? tasks
        .filter((task) => task.add_to_calendar)
        .slice(0, 3)
        .map((task) => {
          const deadline = new Date(task.deadline);
          return {
            time: Number.isNaN(deadline.getTime())
              ? "TBD"
              : deadline.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                }),
            label: task.title,
            synced: Boolean(task.add_to_calendar),
          };
        })
    : undefined;

  const reminders = tasks.length
    ? tasks
        .slice()
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 3)
        .map((task) => ({
          label: `Reminder — ${task.title}`,
          state: "success",
          time: `Due ${formatDue(task.deadline)}`,
        }))
    : undefined;

  return (
    <PageContainer
      title="Good morning, Student"
      subtitle="Here's what needs your attention today."
    >
      <div className="mb-5">
        <AITipWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <TodaysClasses />
          <CalendarTimeline events={calendarEvents} />
          <NoticesWidget />
        </div>

        <div className="space-y-5">
          <DeadlinesWidget deadlines={deadlines} />
          <AttendanceAlert subjects={attendance} />
          <WhatsAppStatusWidget reminders={reminders} />
          <AutomationsWidget />
          <QuickActions />
        </div>
      </div>
    </PageContainer>
  );
}
