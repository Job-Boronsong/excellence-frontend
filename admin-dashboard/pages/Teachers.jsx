// src/pages/Teachers.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchTeachers,
  createTeacher,
  deleteTeacher,
} from '../api/teachersApi';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', subject: '' });

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    const data = await fetchTeachers();
    setTeachers(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTeacher(form);
    setForm({ name: '', email: '', subject: '' });
    loadTeachers();
  };

  const handleDelete = async (id) => {
    await deleteTeacher(id);
    loadTeachers();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Teachers</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-white shadow p-4 rounded">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="border p-2 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Teacher
        </button>
      </form>

      <div className="grid gap-4">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{teacher.name}</h3>
              <p className="text-sm text-gray-600">{teacher.email} • {teacher.subject}</p>
            </div>
            <button
              onClick={() => handleDelete(teacher.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
