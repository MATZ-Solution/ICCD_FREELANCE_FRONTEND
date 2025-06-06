
import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com/',
  baseURL: 'http://localhost:2300/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // optional timeout
});

// Optional: Add interceptors for auth, logging, errors
api.interceptors.request.use(
  (config) => {
    // For example, attach auth token here
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global error logging here
    return Promise.reject(error);
  }
);

export default api;
