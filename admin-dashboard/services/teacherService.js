// teacherService.js
const API_BASE_URL = "http://localhost:8000/api/teachers/";

export const fetchTeachers = async () => {
  const response = await fetch(API_BASE_URL);
  return response.json();
};

export const createTeacher = async (teacher) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacher),
  });
  return response.json();
};

export const updateTeacher = async (id, teacher) => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacher),
  });
  return response.json();
};

export const deleteTeacher = async (id) => {
  await fetch(`${API_BASE_URL}${id}/`, { method: "DELETE" });
};
