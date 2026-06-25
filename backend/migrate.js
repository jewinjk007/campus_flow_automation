require('dotenv').config();
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const normalizeEnv = (value) => {
  if (!value) return value;
  return value.replace(/^"|"$/g, '');
};

const supabaseUrl = normalizeEnv(process.env.SUPABASE_URL);
const supabaseKey = normalizeEnv(process.env.SUPABASE_KEY);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY in backend/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const migrationSql = [
  '-- Add password hash column for student login',
  'alter table students add column if not exists password_hash text not null default \'\';',
  '',
  '-- Create attendance_records table if it does not exist',
  'create table if not exists attendance_records (',
  '  id           uuid primary key default gen_random_uuid(),',
  '  student_id   uuid references students(id) on delete cascade,',
  '  subject      text not null,',
  '  current      int not null check (current >= 0 and current <= 100),',
  '  required     int not null check (required >= 0 and required <= 100),',
  '  updated_at   timestamptz default now()',
  ');',
  'create index if not exists attendance_records_student_id_idx on attendance_records(student_id);',
].join('\n');

const main = async () => {
  console.log('Checking Supabase schema...');

  const checkStudents = await supabase
    .from('students')
    .select('id')
    .limit(1);

  if (checkStudents.error) {
    console.error('Could not confirm students table exists:', checkStudents.error.message);
    process.exit(1);
  }

  const checkPasswordColumn = await supabase
    .from('students')
    .select('password_hash')
    .limit(1);

  if (checkPasswordColumn.error) {
    console.warn('Missing column detected:', checkPasswordColumn.error.message);
    console.log('\nRun the following SQL in Supabase SQL Editor to fix the schema:\n');
    console.log(migrationSql);
    process.exit(1);
  }

  console.log('Password column exists. Schema looks good.');
};

main().catch((err) => {
  console.error('Schema check failed:', err.message || err);
  process.exit(1);
});
