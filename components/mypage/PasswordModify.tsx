import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Input, PasswordInput } from '..';
import { useForm } from 'react-hook-form';

function PasswordModify() {
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const [currentPassword, setCurrentPassword] = useState<string | null>('');
  const [newPassword, setNewPassword] = useState<string | null>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string | null>(
    ''
  );

  const onSubmit = () => {};

  return (
    <div className="max-w-[620px] space-y-32pxr p-28pxr">
      <h1 className="text-24pxr font-bold mobile:text-20pxr">비밀번호 변경</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-20pxr"
      >
        <PasswordInput
          label="현재 비밀번호"
          value={currentPassword}
          placeholder="현재 비밀번호 입력"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCurrentPassword(e.target.value)
          }
        />
        <PasswordInput
          label="새 비밀번호"
          value={newPassword}
          placeholder="새 비밀번호 입력"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
        />
        <PasswordInput
          label="새 비밀번호 확인"
          value={newPasswordConfirm}
          placeholder="새 비밀번호 입력"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPasswordConfirm(e.target.value)
          }
        />
        <Button
          variant="primary"
          size="desktop"
          className="self-end mobile:w-84pxr mobile:h-28pxr"
        >
          변경
        </Button>
      </form>
    </div>
  );
}

export default PasswordModify;
