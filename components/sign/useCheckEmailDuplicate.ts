import { axiosInstance, useAsync } from '@/utils';

import { useCallback } from 'react';

export const useCheckEmailDuplicate = (email: string) => {
  const checkEmailDuplicate = useCallback(
    () =>
      axiosInstance.post<{ data: { isUsableNickname: boolean } }>(
        'check-email',
        {
          email,
        }
      ),
    [email]
  );
  const { execute, loading, error, data } = useAsync(checkEmailDuplicate, true);

  return {
    execute,
    loading,
    error,
    data,
  };
};
