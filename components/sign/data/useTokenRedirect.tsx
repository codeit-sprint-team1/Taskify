import { useRouter } from 'next/router';
import { useEffect } from 'react';

function useTokenRedirect(tokenResponse?: string) {
  const router = useRouter();

  useEffect(() => {
    const routeToDashboardPage = () => {
      router.replace('mydashboard');
    };
    const accessTokenInLocalStorage = localStorage.getItem('accessToken');

    if (tokenResponse) {
      routeToDashboardPage();
      return;
    }

    if (accessTokenInLocalStorage) {
      routeToDashboardPage();
    }
  }, [tokenResponse, router]);
}

export default useTokenRedirect;
