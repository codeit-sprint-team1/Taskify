import { Modal, ColorChips } from '@/components/index';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import usePostDashboard from './data/usePostDashboard';

interface CreateDashboardModalProps {
  isOpen: boolean;
  onCancle: () => void;
}

export interface CreateDashboardModalForm {
  title: string;
}

export default function CreateDashboardModal({
  isOpen,
  onCancle,
}: CreateDashboardModalProps) {
  const [color, setColor] = useState<string>('');

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = useForm<CreateDashboardModalForm>();

  const watchInput = watch('title');

  const onSelect = (value: string) => {
    setColor(value);
  };

  const { execute: postDashboard } = usePostDashboard({
    title: watch('title'),
    color: color,
  });

  const handleCancle = () => {
    reset();
    setColor('');
    onCancle();
  };

  const onSubmit = () => {
    postDashboard();
    if (isSubmitSuccessful) {
      handleCancle();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onSubmit={handleSubmit(onSubmit)}>
        <Modal.Title>대시보드 생성하기</Modal.Title>
        <div className="flex flex-col gap-24pxr">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, onChange } }) => (
              <Modal.Input
                ref={ref}
                label="대시보드 이름"
                placeholder="대시보드 이름을 입력해주세요"
                type="text"
                value={watchInput}
                onChange={onChange}
              />
            )}
          />
        </div>
        <Modal.ColorChips onSelect={onSelect} />
        <Modal.Button
          disabled={!isValid || color === ''}
          onCancle={handleCancle}
        >
          생성
        </Modal.Button>
      </Modal>
    </>
  );
}
