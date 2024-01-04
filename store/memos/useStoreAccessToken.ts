import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useStoreAccessTokenType {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

const useStoreAccessToken = create(
  persist<useStoreAccessTokenType>(
    (set) => ({
      accessToken: null,
      setAccessToken: (token: string) => {
        set({
          accessToken: token,
        });
      },
      clearAccessToken: () => {
        set({
          accessToken: null,
        });
      },
    }),
    {
      name: 'user-info',
    }
  )
);

export default useStoreAccessToken;
