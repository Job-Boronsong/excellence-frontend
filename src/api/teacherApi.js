import axios from 'axios';
import { API_BASE_URL } from '../config';

export const fetchTeachers = async () => {
  const response = await axios.get(`${API_BASE_URL}/teachers/`);
  return response.data;
};

export const createTeacher = async (teacherData) => {
  const response = await axios.post(`${API_BASE_URL}/teachers/`, teacherData);
  return response.data;
};

export const updateTeacher = async (id, teacherData) => {
  const response = await axios.put(`${API_BASE_URL}/teachers/${id}/`, teacherData);
  return response.data;
};

export const deleteTeacher = async (id) => {
  await axios.delete(`${API_BASE_URL}/teachers/${id}/`);
};
