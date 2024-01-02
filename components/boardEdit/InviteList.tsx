import { Invitations } from '@/types/invitations';
import React from 'react';
import { Button } from '..';

interface InviteListProps {
  invitations: Invitations[] | undefined;
  onDelete: (invitationId: number) => void;
}

function InviteList({ invitations, onDelete }: InviteListProps) {
  if (!invitations) return;
  return (
    <div className="space-y-32pxr">
      {invitations?.map((invitation) => {
        return (
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
        );
      })}
    </div>
  );
}

export default InviteList;
