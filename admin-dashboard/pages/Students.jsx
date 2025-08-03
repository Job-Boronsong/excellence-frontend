// src/pages/Students.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchStudents,
  createStudent,
  deleteStudent,
} from '../api/studentsApi';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', classLevel: '' });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await fetchStudents();
    setStudents(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createStudent(form);
    setForm({ name: '', classLevel: '' });
    loadStudents();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students Management</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow rounded p-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <input
          type="text"
          name="classLevel"
          value={form.classLevel}
          onChange={handleChange}
          placeholder="Class Level"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Student
        </button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Class Level</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.classLevel}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(student.id)}
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
