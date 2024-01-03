import MyPageLayout from '@/page-layout/MyPageLayout';
import React from 'react';
import { ArrowBackButton, MypageProfile, PasswordModify } from '..';
import Link from 'next/link';

function MypageMain() {
  return (
    <div>
      <div className="w-130pxr p-20pxr">
        <Link href={`/mydashboard`}>
          <ArrowBackButton />
        </Link>
      </div>
      <MyPageLayout
        passwordModify={<PasswordModify />}
        mypageProfile={<MypageProfile />}
      />
    </div>
  );
}

export default MypageMain;
