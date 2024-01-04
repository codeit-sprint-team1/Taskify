import { useAsync } from '@/hooks/useAsync';
import { CommentsRawData } from '@/types/comments';
import { axiosAuthInstance } from '@/utils';

interface UseGetCommentsProps {
  cardId: number;
}

function useGetComments({ cardId }: UseGetCommentsProps) {
  const getComments = () =>
    axiosAuthInstance('').get<CommentsRawData>(`comments?cardId=${cardId}`);

  const { execute, loading, error, data } = useAsync(getComments);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useGetComments;
