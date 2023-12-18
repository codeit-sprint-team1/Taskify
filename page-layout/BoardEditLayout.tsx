import React, { ReactNode } from 'react';

interface BoardEditLayoutProps {
  nameEditForm: ReactNode;
}

function BoardEditLayout({ nameEditForm }: BoardEditLayoutProps) {
  return <div className="flex-center">{nameEditForm}</div>;
}

export default BoardEditLayout;
