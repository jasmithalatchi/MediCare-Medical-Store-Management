import api from './api';

export const orderService = {
  // Create new customer order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Get logged-in user's orders
  getMyOrders: async () => {
    const response = await api.get('/orders/myorders');
    return response.data;
  },

  // Admin: Get all orders
  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Admin: Update order status
  updateOrderStatus: async (id, statusData) => {
    const response = await api.put(`/orders/${id}/status`, statusData);
    return response.data;
  },
};

export default orderService;
