import Image from 'next/image';
import React from 'react';
import sampleIcon from '@/public/icons/crown-icon.svg';

function AsigneeCard() {
  return (
    <div className="w-200pxr h-155pxr border border-gray30 rounded-lg p-16pxr flex flex-col gap-20pxr">
      <div className="flex flex-col gap-6pxr">
        <p className="text-12pxr font-semibold">담당자</p>
        <div className="flex gap-8pxr items-center">
          <Image
            src={sampleIcon}
            alt="프로필 아이콘"
            className="bg-green rounded-full flex-center w-34pxr h-34pxr"
          />
          <span className="text-14pxr">배유철</span>
        </div>
      </div>
      <div className="flex flex-col gap-6pxr">
        <p className="text-12pxr font-semibold">마감일</p>
        <p className="text-14pxr">2024.01.03 12:06</p>
      </div>
    </div>
  );
}

export default AsigneeCard;
