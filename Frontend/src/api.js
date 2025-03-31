// api.js
import axios from 'axios';

// Replace with your actual API URL
const API_URL = 'http://localhost:5000'; // or your deployed URL

export const login = async (formData) => {
  return await axios.post(`${API_URL}/login`, formData);
};

export const register = async (formData) => {
  return await axios.post(`${API_URL}/register`, formData);
};

export const submitHelpRequest = async (formDataWithImage) => {
  return await axios.post(`${API_URL}/api/user/requests`, formDataWithImage, {
    headers: {
      'Content-Type': 'multipart/form-data',  // Required for file uploads
    },
  });
};

