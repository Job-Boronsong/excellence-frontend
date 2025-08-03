import API from './axios';

// Fetch all students
export const fetchStudents = async () => {
  const res = await API.get('students/');
  return res.data;
};

// Create a student
export const createStudent = async (studentData) => {
  const res = await API.post('students/', studentData);
  return res.data;
};

// Update a student
export const updateStudent = async (id, studentData) => {
  const res = await API.put(`students/${id}/`, studentData);
  return res.data;
};

// Delete a student
export const deleteStudent = async (id) => {
  await API.delete(`students/${id}/`);
};
