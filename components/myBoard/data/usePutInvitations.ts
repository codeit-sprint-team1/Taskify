import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { useCallback } from 'react';
import { useDashboardList } from '@/store/memos';

export default function usePutInvitations(inviteAccepted: boolean, id: number) {
  const { addDashboard } = useDashboardList();
  const putInvitations = useCallback(
    () => axiosAuthInstance('').put(`invitations/${id}`, { inviteAccepted }),
    [inviteAccepted]
  );
  const { execute, loading, error, data } = useAsync(putInvitations, true);

  if (inviteAccepted && data) {
    addDashboard(data);
  }

  return {
    execute,
    loading,
    error,
    data,
  };
}
