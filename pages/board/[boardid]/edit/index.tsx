import BoardEditLayout from '@/page-layout/BoardEditLayout';
import { InviteListTable, MembersTable, NameEditForm } from '@/components';
import React from 'react';

function BoardEditPage() {
  return (
    <BoardEditLayout
      nameEditForm={<NameEditForm />}
      membersTable={<MembersTable />}
      inviteListTable={<InviteListTable />}
    ></BoardEditLayout>
  );
}

export default BoardEditPage;
