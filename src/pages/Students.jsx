// src/pages/Students.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", classLevel: "" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await api.get("students/");
    setStudents(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addStudent = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await api.post("students/", form);
      setStudents((s) => [...s, data]);
      setForm({ name: "", classLevel: "" });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this student?")) return;
    await api.delete(`students/${id}/`);
    setStudents((s) => s.filter((x) => x.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students Management</h1>

      <form onSubmit={addStudent} className="mb-6 bg-white shadow rounded p-4 space-y-3">
        <input className="w-full border rounded px-3 py-2" name="name" value={form.name} onChange={onChange} placeholder="Name" required />
        <input className="w-full border rounded px-3 py-2" name="classLevel" value={form.classLevel} onChange={onChange} placeholder="Class Level" required />
        <button disabled={busy} className="bg-blue-600 text-white px-4 py-2 rounded">
          {busy ? "Saving..." : "Add Student"}
        </button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Class Level</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.classLevel}</td>
              <td className="border px-4 py-2 text-center">
                <button onClick={() => remove(s.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
