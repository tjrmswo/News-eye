import config from '@/config';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: config.API_URL,
  timeout: 5000,
});

export default apiClient;
