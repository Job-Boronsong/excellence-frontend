// src/pages/Teachers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
  });

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('/api/teachers/');
      setTeachers(res.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teachers/', formData);
      fetchTeachers();
      setFormData({ name: '', email: '', subject: '' });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await axios.delete(`/api/teachers/${id}/`);
        fetchTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Teachers</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          className="form-input border p-2 w-full rounded"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="form-input border p-2 w-full rounded"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="form-input border p-2 w-full rounded"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Teacher
        </button>
      </form>

      <div className="grid gap-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="border p-4 rounded shadow flex justify-between items-center">
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
};

export default Teachers;
