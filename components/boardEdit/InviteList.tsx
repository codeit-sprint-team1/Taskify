import { Invitations } from '@/types/invitations';
import React from 'react';
import { Button } from '..';
import Image from 'next/image';
import imageTest from '@/public/icons/invitations-not-valid-icon.svg';

interface InviteListProps {
  invitations: Invitations[] | undefined;
  onDelete: (invitationId: number) => void;
}

function InviteList({ invitations, onDelete }: InviteListProps) {
  if (!invitations) return;
  console.log(invitations.length);
  return (
    <div className="space-y-32pxr">
      {invitations?.length === 0 ? (
        <div className="flex-center flex-col">
          <Image src={imageTest} alt="test" />
          <p className="text-gray40">
            아직 초대한 유저가 없어요! 이메일로 초대해보세요.
          </p>
        </div>
      ) : (
        invitations?.map((invitation) => (
          <div
            key={invitation.id}
            className="flex justify-between items-center"
          >
            <p>{invitation.invitee.email}</p>
            <Button
              onClick={() => onDelete(invitation.id)}
              variant="secondary"
              size="small"
              className="mobile:py-7pxr mobile:px-9pxr mobile:w-52pxr"
            >
              취소
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

export default InviteList;
