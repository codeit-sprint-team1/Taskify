import Image from 'next/image';
import React from 'react';
import sampleIcon from '@/public/icons/crown-icon.svg';

function CommentList() {
  return (
    <div className="flex gap-10pxr">
      <Image
        src={sampleIcon}
        alt="프로필아이콘"
        className="w-34pxr h-34pxr rounded-full bg-green flex-center"
      />
      <div className="flex flex-col gap-6pxr">
        <div className="space-x-8pxr">
          <span className="font-semibold text-14pxr">정만철(사용자이름)</span>
          <span className="text-gray40 text-12pxr">2024.01.02 23:42</span>
        </div>
        <p className="text-14pxr">오늘안에 CCC 까지 만들 수 있을까요?</p>
        <div className="flex gap-12pxr">
          <button className="text-gray40 text-12pxr underline" type="button">
            수정
          </button>
          <button className="text-gray40 text-12pxr underline" type="button">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
