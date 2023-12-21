import { axiosInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';
import { useCallback } from 'react';

interface UseSignUpParams {
  email: string;
  nickname: string;
  password: string;
}

function useSignUp({ email, nickname, password }: UseSignUpParams) {
  const signUp = useCallback(
    () =>
      axiosInstance.post('users', {
        email,
        nickname,
        password,
      }),
    [email, nickname, password]
  );
  const { execute, loading, error, data } = useAsync(signUp, true);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useSignUp;
