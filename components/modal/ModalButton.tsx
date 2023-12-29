import { ReactNode } from 'react';
import { Button } from '@/components/index';

interface ModalButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onCancel: () => void;
}

export default function ModalButton({
  children,
  onCancel,
  disabled = false,
}: ModalButtonProps) {
  return (
    <div className="flex justify-end w-full gap-12pxr">
      <Button variant="modal" size="modal" onClick={onCancel}>
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
