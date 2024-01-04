import { useAsync } from '@/hooks/useAsync';
import { axiosInstance } from '@/utils';

interface UseDeleteDashboardProps {
  boardid: number;
  token: string | null;
}

function useDeleteDashboard({ boardid, token }: UseDeleteDashboardProps) {
  const deleteDashboard = () =>
    axiosInstance.delete(`dashboards/${boardid}`, {
      baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

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
