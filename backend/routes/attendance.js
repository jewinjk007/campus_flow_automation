const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET /attendance?student_id=xxx
// Returns attendance records for the student.
router.get('/', async (req, res, next) => {
  try {
    const { student_id } = req.query;
    if (!student_id) {
      return res.status(400).json({ error: 'student_id query param is required' });
    }

    const { data, error } = await supabase
      .from('attendance_records')
      .select('*')
      .eq('student_id', student_id)
      .order('subject', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ attendance: data || [] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
