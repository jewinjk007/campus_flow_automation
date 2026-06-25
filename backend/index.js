require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Route modules
const registerRoutes = require('./routes/register');
const tasksRoutes    = require('./routes/tasks');
const aiRoutes       = require('./routes/ai');
const noticeRoutes   = require('./routes/notice');

const app  = express();
const PORT = process.env.PORT || 5000;

// ----------------------------------------------------------------
// Middleware
// ----------------------------------------------------------------
app.use(cors());                        // allow React frontend to call this
app.use(express.json());                // parse JSON request bodies

// ----------------------------------------------------------------
// Health check — Person 1 & 2 can hit this to confirm server is up
// ----------------------------------------------------------------
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ----------------------------------------------------------------
// Routes
// ----------------------------------------------------------------
app.use('/register', registerRoutes);   // POST /register, GET /register/:id
app.use('/tasks',    tasksRoutes);      // POST /tasks, GET /tasks, DELETE /tasks/:id
app.use('/ai',       aiRoutes);         // POST /ai/summarize, POST /ai/studyplan
app.use('/notice',   noticeRoutes);     // POST /notice/broadcast

// ----------------------------------------------------------------
// Global error handler (must be last)
// ----------------------------------------------------------------
app.use(errorHandler);

// ----------------------------------------------------------------
// Start server
// ----------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`CampusFlow backend running on http://localhost:${PORT}`);
  console.log(`  POST /register`);
  console.log(`  POST /tasks  |  GET /tasks?student_id=xxx`);
  console.log(`  POST /ai/summarize`);
  console.log(`  POST /ai/studyplan`);
  console.log(`  POST /notice/broadcast`);
});

module.exports = app;
