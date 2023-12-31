import { Modal } from '@/components';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import usePostDashboards from '../data/usePostDashboards';
import { useDashboardList } from '@/store/memos';
import { ColorChips, ModalButton } from '@/components';
export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export interface CreateDashboardForm {
  title: string;
}

export default function CreateDashboardModal({ isOpen, onCancel }: ModalProps) {
  const [color, setColor] = useState<string>('');

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm<CreateDashboardForm>();

  const watchInput = watch('title');

  const onSelect = (color: string) => {
    setColor(color);
  };

  const handleCancel = () => {
    reset();
    setColor('');
    onCancel();
  };

  const { addDashboard } = useDashboardList();
  const {
    execute: postDashboards,
    data: response,
    loading,
  } = usePostDashboards({
    title: watch('title'),
    color: color,
  });

  const onSubmit = async () => {
    await postDashboards();
    handleCancel();
  };

  useEffect(() => {
    if (response) {
      addDashboard(response);
    }
  }, [response]);

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
        <ColorChips onSelect={onSelect} />
        <ModalButton
          disabled={!isValid || color === '' || loading}
          onCancel={handleCancel}
        >
          생성
        </ModalButton>
      </Modal>
    </>
  );
}
