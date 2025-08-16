// src/pages/Attendance.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ student: "", date: "", status: "Present" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await api.get("attendance/");
    setRecords(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const add = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("attendance/", form);
      setForm({ student: "", date: "", status: "Present" });
      load();
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this record?")) return;
    await api.delete(`attendance/${id}/`);
    setRecords((r) => r.filter((x) => x.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>

      <form onSubmit={add} className="mb-6 bg-white shadow rounded p-4 space-y-3">
        <input className="w-full border rounded px-3 py-2" name="student" value={form.student} onChange={onChange} placeholder="Student" required />
        <input className="w-full border rounded px-3 py-2" name="date" type="date" value={form.date} onChange={onChange} required />
        <select className="w-full border rounded px-3 py-2" name="status" value={form.status} onChange={onChange}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button disabled={busy} className="bg-red-600 text-white px-4 py-2 rounded">
          {busy ? "Saving..." : "Add Record"}
        </button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
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
          {records.map((r, i) => (
            <tr key={r.id || i} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{r.student?.full_name || r.student}</td>
              <td className="border px-4 py-2">{r.date}</td>
              <td className="border px-4 py-2">{r.status}</td>
              <td className="border px-4 py-2 text-center">
                {r.id && (
                  <button onClick={() => remove(r.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
