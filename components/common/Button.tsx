import React, { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'modal' | 'inactive';
type Size = 'desktop' | 'tablet' | 'mobile' | 'large' | 'small' | 'sign';

interface ButtonProps {
  variant: Variant;
  type?: 'submit' | undefined;
  size: Size;
  className?: String;
  onClick?: () => void;
  children: ReactNode;
}

function Button({
  variant,
  type,
  size,
  className,
  onClick,
  children,
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
      combinedClassName += ' py-[0.4375rem] px-[1.8125rem] text-sm ';
      break;
    }
    case 'tablet': {
      combinedClassName += ' py-[0.375rem] px-[1.4375rem] text-sm ';
      break;
    }
    case 'mobile': {
      combinedClassName += ' py-[0.4375rem] px-[2.3125rem] text-xs ';
      break;
    }
    case 'large': {
      combinedClassName += ' py-[0.4375rem] px-[1.8125rem] text-sm';
      break;
    }
    case 'small': {
      combinedClassName += ' py-[0.4375rem] px-[0.5625rem] text-xs w-[3.25rem]';
      break;
    }
    case 'sign': {
      combinedClassName += ' py-[0.875rem] px-[14.75rem] text-lg ';
      break;
    }
  }

  return (
    <button
      className={`${combinedClassName} ${className}`}
      type={type ? type : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
