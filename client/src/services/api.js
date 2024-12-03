import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

const api = {
  addAddress: (address) => axios.post(`${API_URL}/api/addresses`, address),
  getAddresses: () => axios.get(`${API_URL}/api/addresses`),
  optimizeRoute: (addresses) => axios.post(`${API_URL}/api/optimize`, { addresses }),
  updateAddress: (id, data) => axios.put(`${API_URL}/api/addresses/${id}`, data),
};

export default api;
