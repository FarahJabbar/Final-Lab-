import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/', // Updated to use the new backend port
});

export default axiosInstance;
