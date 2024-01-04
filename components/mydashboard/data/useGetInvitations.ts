import { axiosInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { useCallback } from 'react';
import { Invitations } from '@/types/invitations';

export default function useGetInvitations(token: string | null) {
  const getDashBoards = useCallback(
    () =>
      axiosInstance.get('invitations?size=1000', {
        baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    [token]
  );
  const { execute, loading, error, data } = useAsync(getDashBoards, false);

  const invitations: Invitations[] = data?.invitations;

  return {
    execute,
    loading,
    error,
    invitations,
  };
}
