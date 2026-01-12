import axios from 'axios';
import useStorage from '../hooks/useStorage';

const api = axios.create({
  baseURL: 'https://api.kirvano-teste.com',
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const { get } = useStorage()
    const token = get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;