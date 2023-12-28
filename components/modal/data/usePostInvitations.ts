import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { Dashboards } from '@/types/dashboards';

const usePostInvitations = (dashboardId: string, email: string) => {
  const postDashboards = useCallback(
    () =>
      axiosAuthInstance.post<Dashboards>(
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
