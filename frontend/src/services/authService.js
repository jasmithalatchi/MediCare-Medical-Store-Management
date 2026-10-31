import api from './api';

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data?.data) {
      localStorage.setItem('medicare_user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data?.data) {
      localStorage.setItem('medicare_user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('medicare_user');
  },
};

export default authService;
