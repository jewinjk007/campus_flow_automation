import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Summarize from './pages/Summarize';
import Automations from './pages/Automations';

function App() {
  // Dark mode state lives here so the whole page can react to it
  const [dark, setDark] = useState(false);

  return (
    <BrowserRouter>
      {/* This wrapper div controls the background of the entire page */}
      <div style={{
        minHeight: '100vh',
        backgroundColor: dark ? '#111827' : '#f9fafb',
        color: dark ? '#f3f4f6' : '#111827',
        transition: 'background-color 0.3s ease',
      }}>
        <Navbar dark={dark} setDark={setDark} />
        <Routes>
          <Route path="/register" element={<Register dark={dark} />} />
          <Route path="/dashboard" element={<Dashboard dark={dark} />} />
          <Route path="/tasks" element={<Tasks dark={dark} />} />
          <Route path="/summarize" element={<Summarize dark={dark} />} />
          <Route path="/automations" element={<Automations dark={dark} />} />
          <Route path="/" element={<Dashboard dark={dark} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;