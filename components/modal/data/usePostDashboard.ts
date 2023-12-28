import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { Dashboards } from '@/types/dashboards';

interface PostDashboardBody {
  title: string;
  color: string;
}

const usePostDashboard = ({ title, color }: PostDashboardBody) => {
  const postDashboard = useCallback(
    () =>
      axiosAuthInstance.post<{ data: Dashboards }>('dashboards', {
        title,
        color,
      }),
    [title, color]
  );

  const { execute, loading, error, data } = useAsync(postDashboard, true);

  return {
    execute,
    loading,
    error,
    data,
  };
};

export default usePostDashboard;
