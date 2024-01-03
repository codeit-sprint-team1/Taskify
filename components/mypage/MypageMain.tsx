import MyPageLayout from '@/page-layout/MyPageLayout';
import React from 'react';
import { ArrowBackButton, MypageProfile, PasswordModify } from '..';
import Link from 'next/link';
import { useRouter } from 'next/router';

function MypageMain() {
  const router = useRouter();
  return (
    <>
      <div className="w-130pxr p-20pxr">
        <div
          className="cursor-pointer"
          onClick={() => router.push('/mydashboard')}
        >
          <ArrowBackButton />
        </div>
      </div>
      <MyPageLayout
        passwordModify={<PasswordModify />}
        mypageProfile={<MypageProfile />}
      />
    </>
  );
}

export default MypageMain;
