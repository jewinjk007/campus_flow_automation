# 🎓 CampusFlow

> AI-Powered Student Productivity Platform with WhatsApp Reminders & Google Calendar Automation

CampusFlow is a smart student management platform that helps students organize academic tasks, deadlines, schedules, and campus notices through AI-powered assistance and workflow automation. The platform integrates with WhatsApp and Google Calendar to automatically remind students about important deadlines and events, ensuring that critical information never gets lost in busy group chats or notice boards.

---

## 📖 Overview

College students often struggle to keep track of assignments, exams, project deadlines, attendance requirements, and important notices. CampusFlow addresses this challenge by providing a centralized dashboard where students can manage tasks while AI and automation handle reminders, scheduling, and information processing.

The platform combines:

- 🤖 Artificial Intelligence for content summarization and study assistance
- 📲 WhatsApp notifications for instant reminders
- 📅 Google Calendar integration for automatic scheduling
- 🔁 n8n workflow automation for event-driven processes
- ☁️ Cloud database and authentication services

---

# ✨ Features

## Core Features

### Student Onboarding
- Student registration and login
- Branch and year selection
- Subject management
- WhatsApp number registration
- Google account integration

### Dashboard
- Daily schedule overview
- Upcoming deadlines
- Pending tasks
- AI-generated productivity tips
- Automation status tracking

### Task & Deadline Management
- Create, update, and delete tasks
- Set assignment deadlines
- Configure reminder timings
- Enable automatic calendar creation
- Track task completion

### WhatsApp Automation
- Instant task creation confirmation
- Deadline reminders
- 24-hour reminder notifications
- 1-hour final reminder notifications
- Broadcast messages for important notices

### Google Calendar Integration
- Automatic event creation
- Deadline scheduling
- Study session planning
- Event descriptions and reminders

---

# 🤖 AI Modules

## 1. AI Study Buddy
Upload or paste lecture notes and generate:

- Flashcards
- MCQ quizzes
- Quick revision material
- Key concept summaries

---

## 2. Notice Summarizer
Paste lengthy college notices and receive:

- 3-point summaries
- Important dates extraction
- Event reminders
- Calendar event generation

---

## 3. Smart Deadline Manager
- Deadline prioritization
- Study schedule recommendations
- Workload balancing suggestions
- Reminder optimization

---

## 4. Attendance Risk Alerter
- Attendance percentage tracking
- Risk prediction
- Minimum classes required calculation
- Weekly attendance alerts

---

## 5. Placement Preparation Tracker
- Company application tracking
- Interview preparation schedules
- Progress monitoring
- AI-generated preparation plans

---

## 6. Study Group Scheduler
- Match students based on subjects
- Schedule study sessions
- Generate group events
- Send WhatsApp invitations

---

# 🏗️ System Architecture

```text
┌───────────────────┐
│      Frontend     │
│   React / Next    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│      Backend      │
│ Node.js + Express │
└─────────┬─────────┘
          │
 ┌────────┼────────┐
 ▼        ▼        ▼
AI API  Supabase   n8n
 │        │         │
 ▼        ▼         ▼
GPT     Database  Automation
                     │
             ┌───────┴────────┐
             ▼                ▼
        WhatsApp       Google Calendar
```

---

# 🛠️ Tech Stack

## Frontend
- React.js / Next.js
- Tailwind CSS
- Shadcn UI
- Axios
- React Hook Form

## Backend
- Node.js
- Express.js

## Database & Authentication
- Supabase

## AI Services
- OpenAI GPT
- Gemini
- Groq API

## Automation
- n8n

## External Integrations
- Twilio WhatsApp API
- Google Calendar API

---

# 📂 Project Structure

```text
CampusFlow/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── models/
│   └── utils/
│
├── workflows/
│   ├── deadline-reminder.json
│   └── notice-broadcast.json
│
├── docs/
│
├── .env.example
├── README.md
└── package.json
```

---

# 🔄 Workflow Automation

## Workflow 1: Deadline Reminder

### Trigger
Task creation

### Process
1. Task created in application
2. Backend sends webhook to n8n
3. Google Calendar event created
4. Reminder scheduled
5. WhatsApp notification sent 24 hours before deadline
6. Optional final reminder sent 1 hour before deadline

---

## Workflow 2: Notice Broadcast

### Trigger
Notice submission

### Process
1. Notice submitted
2. AI generates summary
3. Calendar event created
4. Summary broadcast through WhatsApp
5. Students receive event details

---

# 🔐 Environment Variables

Create a `.env` file:

```env
PORT=5000

SUPABASE_URL=
SUPABASE_KEY=

AI_API_KEY=

N8N_DEADLINE_WEBHOOK=
N8N_NOTICE_WEBHOOK=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/campusflow.git
cd campusflow
```

## Install Frontend

```bash
cd frontend
npm install
npm run dev
```

## Install Backend

```bash
cd backend
npm install
npm run dev
```

---

# 📱 User Flow

1. Register student account
2. Connect WhatsApp and Google Calendar
3. Create a task or deadline
4. System automatically:
   - Creates calendar event
   - Schedules reminders
   - Sends WhatsApp confirmation
5. Receive reminders before deadline
6. Stay updated with AI-generated summaries and recommendations

---

# 🎯 Problem Solved

CampusFlow eliminates the need for students to manually track deadlines, monitor notices, and manage schedules across multiple platforms. By integrating AI, automation, and communication tools into a single ecosystem, the platform reduces missed deadlines, improves productivity, and helps students focus on learning rather than administrative tasks.

---

# 🔮 Future Enhancements

- Mobile application
- Attendance integration with ERP systems
- OCR-based notice scanning
- Voice assistant support
- Smart timetable generation
- Collaborative study spaces
- AI-powered academic analytics
- Placement recommendation engine
- Multi-college deployment support

---

# 👥 Contributors

 - Jewin Jinson
 - Albert John
 - Alvin Aju
 - Abin Kurian
---

## 📜 License

This project is licensed under the MIT License.

---

**Built with ❤️ for students who deserve smarter academic management.**
