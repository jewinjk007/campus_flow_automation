import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();
const STORAGE_KEY = 'campusflow_student';

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (student) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [student]);

  const login = (studentData) => setStudent(studentData);
  const logout = () => setStudent(null);

  const value = useMemo(
    () => ({ student, login, logout, isAuthenticated: !!student }),
    [student]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
