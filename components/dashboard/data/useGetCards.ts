import { useAsync } from '@/hooks/useAsync';
import { axiosInstance } from '@/utils';
import { useCallback } from 'react';
import { Card } from '@/types/cards';

interface useGetCardsType {
  id: number;
  accessToken: string | null;
}

export default function useGetCards({ id, accessToken }: useGetCardsType) {
  const getDashboards = useCallback(
    () =>
      axiosInstance.get(`cards?size=1000&columnId=${id}`, {
        baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    [id, accessToken]
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
