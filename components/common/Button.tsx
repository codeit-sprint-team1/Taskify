import React, { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'modal' | 'inactive';
type Size =
  | 'desktop'
  | 'tablet'
  | 'mobile'
  | 'xsmall'
  | 'small'
  | 'sign'
  | 'responsive'
  | 'modal';

interface ButtonProps {
  variant: Variant;
  type?: 'submit' | 'button' | undefined;
  size: Size;
  className?: String;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

function Button({
  variant,
  type = 'button',
  size,
  className,
  onClick,
  children,
  disabled,
}: ButtonProps) {
  let combinedClassName = '';
  switch (variant) {
    case 'primary': {
      combinedClassName =
        'border-none rounded-md flex-center font-medium text-white bg-violet';
      break;
    }
    case 'secondary': {
      combinedClassName =
        'border border-gray30 rounded-md flex-center font-medium text-violet bg-white';
      break;
    }
    case 'modal': {
      combinedClassName =
        'border border-gray30 rounded-md flex-center font-medium text-gray50 bg-white';
      break;
    }
    case 'inactive': {
      combinedClassName =
        'border-none rounded-md flex-center font-medium text-white bg-gray40';
      break;
    }
  }

  switch (size) {
    case 'desktop': {
      combinedClassName +=
        ' desktop:py-7pxr desktop:px-29pxr desktop:text-14pxr ';
      break;
    }
    case 'tablet': {
      combinedClassName += ' tablet:py-6pxr tablet:px-23pxr tablet:text-14pxr ';
      break;
    }
    case 'mobile': {
      combinedClassName += ' mobile:py-7pxr mobile:x-37pxr mobile:text-12pxr ';
      break;
    }
    case 'responsive': {
      combinedClassName +=
        ' desktop:py-7pxr desktop:px-29pxr desktop:text-14pxr tablet:py-6pxr tablet:px-23pxr tablet:text-14pxr mobile:py-7pxr mobile:px-37pxr mobile:text-12pxr';
    }
    case 'modal': {
      combinedClassName +=
        ' text-16pxr w-120pxr h-48pxr py-14pxr px-14pxr mobile:text-14pxr mobile:w-138pxr mobile:h-42pxr mobile:py-12pxr mobile:px-12pxr';
    }
    case 'small': {
      combinedClassName += ' py-7pxr px-29pxr text-14pxr';
      break;
    }
    case 'xsmall': {
      combinedClassName += ' py-7pxr px-29pxr text-12pxr';
      break;
    }
    case 'sign': {
      combinedClassName += ' py-14pxr px-236pxr w-full text-18pxr ';
      break;
    }
  }

  return (
    <button
      className={`${combinedClassName} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
