// src/pages/Grades.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ student: "", subject: "", score: "" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await api.get("grades/");
    setGrades(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const add = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("grades/", { ...form, score: Number(form.score) });
      setForm({ student: "", subject: "", score: "" });
      load();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Grades Management</h1>

      <form onSubmit={add} className="mb-6 bg-white shadow rounded p-4 space-y-3">
        <input className="w-full border rounded px-3 py-2" name="student" value={form.student} onChange={onChange} placeholder="Student" required />
        <input className="w-full border rounded px-3 py-2" name="subject" value={form.subject} onChange={onChange} placeholder="Subject" required />
        <input className="w-full border rounded px-3 py-2" name="score" type="number" value={form.score} onChange={onChange} placeholder="Score" required />
        <button disabled={busy} className="bg-purple-600 text-white px-4 py-2 rounded">
          {busy ? "Saving..." : "Add Grade"}
        </button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g, i) => (
            <tr key={g.id || i} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{g.student?.full_name || g.student || "-"}</td>
              <td className="border px-4 py-2">{g.subject?.name || g.subject}</td>
              <td className="border px-4 py-2">{g.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
