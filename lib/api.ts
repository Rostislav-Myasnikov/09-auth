import axios from 'axios';

export const apiNext = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

export const serverApi = axios.create({
  baseURL: 'https://notehub-api.goit.study',
   withCredentials: true,
});