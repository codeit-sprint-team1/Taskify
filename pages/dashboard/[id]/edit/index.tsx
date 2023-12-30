import BoardEditLayout from '@/page-layout/BoardEditLayout';
import {
  ArrowBackButton,
  Button,
  InviteListTable,
  MembersTable,
  NameEditForm,
} from '@/components';
import React from 'react';
import useGetDashboard from '@/components/boardEdit/data/useGetDashboard';
import { useRouter } from 'next/router';
import useDeleteDashboard from '@/components/boardEdit/data/useDeleteDashboard';
import Link from 'next/link';
import DeleteDashboardConfirmModal from '@/components/boardEdit/DeleteDashboardConfirmModal';
import useToggle from '@/hooks/useToggle';
import { axiosAuthInstance } from '@/utils';

function BoardEditPage() {
  const router = useRouter();
  const params = router.query;
  const boardid = params?.id ? Number(params.id) : null;
  if (boardid === null || isNaN(boardid)) return;
  const { execute: getDashboard, data: dashboard } = useGetDashboard({
    boardid,
  });
  const dashboardTitle = dashboard?.title;
  const { isOn, toggle } = useToggle();

  const handleCancel = () => {
    toggle();
  };

  const testCreateBoard = async () => {
    const res = await axiosAuthInstance.post(`dashboards`, {
      title: '테스트용보드',
      color: '#5534da',
    });
    console.log(res);
  };

  return (
    <div className="m-20pxr">
      <div className="w-100pxr">
        <Link href={`/dashboard/${boardid}`}>
          <ArrowBackButton />
        </Link>
      </div>
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
        onClick={toggle}
      >
        대시보드 삭제하기
      </Button>
      <DeleteDashboardConfirmModal
        isOpen={isOn}
        onCancel={handleCancel}
        boardid={boardid}
      />
      <button onClick={testCreateBoard}>생성하기</button>
    </div>
  );
}

export default BoardEditPage;
