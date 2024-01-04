import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';

interface useDeleteMemberProps {
  memberId: number;
}

function useDeleteMember({ memberId }: useDeleteMemberProps) {
  const deleteMember = () => axiosAuthInstance.delete(`members/${memberId}`);

  const { execute, loading, error, data } = useAsync(deleteMember, true);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useDeleteMember;
