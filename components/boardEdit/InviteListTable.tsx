import React, { useState } from 'react';
import { Button, InviteModal } from '..';
import Image from 'next/image';
import inviteIcon from '@/public/icons/inviteIcon.svg';
import useGetDashboardInvitaions from './data/useGetDashboardInvitaions';
import { axiosAuthInstance } from '@/utils';
import PagenationButton from '../common/PaginationButton';
import useToggle from '@/hooks/useToggle';
import InviteList from './InviteList';
import { useStoreAccessToken } from '@/store/memos';

interface InviteListTableProps {
  boardid: number;
}

function InviteListTable({ boardid }: InviteListTableProps) {
  const { accessToken: token } = useStoreAccessToken();
  const [page, setPage] = useState(1);
  const SIZE = 4;
  const { execute, data } = useGetDashboardInvitaions({
    boardid,
    page,
    size: SIZE,
    token,
  });
  const totalCount = data?.totalCount as number;
  const invitations = data?.invitations;

  const handleDeleteInvitation = async (invitationId: number) => {
    try {
      const res = await axiosAuthInstance.delete(
        `dashboards/${boardid}/invitations/${invitationId}`
      );
      execute();
    } catch (error) {
      console.error(error);
    }
  };
  const { isOn, toggle } = useToggle();
  const totalPages = Math.ceil(totalCount / SIZE);

  const handleClickRight = () => {
    setPage(page + 1);
  };

  const handleClickLeft = () => {
    setPage(page - 1);
  };

  const handleCancel = () => {
    toggle();
  };

  const handleInvite = () => {
    execute();
  };

  return (
    <div className="p-30pxr">
      <div className="flex justify-between">
        <h1 className="font-bold text-24pxr mobile:text-20pxr">초대 내역</h1>
        <div className="flex items-center space-x-22pxr ">
          <p className="text-14pxr">
            {totalPages} 페이지 중 {page}
          </p>
          <PagenationButton
            onClickRight={handleClickRight}
            onClickLeft={handleClickLeft}
            totalPages={totalPages}
            page={page}
          />
          <Button
            variant="primary"
            size="mobile"
            className="w-105pxr mobile:hidden"
            onClick={toggle}
          >
            <div className="flex gap-x-8pxr">
              <Image src={inviteIcon} alt="초대하기 아이콘" />
              초대하기
            </div>
          </Button>
          <InviteModal
            isOpen={isOn}
            onCancel={handleCancel}
            handler={handleInvite}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-16pxr text-gray40 py-24pxr">이메일</p>
        <Button
          variant="primary"
          size="mobile"
          className="hidden w-105pxr mobile:flex"
        >
          <div className="flex gap-x-8pxr">
            <Image src={inviteIcon} alt="초대하기 아이콘" />
            초대하기
          </div>
        </Button>
      </div>
      <InviteList invitations={invitations} onDelete={handleDeleteInvitation} />
    </div>
  );
}

export default InviteListTable;
