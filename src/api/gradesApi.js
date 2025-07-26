import axios from 'axios';
import { API_BASE_URL } from '../config';

export const fetchGrades = async () => {
  const res = await axios.get(`${API_BASE_URL}/grades-list/`);
  return res.data;
};

export const createGrade = async (gradeData) => {
  const res = await axios.post(`${API_BASE_URL}/grades-list/`, gradeData);
  return res.data;
};

export const updateGrade = async (id, gradeData) => {
  const res = await axios.put(`${API_BASE_URL}/grades-list/${id}/`, gradeData);
  return res.data;
};
