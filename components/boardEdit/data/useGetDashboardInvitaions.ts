import { useAsync } from '@/hooks/useAsync';
import { DashboardsInvitation } from '@/types/dashboards';
import { InvitationsRawData } from '@/types/invitations';
import { axiosInstance } from '@/utils';
import { useCallback } from 'react';

interface useGetInvitationsProps {
  boardid: number;
  page: number;
  size: number;
  token: string | null;
}

function useGetDashboardInvitaions({
  boardid,
  page,
  size,
  token,
}: useGetInvitationsProps) {
  const mapInvitationsData = (invitations?: InvitationsRawData) => {
    if (!invitations) return;

    return invitations.invitations.map((invitation) => {
      const { id, invitee, inviteAccepted, createdAt, updatedAt } = invitation;

      return {
        id,
        invitee,
        inviteAccepted,
        createdAt,
        updatedAt,
      };
    });
  };

  const getInvitaions = useCallback(
    () =>
      axiosInstance.get<DashboardsInvitation>(
        `dashboards/${boardid}/invitations?page=${page}&size=${size}`,
        {
          baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    [token]
  );

  const { execute, error, loading, data, setData } = useAsync(
    getInvitaions,
    false,
    page
  );
  return {
    execute,
    error,
    loading,
    data,
    setData,
  };
}

export default useGetDashboardInvitaions;
