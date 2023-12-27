import React from 'react';
import addIcon from '@/public/icons/add-icon.svg';
import Image from 'next/image';
import { Button, Input } from '..';

function MypageProfile() {
  return (
    <div className="w-620pxr space-y-32pxr p-28pxr">
      <h1 className="text-24pxr font-bold">프로필</h1>
      <div className="flex flex-col gap-24pxr">
        <div className="flex gap-16pxr">
          <div className="flex-center bg-gray10 w-190pxr h-190pxr border">
            <Image src={addIcon} alt="추가하기 아이콘" />
          </div>
          <div className="flex flex-col gap-16pxr grow">
            <Input label="이메일" value="이메일밸류" />
            <Input label="닉네임" value="닉네임밸류" />
          </div>
        </div>
        <Button variant="primary" size="desktop" className="self-end">
          변경
        </Button>
      </div>
    </div>
  );
}

export default MypageProfile;
