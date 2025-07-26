// src/pages/Teachers.jsx
import React, { useState } from 'react';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: '', subject: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeachers([...teachers, form]);
    setForm({ name: '', subject: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teachers Management</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow rounded p-4">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Teacher</button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Subject</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.name}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
