import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';

interface useGetMembersProps {
  boardid: string | string[] | undefined;
  // page: number;
  // size: number;
}

function useGetMembers({ boardid }: useGetMembersProps) {
  const getMembers = () =>
    axiosAuthInstance.get(`members?page=${1}&size=${4}&dashboardId=${boardid}`);

  const { execute, error, loading, data } = useAsync(getMembers);
  return {
    execute,
    error,
    loading,
    data,
  };
}

export default useGetMembers;
