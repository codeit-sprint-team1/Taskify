import React from 'react';
import addIcon from '@/public/icons/add-icon.svg';
import Image from 'next/image';
import { Button, Input } from '..';

function MypageProfile() {
  return (
    <div className="max-w-[620px] space-y-32pxr p-28pxr">
      <h1 className="text-24pxr font-bold mobile:text-20pxr">프로필</h1>
      <div className="flex flex-col gap-24pxr">
        <div className="flex gap-16pxr mobile:block mobile:space-y-24pxr">
          <div className="flex-center bg-gray10 w-190pxr h-190pxr border mobile:w-100pxr mobile:h-100pxr">
            <Image
              src={addIcon}
              alt="추가하기 아이콘"
              className="w-30pxr mobile:w-20pxr"
            />
          </div>
          <div className="flex flex-col gap-16pxr grow">
            <Input label="이메일" value="이메일밸류" />
            <Input label="닉네임" value="닉네임밸류" />
          </div>
        </div>
        <Button
          variant="primary"
          size="desktop"
          className="self-end mobile:w-84pxr mobile:h-28pxr"
        >
          변경
        </Button>
      </div>
    </div>
  );
}

export default MypageProfile;
