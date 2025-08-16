// src/pages/Teachers.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", subject: "" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await api.get("teachers/");
    setTeachers(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addTeacher = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("teachers/", form);
      setForm({ name: "", email: "", subject: "" });
      load();
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this teacher?")) return;
    await api.delete(`teachers/${id}/`);
    setTeachers((t) => t.filter((x) => x.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Teachers</h2>

      <form onSubmit={addTeacher} className="space-y-3 mb-8 bg-white p-4 rounded-xl shadow">
        <input className="w-full border rounded px-3 py-2" name="name" value={form.name} onChange={onChange} placeholder="Name" required />
        <input className="w-full border rounded px-3 py-2" name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" required />
        <input className="w-full border rounded px-3 py-2" name="subject" value={form.subject} onChange={onChange} placeholder="Subject" required />
        <button disabled={busy} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {busy ? "Saving..." : "Add Teacher"}
        </button>
      </form>

      <div className="grid gap-4">
        {teachers.map((t) => (
          <div key={t.id} className="bg-white border p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{t.name || t.full_name}</h3>
              <p className="text-sm text-gray-600">{t.email} • {t.subject}</p>
            </div>
            <button onClick={() => remove(t.id)} className="text-red-600 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
