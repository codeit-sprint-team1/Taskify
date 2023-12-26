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
  userInfo: userInfoType;
}

interface UserInfoActions {
  setUserInfo: (userinfo: userInfoType) => void;
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
      setUserInfo: (newUserInfo: userInfoType) => {
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
