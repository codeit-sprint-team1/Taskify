import { useAsync } from '@/hooks/useAsync';
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
    axiosAuthInstance.get<InvitationsRawData>(
      `dashboards/${boardid}/invitations?number=${page}&size=${size}`
    );

  const { execute, error, loading, data } = useAsync(getInvitaions);
  // const invitations = mapInvitationsData(data?.invitations);
  return {
    execute,
    error,
    loading,
    data,
  };
}

export default useGetInvitaions;
