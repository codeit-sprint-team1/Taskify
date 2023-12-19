import { Token } from '@/types';
import { axiosInstance, useAsync } from '@/utils';
import { useCallback, useEffect } from 'react';

type UseSignUpParams = { email: string; nickname: string; password: string };

export const useSignUp = ({ email, nickname, password }: UseSignUpParams) => {
  const signUp = () =>
    axiosInstance.post('users', {
      email,
      nickname,
      password,
    });
  const { execute, loading, error, data } = useAsync(signUp, true);

  return {
    execute,
    loading,
    error,
    data,
  };
};
