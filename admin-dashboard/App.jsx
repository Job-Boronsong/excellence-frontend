import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Students from './pages/Students';
import Teachers from './src/pages/Teachers';
import Grades from './pages/Grades';
import Attendance from './pages/Attendance';
import Dashboard from '../src/pages/Dashboard';
import Register from '../src/pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/teachers" element={<Teachers />} />
      </Routes>
    </Router>
    
  );
}

export default App;
