import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor to add JWT token to Authorization header
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

// Auth API calls
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);

// Health profile
export const getHealthProfile = () => api.get('/api/health-profile');
export const createOrUpdateHealthProfile = (data) =>
    api.post('/api/health-profile', data);

// Diet planner
export const createMenu = () => api.post('/api/diet/create-menu');
export const getProtein = () => api.get('/api/diet/create-menu/protein');
export const setProtein = (data) => api.post('/api/diet/create-menu/protein', data);
export const getFat = () => api.get('/api/diet/create-menu/fat');
export const setFat = (data) => api.post('/api/diet/create-menu/fat', data);
export const getCarbohydrate = () => api.get('/api/diet/create-menu/carbohydrate');
export const setCarbohydrate = (data) =>
    api.post('/api/diet/create-menu/carbohydrate', data);

// Food Wiki
export const getFoodWiki = () => api.get('/api/food/show');

// Utility
export const getUserInfo = (username) => api.get(`/api/util/user-info/${username}`);
