import { create } from 'zustand';

interface userInfoType {
  accessToken?: string;
  user: {
    id: number | null;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

interface UserInfoState {
  userInfo: userInfoType;
}

interface UserInfoActions {
  setUserInfo: (userinfo: userInfoType) => void;
}

const defaultState = {
  accessToken: '',
  user: {
    id: null,
    email: '',
    nickname: '',
    profileImageUrl: '',
    createdAt: '',
    updatedAt: '',
  },
};

const useUserInfo = create<UserInfoState & UserInfoActions>((set) => ({
  userInfo: defaultState,
  setUserInfo: (newUserInfo) => {
    set({
      userInfo: {
        accessToken: newUserInfo.accessToken,
        user: newUserInfo.user,
      },
    });
    console.log(newUserInfo);
  },
}));

export default useUserInfo;
