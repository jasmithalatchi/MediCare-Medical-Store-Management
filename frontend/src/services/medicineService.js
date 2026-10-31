import api from './api';

export const medicineService = {
  // Fetch medicines list with optional keyword, category, sort & pagination filters
  getMedicines: async (params = {}) => {
    const response = await api.get('/medicines', { params });
    return response.data;
  },

  // Fetch unique categories available in the store
  getCategories: async () => {
    const response = await api.get('/medicines/categories');
    return response.data;
  },

  // Fetch single medicine detail
  getMedicineById: async (id) => {
    const response = await api.get(`/medicines/${id}`);
    return response.data;
  },

  // Admin: create medicine
  createMedicine: async (data) => {
    const response = await api.post('/medicines', data);
    return response.data;
  },

  // Admin: update medicine
  updateMedicine: async (id, data) => {
    const response = await api.put(`/medicines/${id}`, data);
    return response.data;
  },

  // Admin: delete medicine
  deleteMedicine: async (id) => {
    const response = await api.delete(`/medicines/${id}`);
    return response.data;
  },
};

export default medicineService;
