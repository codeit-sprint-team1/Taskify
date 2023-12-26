import BoardEditLayout from '@/page-layout/BoardEditLayout';
import {
  Button,
  InviteListTable,
  MembersTable,
  NameEditForm,
} from '@/components';
import React from 'react';
import useGetDashboard from '@/components/boardEdit/data/useGetDashboard';
import { useRouter } from 'next/router';
import useDeleteDashboard from '@/components/boardEdit/data/useDeleteDashboard';

function BoardEditPage() {
  const router = useRouter();
  const params = router.query;
  const boardid = params?.boardid ? Number(params.boardid) : null;
  if (boardid === null || isNaN(boardid)) return;
  const { execute: getDashboard, data: dashboard } = useGetDashboard({
    boardid,
  });
  const { execute: deleteDashBoard } = useDeleteDashboard({ boardid });
  const dashboardTitle = dashboard?.title;

  return (
    <div className="m-20pxr">
      <BoardEditLayout
        nameEditForm={
          <NameEditForm
            boardInfo={dashboard}
            dashboardTitle={dashboardTitle}
            getDashboard={getDashboard}
          />
        }
        membersTable={<MembersTable boardid={boardid} />}
        inviteListTable={<InviteListTable boardid={boardid} />}
      ></BoardEditLayout>
      <Button
        variant="modal"
        size="small"
        className="font-medium text-black w-320pxr h-62pxr mb-56pxr mt-32pxr mobile:mx-auto"
        onClick={deleteDashBoard}
      >
        대시보드 삭제하기
      </Button>
    </div>
  );
}

export default BoardEditPage;
