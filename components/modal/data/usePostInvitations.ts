import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { Invitations } from '@/types/invitations';

const usePostInvitations = (dashboardId: string, email: string) => {
  const postDashboards = useCallback(
    () =>
      axiosAuthInstance.post<Invitations>(
        `dashboards/${dashboardId}/invitations`,
        {
          email,
        }
      ),
    [email, dashboardId]
  );

  const { execute, loading, error, data } = useAsync(postDashboards, true);
  return {
    execute,
    loading,
    error,
    data,
  };
};

export default usePostInvitations;
