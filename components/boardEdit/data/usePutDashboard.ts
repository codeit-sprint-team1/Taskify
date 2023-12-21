import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';

interface UsePutDashboardProps {
  title: string;
  color: string;
  boardid: string | string[] | undefined;
}

function usePutDashboard({ title, color, boardid }: UsePutDashboardProps) {
  const putDashboard = () =>
    axiosAuthInstance.put(`dashboards/${boardid}`, {
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
