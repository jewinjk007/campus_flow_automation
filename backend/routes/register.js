const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const supabase = require('../config/supabase');

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
};

// ----------------------------------------------------------------
// POST /register
// Body: { name, branch, year, phone, email, password }
// Saves a new student to Supabase and returns the created record.
// ----------------------------------------------------------------
router.post('/', async (req, res, next) => {
  try {
    const { name, branch, year, phone, email, password } = req.body;

    // --- Basic validation ---
    if (!name || !branch || !year || !phone || !email || !password) {
      return res.status(400).json({
        error: 'All fields are required: name, branch, year, phone, email, password',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    if (isNaN(year) || year < 1 || year > 4) {
      return res.status(400).json({ error: 'year must be between 1 and 4' });
    }

    // Phone must start with + for Twilio WhatsApp (e.g. +919876543210)
    if (!phone.startsWith('+')) {
      return res.status(400).json({
        error: 'phone must include country code, e.g. +919876543210',
      });
    }

    const password_hash = hashPassword(password);

    // --- Insert into Supabase ---
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          name:          name.trim(),
          branch:        branch.trim(),
          year:          parseInt(year),
          phone:         phone.trim(),
          email:         email.trim().toLowerCase(),
          password_hash,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Insert student error:', error.message);
      return res.status(500).json({ error: error.message });
    }

    const student = { ...data };
    delete student.password_hash;

    console.log(`[/register] Student created: ${data.id} — ${data.name}`);
    return res.status(201).json({ student });

  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------------------
// GET /register/:id  (bonus — lets frontend pre-fill dashboard)
// ----------------------------------------------------------------
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.json({ student: data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
