import React from 'react';
import { Card } from '@/types/cards';
import { ProfileImage } from '@/components';

type AsigneeCardProps = Partial<Card>;

function AsigneeCard({ dueDate, assignee }: AsigneeCardProps) {
  return (
    <div className="w-200pxr h-155pxr border border-gray30 rounded-lg p-16pxr flex flex-col gap-20pxr mobile:w-full mobile:flex-row mobile:items-center mobile:h-full mobile:p-12pxr mobile:gap-60pxr">
      <div className="flex flex-col gap-6pxr mobile:gap-4pxr">
        <p className="text-12pxr font-semibold mobile:text-10pxr">담당자</p>
        {assignee && (
          <div className="flex gap-8pxr items-center">
            <ProfileImage
              src={assignee.profileImageUrl}
              userId={assignee.id}
              name={assignee.nickname}
            />
            <span className="text-14pxr mobile:text-12pxr">
              {assignee?.nickname}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6pxr mobile:gap-10pxr">
        <p className="text-12pxr font-semibold mobile:text-10pxr">마감일</p>
        {dueDate && <p className="text-14pxr mobile:text-12pxr">{dueDate}</p>}
      </div>
    </div>
  );
}

export default AsigneeCard;
