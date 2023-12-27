import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { useCallback } from 'react';
import { Dashboards } from '@/types/dashboards';

export default function useGetDashBoards() {
  const getDashBoards = useCallback(
    () =>
      axiosAuthInstance.get(
        'dashboards?navigationMethod=pagination&page=1&size=5'
      ),
    []
  );
  const { execute, loading, error, data } = useAsync(getDashBoards, false);

  const totalCount: number = data?.totalCount;
  const dashboards: Dashboards[] = data?.dashboards;

  return {
    execute,
    loading,
    error,
    dashboards,
    totalCount,
  };
}
