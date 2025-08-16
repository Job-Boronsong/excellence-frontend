// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [grades, setGrades] = useState([]);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [s, t, a, g] = await Promise.all([
          api.get("students/"),
          api.get("teachers/"),
          api.get("attendance/"),
          api.get("grades/"),
        ]);
        setStudents(s.data?.length || 0);
        setTeachers(t.data?.length || 0);
        setAttendance(a.data?.length || 0);
        setGrades(g.data || []);
      } catch (e) {
        // If unauthorized, go to login
        if (e?.response?.status === 401) logout();
      }
    };
    load();
  }, []);

  const avg =
    grades.length > 0
      ? (
          grades.reduce((acc, x) => acc + Number(x.score || 0), 0) / grades.length
        ).toFixed(2)
      : "N/A";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button onClick={logout} className="text-sm text-red-600 hover:underline">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Students" value={students} accent="text-blue-600" />
        <Card title="Teachers" value={teachers} accent="text-green-600" />
        <Card title="Attendance Records" value={attendance} accent="text-purple-600" />
        <Card title="Average Grade" value={avg} accent="text-red-600" />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">Quick Links</h3>
          <ul className="space-y-2 text-blue-600">
            <li><Link to="/students">Manage Students</Link></li>
            <li><Link to="/teachers">Manage Teachers</Link></li>
            <li><Link to="/attendance">View Attendance</Link></li>
            <li><Link to="/grades">Check Grades</Link></li>
          </ul>
        </div>

        <div className="bg-white p-4 shadow rounded-xl md:col-span-2">
          <h3 className="font-semibold text-gray-700 mb-4">Welcome Back</h3>
          <p className="text-gray-600">
            Monitor student & teacher records, attendance summaries, and academic performance.
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, accent }) {
  return (
    <div className="bg-white p-4 shadow rounded-xl text-center">
      <h2 className="text-lg text-gray-600">{title}</h2>
      <p className={`text-2xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}
