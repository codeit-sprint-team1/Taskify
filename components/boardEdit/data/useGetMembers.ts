import { useAsync } from '@/hooks/useAsync';
import { Members } from '@/types/types';
import { axiosAuthInstance } from '@/utils';

interface useGetMembersProps {
  boardid: number;
  // page: number;
  // size: number;
}

function useGetMembers({ boardid }: useGetMembersProps) {
  const mapMembersData = (members?: Members[]): Members[] => {
    if (!members) return [];

    return members?.map((member) => {
      const {
        id,
        email,
        nickname,
        profileImageUrl,
        createdAt,
        updatedAt,
        isOwner,
        userId,
      } = member;

      return {
        id,
        email,
        nickname,
        profileImageUrl,
        createdAt,
        updatedAt,
        isOwner,
        userId,
      };
    });
  };

  const getMembers = () =>
    axiosAuthInstance.get(`members?page=${1}&size=${4}&dashboardId=${boardid}`);
  const { execute, error, loading, data } = useAsync(getMembers);
  const members = mapMembersData(data?.members);

  return {
    execute,
    error,
    loading,
    data: members,
  };
}

export default useGetMembers;