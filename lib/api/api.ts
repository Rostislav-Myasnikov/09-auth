import axios from 'axios';

export const apiNext = axios.create({
  baseURL:'/api',
  withCredentials: true,
});

export const serverApi = axios.create({
  baseURL: 'https://notehub-api.goit.study',
   withCredentials: true,
});