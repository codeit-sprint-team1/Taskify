import React from 'react';
import { Button } from '..';
import Image from 'next/image';
import inviteIcon from '@/public/icons/inviteIcon.svg';

function InviteListTable() {
  const testArr = Array.from({ length: 5 }, (v, i) => i);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-24pxr font-bold">초대 내역</h1>
        <div className="flex items-center space-x-22pxr">
          <p className="font-14pxr">1 페이지 중 1</p>
          <Button variant="secondary" size="xsmall">
            페이지네이션
          </Button>
          <Button variant="primary" size="mobile" className="w-105pxr">
            <div className="flex gap-x-8pxr">
              <Image src={inviteIcon} alt="초대하기 아이콘" />
              초대하기
            </div>
          </Button>
        </div>
      </div>
      <p className="text-16pxr text-gray40 py-24pxr">이메일</p>
      <div className="space-y-32pxr">
        {testArr.map((item) => {
          return (
            <div key={item} className="flex justify-between">
              <p>example@codeit.com</p>
              <Button variant="secondary" size="small">
                삭제
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InviteListTable;
