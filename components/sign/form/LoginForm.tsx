import { Controller, useForm } from 'react-hook-form';
import { BUTTON_TEXT, ERROR_MESSAGE, PLACEHOLDER } from '../constants';
import { useEffect, useState } from 'react';
import { useLogin } from '../data/useLogin';
import Input from '@/components/common/Input';
import { PasswordInput } from '@/components/common';
import { useTokenRedirect } from '..';
import { useRouter } from 'next/router';

export const LoginForm = () => {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { control, handleSubmit, watch, setError } = useForm({
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
  const watchedFields = watch(['email', 'password']);

  // useTokenRedirect(data?.data?.accessToken);

  useEffect(() => {
    if (error) {
      setError('email', { type: 'invalid', message: ERROR_MESSAGE.emailCheck });
      setError('password', {
        type: 'invalid',
        message: ERROR_MESSAGE.passwordCheck,
      });
    }
  }, [error, setError]);

  useEffect(() => {
    const areFieldsFilled = watchedFields.every((field) => field);
    setIsButtonDisabled(!areFieldsFilled);
  }, [watchedFields]);

  useEffect(() => {
    if (data?.data?.accessToken) {
      router.replace('/boards');
    }
  }, [data?.data?.accessToken]);

  return (
    <form onSubmit={handleSubmit(login)}>
      <div>
        <label>이메일</label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: ERROR_MESSAGE.emailRequired,
            pattern: {
              value: /\S+@\S+\.\S+/,
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
      <div>
        <label>비밀번호</label>
        <Controller
          control={control}
          name="password"
          rules={{ required: ERROR_MESSAGE.passwordRequired }}
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
      <button type="submit" disabled={isButtonDisabled}>
        {BUTTON_TEXT.login}
      </button>
    </form>
  );
};
