import { forwardRef, useMemo, useState } from 'react';
import EyeOnIcon from '@/public/icons/visibility_on-icon.svg';
import EyeOffIcon from '@/public/icons/visibility_off-icon.svg';
import Input, { InputProps } from '@/components/common/Input';
import Image from 'next/image';
import { Label } from '..';

type PasswordInputProps = {
  hasEyeIcon?: boolean;
} & Omit<InputProps, 'type'>;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      hasEyeIcon = false,
      value,
      placeholder,
      hasError = false,
      helperText,
      onChange,
      onBlur,
      size,
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const inputType = useMemo(
      () => (isPasswordVisible ? 'text' : 'password'),
      [isPasswordVisible]
    );
    const eyeIconPosition = size === 'sm' ? 'top-47pxr' : 'top-50pxr';
    const EyeIcon = useMemo(
      () => (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className={`absolute right-15pxr ${eyeIconPosition}`}
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
      <div className="relative">
        <Input
          ref={ref}
          label={label}
          size={size}
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

export default PasswordInput;
