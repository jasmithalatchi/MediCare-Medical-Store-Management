import axios from 'axios';

/**
 * Resolve base URL for REST API
 * In production with unified hosting, use relative '/api' on the same public domain.
 * Strips obsolete localhost and Render URLs in production so cloud deployments connect reliably.
 */
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  // In production builds, default to relative '/api' unless a valid external custom domain is explicitly given
  if (import.meta.env.PROD) {
    if (
      !envUrl ||
      envUrl.includes('localhost') ||
      envUrl.includes('127.0.0.1') ||
      envUrl.includes('onrender.com') ||
      envUrl === '/api'
    ) {
      return '/api';
    }
  }

  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    let clean = envUrl.trim().replace(/\/+$/, '');
    if (!clean.endsWith('/api')) {
      clean = `${clean}/api`;
    }
    return clean;
  }

  // Fallback: relative '/api' in production, localhost in development
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
