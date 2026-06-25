const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');

const normalizeEnv = (value) => {
  if (!value) return value;
  return value.replace(/^"|"$/g, '');
};

const supabaseUrl = normalizeEnv(process.env.SUPABASE_URL);
const supabaseKey = normalizeEnv(process.env.SUPABASE_KEY);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY are required in backend/.env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
