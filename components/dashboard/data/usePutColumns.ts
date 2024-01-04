import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { Columns } from '@/types/columns';

interface UsePutColumnsProps {
  title: string;
  columnId: number;
}

const usePutColumns = ({ title, columnId }: UsePutColumnsProps) => {
  const putColumns = useCallback(
    () =>
      axiosAuthInstance.put<Columns>(`columns/${columnId}`, {
        title,
      }),
    [title, columnId]
  );

  const { execute, loading, error, data, status } = useAsync(putColumns, true);

  return {
    execute,
    loading,
    error,
    data,
    status,
  };
};

export default usePutColumns;
