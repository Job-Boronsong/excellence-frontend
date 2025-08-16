// src/pages/Students.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "" });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/students/")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/students/", form)
      .then(res => {
        setStudents([...students, res.data]);
        setForm({ name: "", age: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Students</h1>

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
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Add</button>
      </form>

      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td className="border px-4 py-2">{s.id}</td>
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
