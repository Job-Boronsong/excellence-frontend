// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">🎓 Excellence & Development School</h1>
      <h2 className="text-2xl mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
        <Link
          to="/students"
          className="bg-blue-500 text-white py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Manage Students
        </Link>

        <Link
          to="/teachers"
          className="bg-green-500 text-white py-4 px-6 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Manage Teachers
        </Link>

        <Link
          to="/grades"
          className="bg-purple-500 text-white py-4 px-6 rounded-lg shadow-md hover:bg-purple-600 transition"
        >
          Manage Grades
        </Link>

        <Link
          to="/attendance"
          className="bg-orange-500 text-white py-4 px-6 rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Track Attendance
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
