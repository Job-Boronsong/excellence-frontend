import { useEffect, useState } from 'react';
import { fetchTeachers } from '../services/teacherService';
import TeacherCard from '../components/TeacherCard';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers().then(setTeachers);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Teachers</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((t) => (
          <TeacherCard key={t.id} teacher={t} />
        ))}
      </div>
    </div>
  );
};

export default Teachers;
