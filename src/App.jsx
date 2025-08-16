import { Routes, Route } from "react-router-dom";

// ✅ Correct imports
import Login from "./pages/Login.jsx";
import Teachers from "./pages/Teachers.jsx";
import Students from "./pages/Students.jsx";
import Grades from "./pages/Grades.jsx";
import Attendance from "./pages/Attendance.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/students" element={<Students />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
