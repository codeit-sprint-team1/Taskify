import React, { useState } from 'react';
import { Button } from '..';
import Image from 'next/image';
import inviteIcon from '@/public/icons/inviteIcon.svg';
import useGetInvitaions from './data/useGetInvitaions';
import { axiosAuthInstance } from '@/utils';
import PagenationButton from '../common/PaginationButton';

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
      if (res?.status === 204) alert('성공적으로 취소 되었습니다!');
      execute();
    } catch (error) {
      console.error(error);
    }
  };

  if (!totalCount) return;
  const totalPages = Math.ceil(totalCount / size);

  const handleClickRight = () => {
    setPage(page + 1);
  };

  const handleClickLeft = () => {
    setPage(page - 1);
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
          >
            <div className="flex gap-x-8pxr">
              <Image src={inviteIcon} alt="초대하기 아이콘" />
              초대하기
            </div>
          </Button>
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
      <div className="space-y-32pxr">
        {invitations?.map((invitation) => {
          return (
            <div key={invitation.id} className="flex justify-between">
              <p>{invitation.invitee.email}</p>
              <Button
                onClick={() => handleDeleteInvitation(invitation.id)}
                variant="secondary"
                size="small"
                className="mobile:py-7pxr mobile:px-9pxr mobile:w-52pxr"
              >
                취소
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InviteListTable;
