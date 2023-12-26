import React from 'react';
import { Button } from '..';
import Image from 'next/image';
import inviteIcon from '@/public/icons/inviteIcon.svg';
import useGetInvitaions from './data/useGetInvitaions';
import { axiosAuthInstance } from '@/utils';

interface InviteListTableProps {
  boardid: number;
}

function InviteListTable({ boardid }: InviteListTableProps) {
  const { execute, data } = useGetInvitaions({ boardid, page: 1, size: 4 });
  const invitations = data?.invitations;
  const handleDeleteInvitation = async (invitationId: number) => {
    try {
      const res = await axiosAuthInstance.delete(
        `dashboards/${boardid}/invitations/${invitationId}`
      );
      if (res?.status === 204) alert('성공적으로 취소 되었습니다!'); // toastify로 교체
      execute();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-30pxr">
      <div className="flex justify-between">
        <h1 className="font-bold text-24pxr">초대 내역</h1>
        <div className="flex items-center space-x-22pxr">
          <p className="font-14pxr">1 페이지 중 1</p>
          <Button variant="secondary" size="xsmall">
            페이지네이션
          </Button>
          <Button variant="primary" size="mobile" className="w-105pxr">
            <div className="flex gap-x-8pxr">
              <Image src={inviteIcon} alt="초대하기 아이콘" />
              초대하기
            </div>
          </Button>
        </div>
      </div>
      <p className="text-16pxr text-gray40 py-24pxr">이메일</p>
      <div className="space-y-32pxr">
        {invitations?.map((invitation) => {
          return (
            <div key={invitation.id} className="flex justify-between">
              <p>{invitation.invitee.email}</p>
              <Button
                onClick={() => handleDeleteInvitation(invitation.id)}
                variant="secondary"
                size="small"
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