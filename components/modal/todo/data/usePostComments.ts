import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';

interface UsePostCommentsProps {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

function usePostComments({
  content,
  cardId,
  columnId,
  dashboardId,
}: UsePostCommentsProps) {
  const postComments = () =>
    axiosAuthInstance.post(`comments`, {
      content,
      cardId,
      columnId,
      dashboardId,
    });

  const { execute, loading, error, data } = useAsync(postComments, true);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default usePostComments;
