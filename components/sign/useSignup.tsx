import { Token } from '@/types';
import { axiosInstance, useAsync } from '@/utils';
import { useCallback, useEffect } from 'react';

type UseSignUpParams = { email: string; password: string };

export const useSignUp = ({ email, password }: UseSignUpParams) => {
  const signUp = useCallback(
    () =>
      axiosInstance.post<{ data: Token }>('sign-up', {
        email,
        password,
      }),
    [email, password]
  );
  const { execute, loading, error, data } = useAsync(signUp, true);

  useEffect(() => {
    if (data?.data.accessToken) {
      localStorage.setItem('accessToken', data.data.accessToken);
    }
  }, [data?.data.accessToken]);

  return {
    execute,
    loading,
    error,
    data,
  };
};
