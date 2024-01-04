import { useAsync } from '@/hooks/useAsync';
import { axiosInstance } from '@/utils';

interface UsePutDashboardProps {
  title: string;
  color: string;
  boardid: number;
  token: string | null;
}

function usePutDashboard({
  title,
  color,
  boardid,
  token,
}: UsePutDashboardProps) {
  const putDashboard = () =>
    axiosInstance.put(
      `dashboards/${boardid}`,
      {
        title,
        color,
      },
      {
        baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  const { execute, loading, error, data } = useAsync(putDashboard, true);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default usePutDashboard;
