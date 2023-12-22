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
  const { data: dashboard } = useGetDashboard({ boardid });
  const { execute: deleteDashBoard } = useDeleteDashboard({ boardid });
  const dashboardTitle = dashboard?.title;
  console.log('dashboard!!!', dashboard);

  return (
    <div className="m-20pxr">
      <BoardEditLayout
        nameEditForm={
          <NameEditForm boardInfo={dashboard} dashboardTitle={dashboardTitle} />
        }
        membersTable={<MembersTable boardid={boardid} />}
        inviteListTable={<InviteListTable />}
      ></BoardEditLayout>
      <Button
        variant="modal"
        size="small"
        className="font-medium text-black w-320pxr h-62pxr mb-56pxr mt-32pxr"
        onClick={deleteDashBoard}
      >
        대시보드 삭제하기
      </Button>
    </div>
  );
}

export default BoardEditPage;
