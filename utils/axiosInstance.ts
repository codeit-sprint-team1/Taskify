import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
});

export const axiosAuthInstance = (options: any) => {
  const instance = axios.create({
    baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.log('interceptor>error', error);
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log('interceptor>error', error);
      return Promise.reject(error);
    }
  );
  instance.defaults.timeout = 2500;
  return instance;
};
