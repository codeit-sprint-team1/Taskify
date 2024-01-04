import { useAsync } from '@/hooks/useAsync';
import { userInfoType } from '@/store/memos/useUserInfo';
import { axiosAuthInstance } from '@/utils';

function useGetUser() {
  const getUser = () => axiosAuthInstance.get(`users/me`);

  const { execute, loading, error, data } = useAsync<userInfoType>(getUser);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useGetUser;
