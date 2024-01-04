import { useAsync } from '@/hooks/useAsync';
import { axiosInstance } from '@/utils';

interface useDeleteMemberProps {
  memberId: number;
  token: string | null;
}

function useDeleteMember({ memberId, token }: useDeleteMemberProps) {
  const deleteMember = () =>
    axiosInstance.delete(`members/${memberId}`, {
      baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

  const { execute, loading, error, data } = useAsync(deleteMember, true);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useDeleteMember;
