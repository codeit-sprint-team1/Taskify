import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';
import { useCallback } from 'react';
import { Dashboards } from '@/types/dashboards';

const useGetDashboards = () => {
  const getDashboards = useCallback(
    () =>
      axiosAuthInstance.get(
        `dashboards?navigationMethod=infiniteScroll&page=1&size=100`
        //불러오는 목록 size, 무한스크롤 구현하면서 바꾸기
      ),
    []
  );

  const { execute, loading, error, data } = useAsync(getDashboards, false);

  const totalCount: number = data?.totalCount;
  const dashboards: Dashboards[] = data?.dashboards;

  return {
    loading,
    error,
    totalCount,
    dashboards,
  };
};

export default useGetDashboards;
