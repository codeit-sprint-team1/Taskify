import { axiosInstance } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { useAsync } from './useAsync';

const useGetToken = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, []);

  const getDashboards = useCallback(
    () =>
      axiosInstance.get(
        `dashboards?navigationMethod=infiniteScroll&page=1&size=100`,
        {
          baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    [token]
  );

  const { execute, loading, error, data, status } = useAsync(
    getDashboards,
    true
  );

  return { execute, loading, error, data, status };
};

export default useGetToken;
