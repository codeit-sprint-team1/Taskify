import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { CreateCard } from '@/types/cards';

const usePutCard = ({
  assigneeUserId = null,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
  cardId,
  columnId,
}: CreateCard & { cardId: number; columnId: number }) => {
  const putCard = useCallback(
    () =>
      axiosAuthInstance('').put<CreateCard>(`cards/${cardId}`, {
        assigneeUserId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
        columnId,
      }),
    [
      title,
      description,
      dueDate,
      tags,
      imageUrl,
      cardId,
      columnId,
      assigneeUserId,
    ]
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
