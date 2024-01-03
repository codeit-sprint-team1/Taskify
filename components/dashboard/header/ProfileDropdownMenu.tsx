import { useDashboardList } from '@/store/memos';
import useUserInfo from '@/store/memos/useUserInfo';
import { useRouter } from 'next/router';
import { DropdownMenu } from '@/components';

export default function ProfileDropdownMenu() {
  const router = useRouter();
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
        useUserInfo.persist.clearStorage();
        useDashboardList.persist.clearStorage();
        localStorage.removeItem('user-info');
        localStorage.removeItem('accessToken');
        router.push('/');
      },
    },
  ];

  const isMydashboard = router.pathname === '/mydashboard';
  if (isMydashboard) {
    options = options.splice(1);
  }

  return (
    <div className="absolute -right-15pxr top-15pxr">
      <DropdownMenu options={options} />
    </div>
  );
}
