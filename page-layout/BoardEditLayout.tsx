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
    <div className="p-30pxr w-620pxr space-y-24pxr">
      {nameEditForm}
      {membersTable}
      {inviteListTable}
    </div>
  );
}

export default BoardEditLayout;
