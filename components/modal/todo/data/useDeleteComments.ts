import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';
import React from 'react';

interface useDeleteCommentsProps {
  commentId: number;
}

function useDeleteComments({ commentId }: useDeleteCommentsProps) {
  const deleteComments = () =>
    axiosAuthInstance.delete(`comments/${commentId}`);

  const { execute } = useAsync(deleteComments);

  return {
    execute,
  };
}

export default useDeleteComments;
