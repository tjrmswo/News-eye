import axios from 'axios';
import config from '@/config';

// client에서 요청하는 api
const NewsApiClient = axios.create({
  baseURL: config.NEWS_API_URL, // localhost
  timeout: 5000,
});

// Server에서 요청하는 api
const NewsApiServer = axios.create({
  baseURL: config.NEWS_API_SERVER_URL, //newsapi 주소
  timeout: 5000,
});

export { NewsApiClient, NewsApiServer };
