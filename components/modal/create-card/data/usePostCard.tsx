// import { useCallback } from 'react';
// import { axiosAuthInstance } from '@/utils';
// import { useAsync } from '@/hooks/useAsync';
// import { CreateCard } from '@/types/cards';

// export interface usePostCardProps {
//   formData: FormData;
// }

// const usePostCard = ({
//   formData
// }: usePostCardProps) => {
//   const postDashboards = useCallback(
//     () =>
//       axiosAuthInstance.post<CreateCard>('dashboards', {
//         assigneeUserId,
//   dashboardId,
//   columnId,
//   title,
//   description,
//   dueDate,
//   tags,
//   imageUrl,
//       }),
//     [title, color]
//   );

//   const { execute, loading, error, data } = useAsync(postDashboards, true);

//   return {
//     execute,
//     loading,
//     error,
//     data,
//   };
// };

// export default usePostCard;
