import axios from 'axios';

/**
 * Resolve base URL for REST API
 * Handles both local development and production environments,
 * ensuring trailing slashes and the '/api' prefix are consistently formatted.
 */
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    let clean = envUrl.trim().replace(/\/+$/, '');
    if (!clean.endsWith('/api')) {
      clean = `${clean}/api`;
    }
    return clean;
  }
  // In production with unified hosting, use relative '/api'
  // In local development, default to Express server on port 5000
  return import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';
};

/**
 * Pre-configured Axios instance for MediCare REST API
 */
const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT auth token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('medicare_user');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
