import { ReactNode } from 'react';

interface ModalTitleProps {
  children: ReactNode;
}

export default function ModalTitle({ children }: ModalTitleProps) {
  return (
    <div
      className={`font-bold text-24pxr my-4pxr w-484pxr mobile:w-287pxr mobile:text-20pxr`}
    >
      {children}
    </div>
  );
}
