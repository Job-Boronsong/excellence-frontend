import API from './axios';

export const fetchGrades = async () => {
  const res = await API.get('grades/');
  return res.data;
};

export const createGrade = async (gradeData) => {
  const res = await API.post('grades/', gradeData);
  return res.data;
};

export const updateGrade = async (id, gradeData) => {
  const res = await API.put(`grades/${id}/`, gradeData);
  return res.data;
};

export const deleteGrade = async (id) => {
  await API.delete(`grades/${id}/`);
};
