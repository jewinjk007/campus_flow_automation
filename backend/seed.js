require('dotenv').config();

const crypto = require('crypto');
const supabase = require('./config/supabase');

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
};

const students = [
  {
    name: 'Priya Sharma',
    branch: 'Computer Science',
    year: 2,
    phone: '+919876543210',
    email: 'priya.sharma@college.edu',
    password: 'CampusFlow123',
  },
  {
    name: 'Arjun Patel',
    branch: 'Electrical Engineering',
    year: 3,
    phone: '+918765432101',
    email: 'arjun.patel@college.edu',
    password: 'CampusFlow123',
  },
];

const tasks = [
  {
    title: 'DBMS Assignment 3',
    subject: 'Database Systems',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    add_to_calendar: true,
  },
  {
    title: 'OS Lab Report',
    subject: 'Operating Systems',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    add_to_calendar: false,
  },
  {
    title: 'Maths III Quiz Preparation',
    subject: 'Mathematics III',
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    add_to_calendar: true,
  },
];

const attendanceRecords = [
  { subject: 'Operating Systems', current: 70, required: 75 },
  { subject: 'Mathematics III', current: 68, required: 75 },
  { subject: 'Database Systems', current: 78, required: 75 },
];

const insertData = async () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_KEY in environment.');
    process.exit(1);
  }

  for (const student of students) {
    const { data: existingStudent, error: lookupError } = await supabase
      .from('students')
      .select('*')
      .eq('email', student.email)
      .single();

    if (lookupError && lookupError.code !== 'PGRST116') {
      console.error('Student lookup failed:', lookupError);
      process.exit(1);
    }

    const studentId = existingStudent ? existingStudent.id : null;
    let createdStudent = existingStudent;

    if (!studentId) {
      const password_hash = hashPassword(student.password);
      const { data, error } = await supabase
        .from('students')
        .insert([
          {
            name: student.name,
            branch: student.branch,
            year: student.year,
            phone: student.phone,
            email: student.email,
            password_hash,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Student insert failed:', error);
        process.exit(1);
      }

      createdStudent = data;
      console.log(`Created student ${createdStudent.email} (${createdStudent.id})`);
    } else {
      console.log(`Student already exists: ${existingStudent.email} (${existingStudent.id})`);
    }

    const studentTasks = tasks.map((task) => ({
      student_id: createdStudent.id,
      title: task.title,
      subject: task.subject,
      deadline: task.deadline,
      add_to_calendar: task.add_to_calendar,
    }));

    const { data: createdTasks, error: tasksError } = await supabase
      .from('tasks')
      .insert(studentTasks)
      .select();

    if (tasksError) {
      console.error('Task insert failed:', tasksError);
      process.exit(1);
    }

    console.log(`Inserted ${createdTasks.length} tasks for ${createdStudent.email}`);

    const studentAttendance = attendanceRecords.map((record) => ({
      student_id: createdStudent.id,
      subject: record.subject,
      current: record.current,
      required: record.required,
    }));

    const { data: createdAttendance, error: attendanceError } = await supabase
      .from('attendance_records')
      .insert(studentAttendance)
      .select();

    if (attendanceError) {
      console.error('Attendance insert failed:', attendanceError);
      process.exit(1);
    }

    console.log(`Inserted ${createdAttendance.length} attendance records for ${createdStudent.email}`);
  }

  console.log('Seed complete.');
  process.exit(0);
};

insertData();
