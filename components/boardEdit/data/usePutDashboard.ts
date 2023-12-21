import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';

interface UsePutDashboardProps {
  title: string;
  color: string;
  dashboardId: number;
}

function usePutDashboard({ title, color, dashboardId }: UsePutDashboardProps) {
  const putDashboard = () =>
    axiosAuthInstance.put(`dashboards/${dashboardId}`, {
      title,
      color,
    });
  const { execute, loading, error, data } = useAsync(putDashboard, true);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default usePutDashboard;
