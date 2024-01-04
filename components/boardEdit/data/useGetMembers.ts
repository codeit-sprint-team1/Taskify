import { axiosInstance } from '@/utils';
import { useCallback } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { Members } from '@/types/members';

interface useGetMembersProps {
  page: number;
  size: number;
  boardid: number;
  token: string | null;
}

const useGetMembers = ({ page, size, boardid, token }: useGetMembersProps) => {
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

  const getMembers = useCallback(
    () =>
      axiosInstance.get(
        `members?page=${page}&size=${size}&dashboardId=${boardid}`,
        {
          baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    [token, boardid]
  );

  const { execute, loading, error, data, status } = useAsync(getMembers, false);

  const members = mapMembersData(data?.members);
  const totalCount = data?.totalCount;

  return { execute, loading, error, members, totalCount, status };
};

export default useGetMembers;
