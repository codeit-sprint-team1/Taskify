import { forwardRef, useMemo, useState } from 'react';
import EyeOnIcon from '@/public/icons/visibility_on.svg';
import EyeOffIcon from '@/public/icons/visibility_off.svg';
import { Input, InputProps } from './Input';
import Image from 'next/image';

type PasswordInputProps = {
  hasEyeIcon?: boolean;
} & Omit<InputProps, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      hasEyeIcon = false,
      value,
      placeholder,
      hasError = false,
      helperText,
      onChange,
      onBlur,
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const inputType = useMemo(
      () => (isPasswordVisible ? 'text' : 'password'),
      [isPasswordVisible]
    );
    const EyeIcon = useMemo(
      () => (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <Image src={EyeOnIcon} alt="비밀번호 보이기 아이콘" />
          ) : (
            <Image src={EyeOffIcon} alt="비밀번호 가리기 아이콘" />
          )}
        </button>
      ),
      [isPasswordVisible]
    );

    return (
      <div>
        <Input
          ref={ref}
          value={value}
          placeholder={placeholder}
          type={inputType}
          hasError={hasError}
          helperText={helperText}
          onChange={onChange}
          onBlur={onBlur}
        />
        {hasEyeIcon && EyeIcon}
      </div>
    );
  }
);
