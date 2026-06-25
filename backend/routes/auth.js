const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const supabase = require('../config/supabase');

const verifyPassword = (password, storedHash) => {
  if (!storedHash) return false;
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(derivedKey, 'hex'));
};

// GET /auth?email=xxx
// Returns a student record by email. This is a minimal lookup.
router.get('/', async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'email query param is required' });
    }

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const student = { ...data };
    delete student.password_hash;

    return res.json({ student });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
// Body: { email, password }
// Verifies credentials and returns the student record.
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!verifyPassword(password, data.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const student = { ...data };
    delete student.password_hash;

    return res.json({ student });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
