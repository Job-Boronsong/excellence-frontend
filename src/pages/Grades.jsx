// src/pages/Grades.jsx
import React, { useState } from 'react';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ student: '', subject: '', score: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGrades([...grades, form]);
    setForm({ student: '', subject: '', score: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Grades Management</h1>
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
          <label className="block text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Score</label>
          <input
            type="number"
            name="score"
            value={form.score}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Add Grade</button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Student</th>
            <th className="border border-gray-300 px-4 py-2">Subject</th>
            <th className="border border-gray-300 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{grade.student}</td>
              <td className="border border-gray-300 px-4 py-2">{grade.subject}</td>
              <td className="border border-gray-300 px-4 py-2">{grade.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Grades;
