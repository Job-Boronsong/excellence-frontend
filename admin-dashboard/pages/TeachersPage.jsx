// src/pages/TeachersPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchTeachers, createTeacher } from '../api/teacherApi';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ full_name: '', email: '', subject: '' });

  // Fetch teachers on mount
  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await fetchTeachers();
        setTeachers(data);
      } catch (err) {
        setError('Failed to fetch teachers.');
      } finally {
        setLoading(false);
      }
    };
    loadTeachers();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle new teacher creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTeacher = await createTeacher(formData);
      setTeachers([...teachers, newTeacher]);
      setFormData({ full_name: '', email: '', subject: '' });
    } catch (err) {
      alert('Failed to add teacher.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Teachers</h1>

      {/* Teacher Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow rounded p-4 space-y-4">
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Teacher
        </button>
      </form>

      {/* Teacher List */}
      {loading ? (
        <p>Loading teachers...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <ul className="space-y-2">
          {teachers.map((teacher) => (
            <li key={teacher.id} className="p-3 bg-gray-100 rounded shadow flex justify-between">
              <div>
                <strong>{teacher.full_name}</strong> <br />
                <span className="text-gray-600">{teacher.email}</span> <br />
                <span className="text-gray-500 italic">{teacher.subject}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
