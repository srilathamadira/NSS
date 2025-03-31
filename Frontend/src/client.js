import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://nss-u5pg.onrender.com/api' , // Default base URL
  timeout: 10000, // Request timeout in milliseconds
  
});


export default axiosClient;
