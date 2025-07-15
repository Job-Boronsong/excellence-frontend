import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',  // update if you use a different host/port
});

export default API;
