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
    <div className="flex flex-col w-620pxr gap-y-40pxr">
      <ArrowBackButton />
      {nameEditForm}
      {membersTable}
      {inviteListTable}
    </div>
  );
}

export default BoardEditLayout;
