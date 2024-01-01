import { useDashboardList } from '@/store/memos/useDashboardList';
import useUserInfo from '@/store/memos/useUserInfo';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface ProfileDropdownItemProps {
  handler: () => void;
  children: ReactNode;
}

function ProfileDropdownItem({ children, handler }: ProfileDropdownItemProps) {
  return (
    <button
      onClick={handler}
      className="w-full text-left px-10pxr py-5pxr rounded-md hover:bg-violet8"
    >
      {children}
    </button>
  );
}

export default function ProfileDropdownMenu() {
  const router = useRouter();
  const options = [
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
        router.reload();
      },
    },
  ];

  return (
    <ul className="absolute right-0pxr mt-10pxr w-115pxr border border-2pxr border-gray30 rounded-lg p-8pxr bg-white">
      {options.map((option) => (
        <li key={option.key}>
          <ProfileDropdownItem handler={option.handler}>
            {option.title}
          </ProfileDropdownItem>
        </li>
      ))}
    </ul>
  );
}
