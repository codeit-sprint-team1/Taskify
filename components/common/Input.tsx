import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  forwardRef,
} from 'react';

export interface InputProps {
  label?: string;
  placeholder: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  hasError?: boolean;
  helperText?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      type = 'text',
      hasError = false,
      helperText,
      onChange,
      onBlur,
      required = false,
    },
    ref
  ) => {
    return (
      <div>
        <div>
          <label className="tablet:text-lg mobile:text-base text-gray70 font-medium ">
            {label}
          </label>
          {required && (
            <span className="tablet:text-lg mobile:text-base text-violet font-medium">
              *
            </span>
          )}
        </div>
        <div className="mt-2.5">
          <input
            ref={ref}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`block w-full rounded-md border border-solid ${
              hasError ? 'border-red' : 'border-gray30'
            } px-4 py-3.5 tablet:text-base mobile:text-sm text-gray70 placeholder:text-gray40 focus:border-violet outline-0`}
          />
        </div>
        {hasError && <p className="text-sm text-red mt-2">{helperText}</p>}
      </div>
    );
  }
);

export default Input;
