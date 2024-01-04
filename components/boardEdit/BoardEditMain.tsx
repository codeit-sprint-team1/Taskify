import Link from 'next/link';
import React from 'react';
import {
  ArrowBackButton,
  Button,
  DeleteDashboardConfirmModal,
  InviteListTable,
  MembersTable,
  NameEditForm,
} from '..';
import BoardEditLayout from '@/page-layout/BoardEditLayout';
import useGetDashboard from './data/useGetDashboard';
import useToggle from '@/hooks/useToggle';
import { useRouter } from 'next/router';
import { useStoreAccessToken } from '@/store/memos';

interface BoardEditMainProps {
  boardid: number;
}

function BoardEditMain({ boardid }: BoardEditMainProps) {
  const { accessToken: token } = useStoreAccessToken();
  const { execute: getDashboard, data: dashboard } = useGetDashboard({
    boardid,
    token,
  });
  const { isOn, toggle } = useToggle();
  const dashboardTitle = dashboard?.title;
  const handleCancel = () => {
    toggle();
  };
  const router = useRouter();
  return (
    <div className="m-20pxr">
      <div className="w-100pxr">
        <div
          className="curosr-pointer"
          onClick={() => router.push('/mydashboard')}
        >
          <ArrowBackButton />
        </div>
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
    </div>
  );
}

export default BoardEditMain;
