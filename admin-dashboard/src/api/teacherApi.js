import API from './axios';

export const fetchTeachers = async () => {
  const res = await API.get('teachers/');
  return res.data;
};

export const createTeacher = async (teacherData) => {
  const res = await API.post('teachers/', teacherData);
  return res.data;
};

export const updateTeacher = async (id, teacherData) => {
  const res = await API.put(`teachers/${id}/`, teacherData);
  return res.data;
};

export const deleteTeacher = async (id) => {
  await API.delete(`teachers/${id}/`);
};
