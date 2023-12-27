import ArrowBackButton from '@/components/boardEdit/ArrowBackButton';
import React, { ReactNode } from 'react';

interface BoardEditLayoutProps {
  nameEditForm: ReactNode;
  membersTable: ReactNode;
  inviteListTable: ReactNode;
}

function BoardEditLayout({
  nameEditForm,
  membersTable,
  inviteListTable,
}: BoardEditLayoutProps) {
  return (
    <div className="flex flex-col max-w-[620px] min-w-[375px] gap-y-40pxr mobile:gap-y-11pxr">
      {nameEditForm}
      {membersTable}
      {inviteListTable}
    </div>
  );
}

export default BoardEditLayout;
