import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';
import { useCallback } from 'react';
import { Card } from '@/types/cards';

export default function useGetCards(id: number) {
  const getDashboards = useCallback(
    () => axiosAuthInstance('').get(`cards?size=1000&columnId=${id}`),
    []
  );

  const { execute, loading, error, data } = useAsync(getDashboards, false);

  const cards: Card[] = data?.cards;
  const totalCount: number = data?.totalCount;

  return {
    execute,
    loading,
    error,
    cards,
    totalCount,
  };
}
