import React, { ReactNode } from 'react';

type ViewType = 'desktop' | 'tablet' | 'mobile';

interface ButtonProps {
  children: ReactNode;
  viewType: ViewType;
  onClick?: () => void;
}

function Button({ children, viewType, onClick }: ButtonProps) {
  let className;
  switch (viewType) {
    case 'desktop':
      className =
        'px-[1.8125rem] py-[0.4375rem] bg-violet text-sm font-medium border rounded text-white';
      break;
    case 'tablet':
      className =
        'px-[0.38rem] py-6 bg-violet text-sm font-medium border rounded text-white';
      break;
    case 'mobile':
      className =
        'px-36 py-7 bg-violet text-xs font-medium border rounded text-white';
  }
  return <button className={className}>{children}</button>;
}

export default Button;
