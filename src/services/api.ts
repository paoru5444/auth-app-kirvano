// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.kirvano-teste.com',
  timeout: 10000,
});

export default api;