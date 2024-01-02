import React, { useState } from 'react';
import { Button, InviteModal } from '..';
import Image from 'next/image';
import inviteIcon from '@/public/icons/inviteIcon.svg';
import useGetInvitaions from './data/useGetInvitaions';
import { axiosAuthInstance } from '@/utils';
import PagenationButton from '../common/PaginationButton';
import useToggle from '@/hooks/useToggle';
import InviteList from './InviteList';

interface InviteListTableProps {
  boardid: number;
}

function InviteListTable({ boardid }: InviteListTableProps) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);
  const { execute, data } = useGetInvitaions({ boardid, page, size });
  const totalCount = data?.totalCount;
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
  console.log(invitations?.length);

  const { isOn, toggle } = useToggle();

  if (!totalCount) return null;
  const totalPages = Math.ceil(totalCount / size);

  const handleClickRight = () => {
    setPage(page + 1);
  };

  const handleClickLeft = () => {
    setPage(page - 1);
  };

  const handleCancel = () => {
    toggle();
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
          <InviteModal isOpen={isOn} onCancel={handleCancel} />
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
      {invitations?.length === 0 ? (
        <p>초대한 사람이 없네요 이메일로 초대해보세요!</p>
      ) : (
        <InviteList
          invitations={invitations}
          onDelete={handleDeleteInvitation}
        />
      )}
    </div>
  );
}

export default InviteListTable;
