// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../api/studentsApi';
import { fetchTeachers } from '../api/teachersApi';
import { fetchAttendance } from '../api/attendanceApi';
import { fetchGrades } from '../api/gradesApi';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetchStudents().then(setStudents);
    fetchTeachers().then(setTeachers);
    fetchAttendance().then(setAttendance);
    fetchGrades().then(setGrades);
  }, []);

  const averageGrade =
    grades.length > 0
      ? (
          grades.reduce((acc, g) => acc + parseFloat(g.score), 0) / grades.length
        ).toFixed(2)
      : 'N/A';

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Students" value={students.length} color="text-blue-600" />
        <Card title="Teachers" value={teachers.length} color="text-green-600" />
        <Card
          title="Attendance Records"
          value={attendance.length}
          color="text-purple-600"
        />
        <Card
          title="Average Grade"
          value={averageGrade}
          color="text-red-600"
        />
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white p-4 shadow rounded-xl text-center">
      <h2 className="text-lg text-gray-600">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
