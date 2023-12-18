import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-1',
});
