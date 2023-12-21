import { ReactNode } from 'react';
import { Button } from '@/components/index';

interface ModalButtonProps {
  children: ReactNode;
  disabled: boolean;
  onCancle: () => void;
}

export default function ModalButton({
  children,
  onCancle,
  disabled,
}: ModalButtonProps) {
  return (
    <div className="flex justify-end w-full gap-12pxr">
      <Button variant="modal" size="modal" onClick={onCancle}>
        취소
      </Button>
      <Button
        disabled={disabled}
        variant={disabled ? 'inactive' : 'primary'}
        size="modal"
        type="submit"
      >
        {children}
      </Button>
    </div>
  );
}
