import { useDashboardList, useUserInfo } from '@/store/memos';
import { useRouter } from 'next/router';
import { DropdownMenu } from '@/components';

export default function ProfileDropdownMenu() {
  const router = useRouter();
  const { clearDashboardList } = useDashboardList();
  const { clearUserInfo } = useUserInfo();
  let options = [
    {
      key: 1,
      title: '내 대시보드',
      handler: () => {
        router.push('/mydashboard');
      },
    },
    {
      key: 2,
      title: '내 계정',
      handler: () => {
        router.push('/mypage');
      },
    },
    {
      key: 3,
      title: '로그아웃',
      handler: () => {
        localStorage.removeItem('user-info');
        localStorage.removeItem('accessToken');
        clearDashboardList();
        clearUserInfo();
        useUserInfo.persist.clearStorage();
        useDashboardList.persist.clearStorage();
        router.push('/');
      },
    },
  ];

  const isMydashboard = router.pathname === '/mydashboard';
  if (isMydashboard) {
    options = options.splice(1);
  }

  return <DropdownMenu options={options} />;
}
