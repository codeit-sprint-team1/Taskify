import { useAsync } from '@/hooks/useAsync';
import { LoginData } from '@/types/auth';
import { axiosAuthInstance } from '@/utils';

function useGetUser() {
  const getUser = () => axiosAuthInstance('').get(`users/me`);

  const { execute, loading, error, data } = useAsync<LoginData>(getUser);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useGetUser;
