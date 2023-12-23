import { Controller, useForm } from 'react-hook-form';
import {
  BUTTON_TEXT,
  ERROR_MESSAGE,
  PLACEHOLDER,
  SUCCESS_JOIN_MESSAGE,
  TERMS_OF_USE_MESSAGE,
  VALID_EMAIL_REG,
  VALID_PASSWORD_REG,
} from '../constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button, PasswordInput, Input } from '@/components';
import { useSignUp, useTokenRedirect } from '../data';

export default function SignUpForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: '',
      nickname: '',
      termsOfUse: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const {
    execute: signUp,
    error,
    data,
  } = useSignUp({
    email: watch('email'),
    password: watch('password'),
    nickname: watch('nickname'),
  });

  const isEmailAlreadyExist = error?.response?.status === 409;

  useTokenRedirect(data?.accessToken);

  useEffect(() => {
    if (data) {
      alert(SUCCESS_JOIN_MESSAGE);
      router.replace('login');
    }
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit(signUp)}
      className="w-520pxr flex flex-col gap-16pxr mobile:mx-12pxr mobile:w-350pxr"
    >
      <div>
        <label className="font-small mb-8pxr">이메일</label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: ERROR_MESSAGE.emailRequired,
            pattern: {
              value: VALID_EMAIL_REG,
              message: ERROR_MESSAGE.emailInvalid,
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder={PLACEHOLDER.email}
              hasError={Boolean(fieldState.error) || isEmailAlreadyExist}
              helperText={
                isEmailAlreadyExist
                  ? ERROR_MESSAGE.emailAlreadyExist
                  : fieldState.error?.message
              }
            />
          )}
        />
      </div>
      <div>
        <label className="font-small mb-8pxr">닉네임</label>
        <Controller
          control={control}
          name="nickname"
          rules={{
            required: ERROR_MESSAGE.nicknameRequired,
            validate: {
              maxLength: (value) => {
                if (value.length > 10) {
                  return ERROR_MESSAGE.nicknameLimit;
                }
                return true;
              },
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder={PLACEHOLDER.nickname}
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </div>
      <div className="relative">
        <label className="font-small mb-8pxr">비밀번호</label>
        <Controller
          control={control}
          name="password"
          rules={{
            required: ERROR_MESSAGE.passwordInvalid,
            pattern: {
              value: VALID_PASSWORD_REG,
              message: ERROR_MESSAGE.passwordInvalid,
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              hasEyeIcon
              placeholder={PLACEHOLDER.password}
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </div>
      <div className="relative">
        <label className="font-small mb-8pxr">비밀번호 확인</label>
        <Controller
          control={control}
          name="confirmedPassword"
          rules={{
            validate: {
              isMatch: (value) => {
                if (value !== watch('password')) {
                  return ERROR_MESSAGE.confirmedPasswordNotMatch;
                }
                return true;
              },
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              hasEyeIcon
              placeholder={PLACEHOLDER.confirmedPassword}
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="termsOfUse"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <div className="flex gap-5pxr">
              <input
                type="checkbox"
                onChange={onChange}
                onBlur={onBlur}
                checked={value}
                ref={ref}
              />
              <p className="mt-8pxr mb-5pxr">{TERMS_OF_USE_MESSAGE}</p>
            </div>
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={!isValid}
        size="sign"
        variant={isValid ? 'primary' : 'inactive'}
      >
        {BUTTON_TEXT.signUp}
      </Button>
    </form>
  );
}
