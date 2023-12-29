import React, { useState } from 'react';
import { Button, Modal, PasswordInput } from '..';
import { Controller, useForm } from 'react-hook-form';
import { ERROR_MESSAGE, VALID_PASSWORD_REG } from '../sign/constants';
import { axiosAuthInstance } from '@/utils';
import axios, { AxiosError } from 'axios';
import useToggle from '@/hooks/useToggle';

interface FormValues {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

function PasswordModify() {
  const [axiosErrorMessage, setAxiosErrorMessage] = useState('');
  const { handleSubmit, control, watch } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const { isOn, toggle } = useToggle();

  const modifyPassword = async () => {
    let res;
    try {
      res = await axiosAuthInstance.put(`auth/password`, {
        password: watch('currentPassword'),
        newPassword: watch('newPassword'),
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorMessage = (axiosError.response.data as { message: string })
            .message;
          setAxiosErrorMessage(errorMessage);
          errorMessage === ERROR_MESSAGE.passwordDifferent ? toggle() : null;
        }
      }
    }
  };

  const onSubmit = () => {
    modifyPassword();
  };

  const isFulled =
    watch('currentPassword') &&
    watch('newPassword') &&
    watch('newPasswordConfirm');

  return (
    <div className="max-w-[620px] space-y-32pxr p-28pxr">
      <h1 className="text-24pxr font-bold mobile:text-20pxr">비밀번호 변경</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-20pxr"
      >
        <Controller
          control={control}
          name="currentPassword"
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="현재 비밀번호"
              placeholder="현재 비밀번호 입력"
            />
          )}
        />

        <Controller
          control={control}
          name="newPassword"
          rules={{
            pattern: {
              value: VALID_PASSWORD_REG,
              message: ERROR_MESSAGE.passwordInvalid,
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              label="새 비밀번호"
              placeholder="새 비밀번호 입력"
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="newPasswordConfirm"
          rules={{
            validate: {
              isMatch: (value) => {
                if (value !== watch('newPassword')) {
                  return ERROR_MESSAGE.confirmedPasswordNotMatch;
                }
                return true;
              },
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              id="newPasswordConfirm"
              label="새 비밀번호 확인"
              placeholder="새 비밀번호 입력"
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Button
          variant={isFulled ? 'primary' : 'inactive'}
          size="desktop"
          className="self-end mobile:w-84pxr mobile:h-28pxr"
          disabled={!isFulled}
          onClick={onSubmit}
        >
          변경
        </Button>
      </form>
      <Modal isOpen={isOn} onSubmit={toggle}>
        <div className="flex-center flex-col space-y-20pxr">
          <p className="pt-70pxr pb-25pxr">{axiosErrorMessage}</p>
          <Button
            variant="primary"
            size="modal"
            className="self-end"
            onClick={toggle}
          >
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default PasswordModify;
