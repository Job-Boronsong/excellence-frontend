// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, attendanceRes, gradesRes] = await Promise.all([
          API.get("students/"),
          API.get("teachers/"),
          API.get("attendance/"),
          API.get("grades/")
        ]);

        setStudents(studentsRes.data);
        setTeachers(teachersRes.data);
        setAttendance(attendanceRes.data);
        setGrades(gradesRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const averageGrade =
    grades.length > 0
      ? (grades.reduce((acc, g) => acc + parseFloat(g.score), 0) / grades.length).toFixed(2)
      : "N/A";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <h2 className="text-lg text-gray-600">Students</h2>
          <p className="text-2xl font-bold text-blue-600">{students.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <h2 className="text-lg text-gray-600">Teachers</h2>
          <p className="text-2xl font-bold text-green-600">{teachers.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <h2 className="text-lg text-gray-600">Attendance Records</h2>
          <p className="text-2xl font-bold text-purple-600">{attendance.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <h2 className="text-lg text-gray-600">Average Grade</h2>
          <p className="text-2xl font-bold text-red-600">{averageGrade}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">Quick Links</h3>
          <ul className="space-y-2 text-blue-500">
            <li><a href="/students">Manage Students</a></li>
            <li><a href="/teachers">Manage Teachers</a></li>
            <li><a href="/attendance">View Attendance</a></li>
            <li><a href="/grades">Check Grades</a></li>
          </ul>
        </div>

        <div className="bg-white p-4 shadow rounded-xl md:col-span-2">
          <h3 className="font-semibold text-gray-700 mb-4">Welcome Back</h3>
          <p className="text-gray-600">
            This is your school admin dashboard. You can monitor student and teacher records,
            attendance summaries, and academic performance from this portal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
