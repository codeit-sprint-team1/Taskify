import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';
import { useEffect } from 'react';

interface UseGetDashboardProps {
  boardid: number;
}

function useGetDashboard({ boardid }: UseGetDashboardProps) {
  const getDashboard = () => axiosAuthInstance.get(`dashboards/${boardid}`);

  const { execute, loading, error, data } = useAsync(getDashboard);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useGetDashboard;
