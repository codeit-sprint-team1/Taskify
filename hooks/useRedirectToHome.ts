import { useRouter } from 'next/router';
import getLocalItem from '@/utils/getLocalItem';
import { useEffect } from 'react';

const useRedirectToMain = (item: string) => {
  const router = useRouter();
  const Item = getLocalItem(item);
  useEffect(() => {
    if (!Item) {
      router.replace('/');
    }
  }, []);
};

export default useRedirectToMain;
