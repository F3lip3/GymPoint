import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  validateStatus: status => status < 500
});

export default api;
