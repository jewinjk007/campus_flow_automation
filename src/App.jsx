import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Summarize from './pages/Summarize';
import Automations from './pages/Automations';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar appears on every page */}
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/automations" element={<Automations />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;