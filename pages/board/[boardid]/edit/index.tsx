import BoardEditLayout from '@/page-layout/BoardEditLayout';
import {
  Button,
  InviteListTable,
  MembersTable,
  NameEditForm,
} from '@/components';
import React, { useEffect, useState } from 'react';
import useGetDashboard from '@/components/boardEdit/data/useGetDashboard';
import { useRouter } from 'next/router';
import useDeleteDashboard from '@/components/boardEdit/data/useDeleteDashboard';

function BoardEditPage() {
  const [boardInfo, setBoardInfo] = useState<any>();
  const router = useRouter();
  const { boardid } = router.query;
  console.log(boardid);
  const { loading, data } = useGetDashboard({ boardid });
  const { execute: deleteDashBoard, error } = useDeleteDashboard({ boardid });

  useEffect(() => {
    if (loading) return;
    if (data) {
      setBoardInfo(data);
    }
  }, [loading, data, boardInfo, boardid]);

  return (
    <div className="m-20pxr">
      <BoardEditLayout
        nameEditForm={<NameEditForm boardInfo={boardInfo} />}
        membersTable={<MembersTable />}
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
