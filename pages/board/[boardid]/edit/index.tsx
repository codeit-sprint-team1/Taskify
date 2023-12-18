import NameEditForm from '@/components/boardEdit/NameEditForm';
import BoardEditLayout from '@/page-layout/BoardEditLayout';
import React from 'react';

function BoardEditPage() {
  return <BoardEditLayout nameEditForm={<NameEditForm />}></BoardEditLayout>;
}

export default BoardEditPage;
