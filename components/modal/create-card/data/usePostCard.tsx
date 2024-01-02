// import { useCallback } from 'react';
// import { axiosAuthInstance } from '@/utils';
// import { useAsync } from '@/hooks/useAsync';
// import { CreateCard } from '@/types/cards';

// export interface usePostCardProps {
//   formData: FormData;
// }

// const usePostCard = ({ formData }: usePostCardProps) => {
//   const postCard = useCallback(
//     () =>
//       axiosAuthInstance.post<CreateCard>('cards', {
//         assigneeUserId,
//         dashboardId,
//         columnId,
//         title,
//         description,
//         dueDate,
//         tags,
//         imageUrl,
//       }),
//     [title, color]
//   );

//   const { execute, loading, error, data } = useAsync(postCard, true);

//   return {
//     execute,
//     loading,
//     error,
//     data,
//   };
// };

// export default usePostCard;
