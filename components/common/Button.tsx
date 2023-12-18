import React, { ReactNode } from 'react';

type ViewType = 'desktop' | 'tablet' | 'mobile';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className: string;
}

function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}

export default Button;
