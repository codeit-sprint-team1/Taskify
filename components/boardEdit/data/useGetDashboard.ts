import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';

interface UseGetDashboardProps {
  boardid: string | string[] | undefined;
}

function useGetDashboard({ boardid }: UseGetDashboardProps) {
  const getDashboard = () => axiosAuthInstance.get(`dashboards/${boardid}`);

  const { execute, loading, error, data } = useAsync(getDashboard, false);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useGetDashboard;
