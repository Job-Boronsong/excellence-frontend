import axios from 'axios';
import { API_BASE_URL } from '../config';

export const submitAttendance = async (attendanceData) => {
  const res = await axios.post(`${API_BASE_URL}/submit-attendance/`, attendanceData);
  return res.data;
};

export const fetchAttendance = async () => {
  const res = await axios.get(`${API_BASE_URL}/attendance/`);
  return res.data;
};
