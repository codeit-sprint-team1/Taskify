import Image from 'next/image';
import React from 'react';
import arrowLeftIcon from '@/public/icons/arrowLeftIcon.svg';
import arrowRightIcon from '@/public/icons/arrowRightIcon.svg';

function PagenationButton() {
  return (
    <div className="flex">
      <button
        className="w-40pxr h-40pxr flex-center rounded-t rounded-l border border-gray30"
        type="button"
      >
        <Image src={arrowLeftIcon} alt="왼쪽화살표 아이콘" />
      </button>
      <button
        className="w-40pxr h-40pxr flex-center rounded-r rounded-b border border-gray30"
        type="button"
      >
        <Image src={arrowRightIcon} alt="오른쪽화살표 아이콘" />
      </button>
    </div>
  );
}

export default PagenationButton;
