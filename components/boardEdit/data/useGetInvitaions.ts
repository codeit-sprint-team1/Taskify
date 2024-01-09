import { useAsync } from '@/hooks/useAsync';
import { DashboardsInvitation } from '@/types/dashboards';
import { InvitationsRawData } from '@/types/invitations';
import { axiosAuthInstance } from '@/utils';

interface useGetInvitationsProps {
  boardid: number;
  page: number;
  size: number;
}

function useGetInvitaions({ boardid, page, size }: useGetInvitationsProps) {
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

  const getInvitaions = () =>
    axiosAuthInstance('').get<DashboardsInvitation>(
      `dashboards/${boardid}/invitations?page=${page}&size=${size}`
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

export default useGetInvitaions;
