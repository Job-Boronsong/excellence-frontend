// src/pages/Grades.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Grades() {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ student: "", subject: "", score: "" });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/grades/")
      .then(res => setGrades(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/grades/", form)
      .then(res => {
        setGrades([...grades, res.data]);
        setForm({ student: "", subject: "", score: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Grades</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-x-2">
        <input
          type="text"
          placeholder="Student ID"
          value={form.student}
          onChange={(e) => setForm({ ...form, student: e.target.value })}
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
        <input
          type="number"
          placeholder="Score"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2">Add</button>
      </form>

      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(g => (
            <tr key={g.id}>
              <td className="border px-4 py-2">{g.id}</td>
              <td className="border px-4 py-2">{g.student}</td>
              <td className="border px-4 py-2">{g.subject}</td>
              <td className="border px-4 py-2">{g.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grades;
