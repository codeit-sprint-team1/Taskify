import { Controller, useForm } from 'react-hook-form';
import {
  BUTTON_TEXT,
  ERROR_MESSAGE,
  PLACEHOLDER,
  VALID_EMAIL_REG,
  VALID_PASSWORD_REG,
} from '../constants';
import { useEffect } from 'react';
import { Button, PasswordInput, Input } from '@/components';
import { useLogin, useTokenRedirect } from '../data';
import { useUserInfo } from '@/store/memos';

export default function LoginForm() {
  const { setUserInfo } = useUserInfo();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isValid },
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });
  const {
    execute: login,
    data,
    error,
  } = useLogin({
    email: watch('email'),
    password: watch('password'),
  });

  useTokenRedirect(data?.accessToken);

  useEffect(() => {
    if (data?.user) {
      setUserInfo(data?.user);
    }
  }, [data?.user, setUserInfo]);

  useEffect(() => {
    if (error) {
      setError('email', { type: 'invalid', message: ERROR_MESSAGE.emailCheck });
      setError('password', {
        type: 'invalid',
        message: ERROR_MESSAGE.passwordCheck,
      });
    }
  }, [error, setError]);

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="w-520pxr flex flex-col gap-16pxr mobile:mx-12pxr mobile:w-350pxr "
    >
      <div>
        <label>이메일</label>
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
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </div>
      <div className="relative">
        <label>비밀번호</label>
        <Controller
          control={control}
          name="password"
          rules={{
            required: ERROR_MESSAGE.passwordRequired,
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
      <Button
        type="submit"
        disabled={!isValid}
        size="sign"
        variant={isValid ? 'primary' : 'inactive'}
      >
        {BUTTON_TEXT.login}
      </Button>
    </form>
  );
}
