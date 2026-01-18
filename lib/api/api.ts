import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL

export const apiNext = axios.create({
  baseURL:`${url}/api`,
  withCredentials: true,
});

export const serverApi = axios.create({
  baseURL: 'https://notehub-api.goit.study',
   withCredentials: true,
});