import { Controller, useForm } from 'react-hook-form';
import {
  ERROR_MESSAGE,
  PLACEHOLDER,
  VALID_EMAIL_REG,
  VALID_PASSWORD_REG,
} from '../constants';
import { Input } from '../input/Input';
import { useCheckEmailDuplicate, useSignUp, useTokenRedirect } from '../data';
import { PasswordInput } from '../input/PasswordInput';
import { axiosInstance } from '@/utils';
export const SignUpForm = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: '',
      nickname: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { execute: signUp, data } = useSignUp({
    email: watch('email'),
    password: watch('password'),
    nickname: watch('nickname'),
  });

  console.log(data);
  // useTokenRedirect(data?.data.accessToken);
  return (
    <form onSubmit={handleSubmit(signUp)}>
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
        <label>닉네임</label>
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
              placeholder={PLACEHOLDER.email}
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              maxLength={10}
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
      <div>
        <label>비밀번호 확인</label>
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
      <button type="submit">가입하기</button>
    </form>
  );
};
