import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useTokenRedirect = (tokenResponse?: string) => {
  const router = useRouter();

  useEffect(() => {
    const routeToFolderPage = () => {
      router.replace('/login');
    };
    const accessTokenInLocalStorage = localStorage.getItem('accessToken');

    if (tokenResponse) {
      routeToFolderPage();
      return;
    }

    if (accessTokenInLocalStorage) {
      routeToFolderPage();
    }
  }, [tokenResponse, router]);
};
