import { Controller, useForm } from 'react-hook-form';
import {
  BUTTON_TEXT,
  ERROR_MESSAGE,
  PLACEHOLDER,
  VALID_EMAIL_REG,
  VALID_PASSWORD_REG,
} from '../constants';
import { useEffect, useState } from 'react';
import { Button, PasswordInput, Input } from '@/components';
import { useLogin, useTokenRedirect } from '../data';

export const LoginForm = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
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

  const watchedFields = watch(['email', 'password']);

  useTokenRedirect(data?.accessToken);

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
    const hasNoErrors = Object?.keys(errors).length === 0;

    setIsButtonDisabled(!(areFieldsFilled && hasNoErrors));
  }, [watchedFields, errors]);

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
      <div>
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
        disabled={isButtonDisabled}
        size="sign"
        variant={isButtonDisabled ? 'inactive' : 'primary'}
      >
        {BUTTON_TEXT.login}
      </Button>
    </form>
  );
};