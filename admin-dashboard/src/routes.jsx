import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Grades from './pages/Grades';
import Attendance from './pages/Attendance';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/students" element={<Students />} />
    <Route path="/teachers" element={<Teachers />} />
    <Route path="/grades" element={<Grades />} />
    <Route path="/attendance" element={<Attendance />} />
  </Routes>
);

export default AppRoutes;
