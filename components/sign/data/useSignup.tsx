import { Token } from '@/types';
import { axiosInstance, useAsync } from '@/utils';
import { useCallback, useEffect } from 'react';

type UseSignUpParams = { email: string; nickname: string; password: string };

export const useSignUp = ({ email, nickname, password }: UseSignUpParams) => {
  const signUp = useCallback(
    () =>
      axiosInstance.post<{ data: Token }>('users', {
        email,
        nickname,
        password,
      }),
    [email, password, nickname]
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
