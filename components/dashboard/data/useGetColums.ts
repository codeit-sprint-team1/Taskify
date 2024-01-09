import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';
import { useCallback } from 'react';
import { Columns } from '@/types/columns';

export default function useGetColum(id: number) {
  const getDashboards = useCallback(
    () => axiosAuthInstance('').get(`columns?dashboardId=${id}`),
    [id]
  );

  const { execute, loading, error, data } = useAsync(getDashboards, true);

  const columns: Columns[] = data?.data;

  return {
    execute,
    loading,
    error,
    columns,
  };
}
