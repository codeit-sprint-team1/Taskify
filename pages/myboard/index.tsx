import { BoardList, InvitationsDashBoards } from '@/components';

export default function MyDashBoards() {
  return (
    <div className="w-screen h-screen pt-40pxr pl-40pxr bg-gray10 ">
      <div className="w-1020pxr flex-col-center gap-44pxr">
        <BoardList />
        <InvitationsDashBoards />
      </div>
    </div>
  );
}
