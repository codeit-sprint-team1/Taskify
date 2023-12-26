import Image from 'next/image';
import React from 'react';
import arrowLeftIcon from '@/public/icons/arrowLeftIcon.svg';
import arrowRightIcon from '@/public/icons/arrowRightIcon.svg';

interface PaginationButtonProps {
  onClickRight: () => void;
  onClickLeft: () => void;
  totalPages: number;
  page: number;
}

function PaginationButton({
  onClickRight,
  onClickLeft,
  totalPages,
  page,
}: PaginationButtonProps) {
  const disabledButton = 'border border-gray30';
  const activeButton = 'border border-black bg-violet';
  return (
    <div className="flex">
      <button
        className={
          page === 1
            ? `w-40pxr h-40pxr flex-center rounded-l ${disabledButton}`
            : `w-40pxr h-40pxr flex-center rounded-l ${activeButton}`
        }
        type="button"
        onClick={onClickLeft}
        disabled={page === 1}
      >
        <Image src={arrowLeftIcon} alt="왼쪽화살표 아이콘" />
      </button>
      <button
        className={
          totalPages <= page
            ? `w-40pxr h-40pxr flex-center rounded-r ${disabledButton}`
            : `w-40pxr h-40pxr flex-center rounded-r ${activeButton}`
        }
        type="button"
        onClick={onClickRight}
        disabled={totalPages <= page}
      >
        <Image
          src={arrowRightIcon}
          alt="오른쪽화살표 아이콘"
          className={totalPages <= page ? 'fill-gray30' : 'fill-violet'}
        />
      </button>
    </div>
  );
}

export default PaginationButton;
