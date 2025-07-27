import React, { useEffect, useState } from 'react';
import { fetchTeachers, createTeacher } from '../api/teacherApi';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers().then(setTeachers);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Teachers</h1>
      <ul className="space-y-2">
        {teachers.map((teacher) => (
          <li key={teacher.id} className="p-2 bg-gray-100 rounded">
            {teacher.full_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
