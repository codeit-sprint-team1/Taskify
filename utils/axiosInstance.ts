import axios from 'axios';

function getLocalItem() {
  if (typeof window !== 'undefined') return localStorage.getItem('accessToken');
}

const token = getLocalItem();

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
});

export const axiosAuthInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
