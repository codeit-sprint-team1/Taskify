import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { CreateCard } from '@/types/cards';

const usePutCard = ({
  assigneeUserId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
  cardId,
}: CreateCard & { cardId: number }) => {
  const putCard = useCallback(
    () =>
      axiosAuthInstance.put<CreateCard>(`cards/${cardId}`, {
        assigneeUserId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
      }),
    [title, description, dueDate, tags, imageUrl, cardId]
  );

  const { execute, loading, error, data } = useAsync(putCard, true);

  return {
    execute,
    loading,
    error,
    data,
  };
};

export default usePutCard;
