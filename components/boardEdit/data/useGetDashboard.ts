import { useAsync } from '@/hooks/useAsync';
import { axiosInstance } from '@/utils';

interface UseGetDashboardProps {
  boardid: number;
  token: string | null;
}

function useGetDashboard({ boardid, token }: UseGetDashboardProps) {
  const getDashboard = () =>
    axiosInstance.get(`dashboards/${boardid}`, {
      baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

  const { execute, loading, error, data } = useAsync(getDashboard);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useGetDashboard;
