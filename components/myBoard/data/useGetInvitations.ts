import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { useCallback } from 'react';
import { Invitations } from '@/types/invitations';

export default function useGetInvitations() {
  const getDashBoards = useCallback(
    () => axiosAuthInstance.get('invitations?size=1000'),
    []
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
