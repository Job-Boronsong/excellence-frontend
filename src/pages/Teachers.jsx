// src/pages/Teachers.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", subject: "" });

  // Fetch teachers on load
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/teachers/")
      .then(res => setTeachers(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/teachers/", form)
      .then(res => {
        setTeachers([...teachers, res.data]);
        setForm({ name: "", subject: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Teachers</h1>

      {/* Add Teacher Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add</button>
      </form>

      {/* Teachers List */}
      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Subject</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(t => (
            <tr key={t.id}>
              <td className="border px-4 py-2">{t.id}</td>
              <td className="border px-4 py-2">{t.name}</td>
              <td className="border px-4 py-2">{t.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teachers;
