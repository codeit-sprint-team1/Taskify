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

function BoardEditPage() {
  const router = useRouter();
  const { boardid } = router.query;

  const { error, loading, data } = useGetDashboard({ boardid });
  console.log(data);

  return (
    <div className="m-20pxr">
      <BoardEditLayout
        nameEditForm={<NameEditForm />}
        membersTable={<MembersTable />}
        inviteListTable={<InviteListTable />}
      ></BoardEditLayout>
      <Button
        variant="modal"
        size="small"
        className="font-medium text-black w-320pxr h-62pxr mb-56pxr mt-32pxr"
      >
        대시보드 삭제하기
      </Button>
    </div>
  );
}

export default BoardEditPage;
