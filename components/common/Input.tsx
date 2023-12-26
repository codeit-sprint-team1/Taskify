import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  forwardRef,
} from 'react';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  hasError?: boolean;
  helperText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
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
        <div className="font-medium mb-10pxr text-18pxr text-gray70 mobile:text-16pxr ">
          <label>{label}</label>
          {required && <span className="text-violet">*</span>}
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
            } px-16pxr py-15pxr tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 focus:border-violet outline-0 h-50pxr`}
          />
        </div>
        {hasError && (
          <p className="text-14pxr text-red mt-8pxr">{helperText}</p>
        )}
      </div>
    );
  }
);

export default Input;
