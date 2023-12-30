import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { useCallback } from 'react';

export default function usePutInvitations(inviteAccepted: boolean, id: number) {
  const putInvitations = useCallback(
    () => axiosAuthInstance.put(`invitations/${id}`, { inviteAccepted }),
    [inviteAccepted]
  );
  const { execute, loading, error, data } = useAsync(putInvitations, true);

  return {
    execute,
    loading,
    error,
    data,
  };
}
