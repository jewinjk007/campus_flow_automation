-- ============================================================
-- CampusFlow — Supabase Schema
-- Run this in Supabase → SQL Editor → New Query → Run
-- ============================================================

-- Students table
create table if not exists students (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  branch       text not null,
  year         int  not null check (year between 1 and 4),
  phone        text not null,   -- WhatsApp number e.g. +919876543210
  email        text not null,   -- used for Google Calendar invite
  created_at   timestamptz default now()
);

-- Tasks table
create table if not exists tasks (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid references students(id) on delete cascade,
  title           text not null,
  subject         text not null,
  deadline        timestamptz not null,
  reminder_time   timestamptz,              -- auto-set to deadline - 24h
  add_to_calendar boolean default true,
  study_plan      jsonb,                    -- day-by-day JSON from Groq
  created_at      timestamptz default now()
);

-- Index for fast task lookups per student
create index if not exists tasks_student_id_idx on tasks(student_id);
