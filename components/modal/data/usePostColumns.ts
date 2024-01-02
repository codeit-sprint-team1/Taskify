import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { Columns } from '@/types/columns';

interface PostColumnsProps {
  title: string;
  dashboardId: number;
}

const usePostColumns = ({ title, dashboardId }: PostColumnsProps) => {
  const postColumns = useCallback(
    () =>
      axiosAuthInstance.post<Columns>('columns', {
        title,
        dashboardId,
      }),
    [title, dashboardId]
  );

  const { execute, loading, error, data } = useAsync(postColumns, true);

  return {
    execute,
    loading,
    error,
    data,
  };
};

export default usePostColumns;
