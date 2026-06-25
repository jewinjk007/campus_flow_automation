const express = require('express');
const router = express.Router();
const axios = require('axios');
const supabase = require('../config/supabase');

// ----------------------------------------------------------------
// POST /tasks
// Body: { student_id, title, subject, deadline, add_to_calendar }
// 1. Saves task to Supabase
// 2. Calls /ai/studyplan internally
// 3. POSTs to n8n Deadline Reminder webhook
// ----------------------------------------------------------------
router.post('/', async (req, res, next) => {
  try {
    const { student_id, title, subject, deadline, add_to_calendar = true } = req.body;

    if (!student_id || !title || !subject || !deadline) {
      return res.status(400).json({
        error: 'Required: student_id, title, subject, deadline',
      });
    }

    // Compute reminder = 24 hours before deadline
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate)) {
      return res.status(400).json({ error: 'deadline must be a valid ISO 8601 date' });
    }
    const reminder_time = new Date(deadlineDate.getTime() - 24 * 60 * 60 * 1000).toISOString();

    // --- Fetch student for phone + email (needed for n8n) ---
    const { data: student, error: studentErr } = await supabase
      .from('students')
      .select('name, phone, email')
      .eq('id', student_id)
      .single();

    if (studentErr || !student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // --- Generate AI study plan (non-blocking — don't fail if Groq is down) ---
    let study_plan = null;
    try {
      const planRes = await axios.post(
        `http://localhost:${process.env.PORT || 5000}/ai/studyplan`,
        { subject, deadline }
      );
      study_plan = planRes.data.studyPlan || null;
    } catch (aiErr) {
      console.warn('[/tasks] Study plan generation failed (non-fatal):', aiErr.message);
    }

    // --- Save task to Supabase ---
    const { data: task, error: taskErr } = await supabase
      .from('tasks')
      .insert([{ student_id, title, subject, deadline, reminder_time, add_to_calendar, study_plan }])
      .select()
      .single();

    if (taskErr) {
      return res.status(500).json({ error: taskErr.message });
    }

    // --- POST to n8n Deadline Reminder webhook ---
    try {
      await axios.post(process.env.N8N_DEADLINE_WEBHOOK, {
        taskId:         task.id,
        title,
        subject,
        deadline,
        reminderTime:   reminder_time,
        addToCalendar:  add_to_calendar,
        studyPlan:      study_plan,
        studentName:    student.name,
        studentPhone:   student.phone,   // Twilio WhatsApp sends here
        studentEmail:   student.email,   // Google Calendar invite goes here
      });
      console.log(`[/tasks] n8n webhook fired for task: ${task.id}`);
    } catch (webhookErr) {
      // Don't fail the whole request if n8n is down — task is already saved
      console.error('[/tasks] n8n webhook error (non-fatal):', webhookErr.message);
    }

    return res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------------------
// GET /tasks?student_id=xxx
// Returns all tasks for a student, ordered by deadline ascending
// ----------------------------------------------------------------
router.get('/', async (req, res, next) => {
  try {
    const { student_id } = req.query;

    if (!student_id) {
      return res.status(400).json({ error: 'student_id query param is required' });
    }

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('student_id', student_id)
      .order('deadline', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    return res.json({ tasks });
  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------------------
// DELETE /tasks/:id  (bonus — lets UI remove tasks)
// ----------------------------------------------------------------
router.delete('/:id', async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', req.params.id);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
