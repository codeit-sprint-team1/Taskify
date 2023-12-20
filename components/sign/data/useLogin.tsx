import { axiosInstance, useAsync } from '@/utils';
import { Token } from '@/types';
import { useCallback, useEffect } from 'react';

type UseLoginParams = { email: string; password: string };

export const useLogin = ({ email, password }: UseLoginParams) => {
  const Login = useCallback(
    () =>
      axiosInstance.post<{ data: Token }>('auth/login', {
        email,
        password,
      }),
    [email, password]
  );
  const { execute, loading, error, data } = useAsync(Login, true);

  useEffect(() => {
    if (data?.data?.accessToken) {
      localStorage.setItem('accessToken', data.data?.accessToken);
    }
  }, [data?.data?.accessToken]);

  return {
    execute,
    loading,
    error,
    data,
  };
};
