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
    <div
      // className="flex flex-col max-w-620pxr p-30pxr gap-y-40pxr"
      style={{
        maxWidth: '620px',
        gap: '40px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ArrowBackButton />
      {nameEditForm}
      {membersTable}
      {inviteListTable}
    </div>
  );
}

export default BoardEditLayout;
