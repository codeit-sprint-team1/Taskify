import { useCallback } from 'react';
import { axiosAuthInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { Dashboards } from '@/types/dashboards';
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
  const postDashboards = useCallback(
    () =>
      axiosAuthInstance.post<Dashboards>('dashboards', {
        title,
        color,
      }),
    [title, color]
  );

  const { execute, loading, error, data } = useAsync(postDashboards, true);

  return {
    execute,
    loading,
    error,
    data,
  };
};

export default usePostCard;
