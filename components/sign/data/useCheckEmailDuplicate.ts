import { axiosInstance, useAsync } from '@/utils';
import { useCallback } from 'react';

function useCheckEmailDuplicate(email: string) {
  const checkEmailDuplicate = useCallback(
    () =>
      axiosInstance.post('users', {
        email,
      }),
    [email]
  );
  const { execute, loading, error, data } = useAsync(checkEmailDuplicate, true);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useCheckEmailDuplicate;
