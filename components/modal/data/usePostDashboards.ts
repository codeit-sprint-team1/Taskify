import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { Dashboards } from '@/types/dashboards';

interface PostDashboardProps {
  title: string;
  color: string;
}

const usePostDashboards = ({ title, color }: PostDashboardProps) => {
  const postDashboards = useCallback(
    () =>
      axiosAuthInstance.post<Dashboards>('dashboards', {
        title,
        color,
      }),
    [title, color]
  );

  const { execute, loading, error, data } = useAsync(postDashboards, true);

  return {
    execute,
    loading,
    error,
    data,
  };
};

export default usePostDashboards;
