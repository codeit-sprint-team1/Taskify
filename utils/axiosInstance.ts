import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
});

export const axiosAuthInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
  headers: {
    'Content-Type': 'application/json',
  },
});
