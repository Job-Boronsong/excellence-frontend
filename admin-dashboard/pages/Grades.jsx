// src/pages/Grades.jsx
import React, { useEffect, useState } from 'react';
import { fetchGrades, createGrade, deleteGrade } from '../api/gradesApi';

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ student: '', subject: '', score: '' });

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    const data = await fetchGrades();
    setGrades(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGrade(form);
    setForm({ student: '', subject: '', score: '' });
    loadGrades();
  };

  const handleDelete = async (id) => {
    await deleteGrade(id);
    loadGrades();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Grades Management</h1>

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
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <input
          type="number"
          name="score"
          value={form.score}
          onChange={handleChange}
          placeholder="Score"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
          Add Grade
        </button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Score</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={grade.id || index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{grade.student}</td>
              <td className="border px-4 py-2">{grade.subject}</td>
              <td className="border px-4 py-2">{grade.score}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(grade.id)}
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
