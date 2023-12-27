import MypageProfile from '@/components/mypage/MypageProfile';
import PasswordModify from '@/components/mypage/PasswordModify';
import React from 'react';

function MyPageLayout() {
  return (
    <div className="mx-20pxr mobile:mx-12pxr ">
      <MypageProfile />
      <PasswordModify />
    </div>
  );
}

export default MyPageLayout;
