import { useAsync } from '@/hooks/useAsync';
import { axiosInstance } from '@/utils';
import { useCallback } from 'react';
import { Dashboards } from '@/types/dashboards';

const useGetDashboards = (token: string | null) => {
  const getDashboards = useCallback(
    () =>
      axiosInstance.get(
        `dashboards?navigationMethod=pagination&page=1&size=10000`,
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

  const { execute, loading, error, data } = useAsync(getDashboards, false);

  const totalCount: number = data?.totalCount;
  const dashboards: Dashboards[] = data?.dashboards;
  const totalPage = Math.ceil(totalCount / 5);

  return {
    execute,
    loading,
    error,
    totalCount,
    dashboards,
    totalPage,
  };
};

export default useGetDashboards;
