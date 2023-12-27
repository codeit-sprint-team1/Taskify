import React from 'react';
import { Button, Input } from '..';

function PasswordModify() {
  return (
    <div className="w-620pxr space-y-32pxr p-28pxr">
      <h1 className="text-24pxr font-bold">비밀번호 변경</h1>
      <div className="flex flex-col gap-20pxr">
        <Input
          label="현재 비밀번호"
          value="현재 비밀번호값"
          placeholder="현재 비밀번호 입력"
        />
        <Input
          label="새 비밀번호"
          value="새 비밀번호값"
          placeholder="새 비밀번호 입력"
        />
        <Input
          label="새 비밀번호 확인"
          value="새 비밀번호 확인값"
          placeholder="새 비밀번호 입력"
        />
        <Button variant="primary" size="desktop" className="self-end">
          변경
        </Button>
      </div>
    </div>
  );
}

export default PasswordModify;
