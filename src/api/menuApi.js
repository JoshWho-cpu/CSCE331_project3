import axios from 'axios';

// Create an axios instance with default settings
const api = axios.create({
  baseURL: 'https://csce331-project3-backend.onrender.com',
  withCredentials: true,
  timeout: 10000,
});

export const getMenuItems = async () => {
  try {
    const response = await api.get('/api/menu');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export default api;