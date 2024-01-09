import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';

interface UseDeleteDashboardProps {
  boardid: number;
}

function useDeleteDashboard({ boardid }: UseDeleteDashboardProps) {
  const deleteDashboard = () =>
    axiosAuthInstance('').delete(`dashboards/${boardid}`);

  const { execute, error, loading, data, status } = useAsync(
    deleteDashboard,
    true
  );

  return {
    execute,
    error,
    loading,
    data,
    status,
  };
}

export default useDeleteDashboard;
