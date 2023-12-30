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
    <div className="w-full h-full pt-40pxr pl-40pxr bg-pink ">
      <div className="w-1020pxr flex-col-center gap-44pxr">
        <BoardList />
        <InvitationsDashBoards />
      </div>
    </div>
  );
}
