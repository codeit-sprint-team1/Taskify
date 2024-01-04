import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';
import { useCallback } from 'react';

const useDeleteColumns = (columnId: number) => {
  const deleteColumns = useCallback(
    () => axiosAuthInstance('').delete(`columns/${columnId}`),
    [columnId]
  );

  const { execute, loading, error, data, status } = useAsync(
    deleteColumns,
    true
  );

  return {
    execute,
    loading,
    error,
    data,
    status,
  };
};

export default useDeleteColumns;
