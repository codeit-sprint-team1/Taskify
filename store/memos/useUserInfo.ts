import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoginData } from '@/types/auth';
interface UserInfoState {
  userInfo: LoginData;
}

interface UserInfoActions {
  setUserInfo: (userinfo: LoginData) => void;
}

const defaultState = {
  id: null,
  email: '',
  nickname: '',
  profileImageUrl: '',
  createdAt: '',
  updatedAt: '',
};

const useUserInfo = create(
  persist<UserInfoState & UserInfoActions>(
    (set) => ({
      userInfo: defaultState,
      setUserInfo: (newUserInfo: LoginData) => {
        set({
          userInfo: newUserInfo,
        });
      },
    }),
    {
      name: 'user-info',
    }
  )
);

export default useUserInfo;
