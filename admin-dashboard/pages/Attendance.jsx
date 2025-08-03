// src/pages/Attendance.jsx
import React, { useEffect, useState } from 'react';
import {
  fetchAttendance,
  createAttendance,
  deleteAttendance,
} from '../api/attendanceApi';

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ student: '', date: '', status: 'Present' });

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const data = await fetchAttendance();
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAttendance(form);
      setForm({ student: '', date: '', status: 'Present' });
      loadAttendance();
    } catch (error) {
      console.error('Error creating attendance record:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await deleteAttendance(id);
      loadAttendance();
    } catch (error) {
      console.error('Error deleting attendance record:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow rounded p-4">
        <input
          type="text"
          name="student"
          value={form.student}
          onChange={handleChange}
          placeholder="Student"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Add Record
        </button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, index) => (
            <tr key={rec.id || index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{rec.student}</td>
              <td className="border px-4 py-2">{rec.date}</td>
              <td className="border px-4 py-2">{rec.status}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  type="button"
                  onClick={() => handleDelete(rec.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
