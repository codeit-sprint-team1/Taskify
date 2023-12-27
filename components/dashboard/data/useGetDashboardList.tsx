import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';
import { useCallback } from 'react';
import { Dashboards } from '@/types/dashboards';

export default function useGetDashboardList() {
  const getDashboardList = useCallback(
    () =>
      axiosAuthInstance.get(
        `dashboards?navigationMethod=infiniteScroll&page=1&size=100`
      ),
    []
  );

  const { loading, error, data } = useAsync(getDashboardList, false);

  const totalCount: number = data?.totalCount ?? 0;
  const dashboardList: Dashboards[] = data?.dashboards ?? [];

  return {
    loading,
    error,
    totalCount,
    dashboardList,
  };
}
