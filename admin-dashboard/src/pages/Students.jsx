// src/pages/Students.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Assumes you created this config as shown earlier

const Students = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', classLevel: '' });

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('students/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('students/', form);
      setStudents([...students, response.data]);
      setForm({ name: '', classLevel: '' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`students/${id}/`);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students Management</h1>

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
          <label className="block text-gray-700">Class Level</label>
          <input
            type="text"
            name="classLevel"
            value={form.classLevel}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Student</button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Class Level</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{student.name}</td>
              <td className="border border-gray-300 px-4 py-2">{student.classLevel}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
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
};

export default Students;
