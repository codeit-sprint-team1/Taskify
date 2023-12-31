import { FormEvent, ReactNode } from 'react';
import {
  ModalTitle,
  ModalButton,
  Input,
  ColorChips,
  ImagePick,
  SelectDate,
} from '@/components/index';
import { Portal } from '@/components';

interface ModalMainProps {
  children?: ReactNode;
  onSubmit: (() => void) | ((e: FormEvent) => void);
  isOpen: boolean;
  classNames?: string;
}

function ModalMain({ children, isOpen, onSubmit, classNames }: ModalMainProps) {
  return (
    <Portal selector="portal" show={isOpen}>
      <div className="fixed top-[0px] left-[0px] flex-center bg-black/50 w-screen h-screen">
        <form
          onSubmit={onSubmit}
          className={`fixed flex flex-col bg-white rounded-md gap-28pxr max-w-[730px] py-28pxr px-28pxr mobile:w-327pxr mobile:px-20pxr ${classNames}`}
        >
          {children}
        </form>
      </div>
    </Portal>
  );
}

const Modal = Object.assign(ModalMain, {
  Title: ModalTitle,
  Button: ModalButton,
  Input,
  ColorChips,
  ImagePick,
  SelectDate,
});

export default Modal;
