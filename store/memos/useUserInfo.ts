import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface userInfoType {
  id: number | null;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserInfoState {
  userInfo: userInfoType | null;
}

interface UserInfoActions {
  setUserInfo: (userinfo: userInfoType) => void;
  clearUserInfo: () => void;
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
      userInfo: null,
      setUserInfo: (newUserInfo: userInfoType) => {
        set({
          userInfo: newUserInfo,
        });
      },
      clearUserInfo: () => {
        set({
          userInfo: null,
        });
      },
    }),
    {
      name: 'user-info',
    }
  )
);

export default useUserInfo;
