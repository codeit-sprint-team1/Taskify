import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { CreateCard } from '@/types/cards';

const usePostCard = ({
  assigneeUserId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: CreateCard) => {
  const postCard = useCallback(
    () =>
      axiosAuthInstance.post<CreateCard>('cards', {
        assigneeUserId,
        dashboardId,
        columnId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
      }),
    [title, description, dueDate, tags, imageUrl]
  );

  const { execute, loading, error, data } = useAsync(postCard, true);

  return {
    execute,
    loading,
    error,
    data,
  };
};

export default usePostCard;
