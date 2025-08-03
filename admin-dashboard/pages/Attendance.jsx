// src/pages/Attendance.jsx
import React, { useState, useEffect } from "react";
import API from "../services/api";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ student: "", date: "", status: "Present" });

  const fetchAttendance = async () => {
    try {
      const res = await API.get("attendance/");
      setRecords(res.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("attendance/", form);
      fetchAttendance();
      setForm({ student: "", date: "", status: "Present" });
    } catch (error) {
      console.error("Error adding attendance:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow rounded p-4">
        <div className="mb-4">
          <label className="block text-gray-700">Student</label>
          <input
            type="text"
            name="student"
            value={form.student}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Add Record
        </button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Student</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, index) => (
            <tr key={rec.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{rec.student}</td>
              <td className="border border-gray-300 px-4 py-2">{rec.date}</td>
              <td className="border border-gray-300 px-4 py-2">{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
