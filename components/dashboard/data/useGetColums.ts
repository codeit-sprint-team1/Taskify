import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance, axiosInstance } from '@/utils';
import { useCallback } from 'react';
import { Columns } from '@/types/columns';

interface useGetColumType {
  id: number;
  accessToken: string | null;
}

export default function useGetColum({ id, accessToken }: useGetColumType) {
  const getDashboards = useCallback(
    () =>
      axiosInstance.get(`columns?dashboardId=${id}`, {
        baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    [id, accessToken]
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
