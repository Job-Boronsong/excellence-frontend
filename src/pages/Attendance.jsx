// src/pages/Attendance.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ student: "", date: "", status: "Present" });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/attendance/")
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/attendance/", form)
      .then(res => {
        setRecords([...records, res.data]);
        setForm({ student: "", date: "", status: "Present" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Attendance</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-x-2">
        <input
          type="text"
          placeholder="Student ID"
          value={form.student}
          onChange={(e) => setForm({ ...form, student: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2"
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2"
        >
          <option>Present</option>
          <option>Absent</option>
        </select>
        <button type="submit" className="bg-red-600 text-white px-4 py-2">Mark</button>
      </form>

      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td className="border px-4 py-2">{r.id}</td>
              <td className="border px-4 py-2">{r.student}</td>
              <td className="border px-4 py-2">{r.date}</td>
              <td className="border px-4 py-2">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
