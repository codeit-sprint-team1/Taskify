import Image from 'next/image';
import React from 'react';
import sampleIcon from '@/public/icons/crown-icon.svg';

function AsigneeCard() {
  return (
    <div className="w-200pxr h-155pxr border border-gray30 rounded-lg p-16pxr flex flex-col gap-20pxr tablet:w-180pxr mobile:w-full mobile:flex-row mobile:items-center mobile:h-full mobile:p-12pxr mobile:space-x-60pxr">
      <div className="flex flex-col gap-6pxr mobile:gap-4pxr">
        <p className="text-12pxr font-semibold mobile:text-10pxr">담당자</p>
        <div className="flex gap-8pxr items-center">
          <Image
            src={sampleIcon}
            alt="프로필 아이콘"
            className="bg-green rounded-full flex-center w-34pxr h-34pxr mobile:w-26pxr mobile:h-26pxr"
          />
          <span className="text-14pxr mobile:text-12pxr">배유철</span>
        </div>
      </div>
      <div className="flex flex-col gap-6pxr mobile:gap-10pxr">
        <p className="text-12pxr font-semibold mobile:text-10pxr">마감일</p>
        <p className="text-14pxr mobile:text-12pxr">2024.01.03 12:06</p>
      </div>
    </div>
  );
}

export default AsigneeCard;
