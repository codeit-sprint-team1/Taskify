import React, { ReactNode } from 'react';

interface BoardEditLayoutProps {
  nameEditForm: ReactNode;
  membersTable: ReactNode;
}

function BoardEditLayout({ nameEditForm, membersTable }: BoardEditLayoutProps) {
  return (
    <div className="p-30pxr w-620pxr space-y-24pxr">
      {nameEditForm}
      {membersTable}
    </div>
  );
}

export default BoardEditLayout;
