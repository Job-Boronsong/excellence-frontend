import API from './axios';

export const fetchAttendance = async () => {
  const res = await API.get('attendance/');
  return res.data;
};

export const createAttendance = async (attendanceData) => {
  const res = await API.post('attendance/', attendanceData);
  return res.data;
};

export const updateAttendance = async (id, attendanceData) => {
  const res = await API.put(`attendance/${id}/`, attendanceData);
  return res.data;
};

export const deleteAttendance = async (id) => {
  await API.delete(`attendance/${id}/`);
};
