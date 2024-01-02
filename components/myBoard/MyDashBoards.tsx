import { BoardList, InvitationsDashBoards } from '@/components';
import { useUserInfo } from '@/store/memos';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyDashBoards() {
  const { userInfo } = useUserInfo();
  const router = useRouter();
  useEffect(() => {
    if (!userInfo.id) router.push('/login');
  }, []);
  return (
    <div className="w-full h-full py-40pxr pl-40pxr bg-gray10 ">
      <div className="w-1020pxr flex flex-col gap-44pxr h-full ">
        <BoardList />
        <InvitationsDashBoards />
      </div>
    </div>
  );
}
