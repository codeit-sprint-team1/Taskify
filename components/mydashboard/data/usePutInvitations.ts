import { axiosInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { useCallback } from 'react';
import { useDashboardList } from '@/store/memos';

interface usePutInvitationsParams {
  inviteAccepted: boolean;
  id: number;
  token: string | null;
}
export default function usePutInvitations({
  inviteAccepted,
  id,
  token,
}: usePutInvitationsParams) {
  const { addDashboard } = useDashboardList();
  const putInvitations = useCallback(
    () =>
      axiosInstance.put(
        `invitations/${id}`,
        { inviteAccepted },
        {
          baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ),
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
