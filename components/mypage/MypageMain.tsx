import MyPageLayout from '@/page-layout/MyPageLayout';
import React from 'react';
import { MypageProfile, PasswordModify } from '..';

function MypageMain() {
  return (
    <MyPageLayout
      passwordModify={<PasswordModify />}
      mypageProfile={<MypageProfile />}
    />
  );
}

export default MypageMain;
