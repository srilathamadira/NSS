import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8081/api' , // Default base URL
  timeout: 10000, // Request timeout in milliseconds
  
});


export default axiosClient;
