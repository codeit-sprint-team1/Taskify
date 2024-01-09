import Image from 'next/image';
import React from 'react';
import arrowBackIcon from '@/public/icons/arrowBackIcon.svg';

function ArrowBackButton() {
  return (
    <div className="flex items-center space-x-8pxr">
      <button type="button">
        <Image
          src={arrowBackIcon}
          alt="뒤로가기 아이콘"
          width={20}
          height={20}
        />
      </button>
      <span className="font-medium">돌아가기</span>
    </div>
  );
}

export default ArrowBackButton;
