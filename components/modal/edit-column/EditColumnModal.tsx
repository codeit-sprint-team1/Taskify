import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useToggle from '@/hooks/useToggle';
import { Modal, ModalButton, DeleteColumnConfirmModal } from '@/components';
import usePutColumns from '@/components/dashboard/data/usePutColumns';
import { notify } from '@/components/common/Toast';
import { ModalProps } from '../create-dashboard/CreateDashboardModal';

export interface EditColumnModalProps extends ModalProps {
  columnId: number;
  getColum: () => void;
}

interface EditColumnForm {
  title: string;
}

export default function EditColumnModal({
  isOpen,
  onCancel,
  columnId,
  getColum,
}: EditColumnModalProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm<EditColumnForm>();

  const watchInput = watch('title');
  const { isOn, toggle } = useToggle(false);

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const {
    execute: putDashboards,
    data: response,
    loading,
    error,
    status,
  } = usePutColumns({
    title: watch('title'),
    columnId: columnId,
  });

  const onSubmit = async () => {
    await putDashboards();
    getColum();
  };

  const handleAllClose = () => {
    handleCancel();
    toggle();
  };

  useEffect(() => {
    if (loading) return;
    if (error) {
      notify({ type: 'error', text: error.response.data.message });
      handleCancel();
    } else if (status === 200) {
      notify({ type: 'success', text: '컬럼 이름이 변경됐습니다 🥳' });
      handleCancel();
    }
  }, [error, loading]);

  return (
    <>
      <Modal isOpen={isOpen} onSubmit={handleSubmit(onSubmit)}>
        <Modal.Title>컬럼 관리</Modal.Title>
        <div className="flex flex-col gap-24pxr">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, onChange }, fieldState }) => (
              <Modal.Input
                ref={ref}
                label="이름"
                placeholder="변경할 컬럼 이름을 입력해주세요"
                type="text"
                value={watchInput}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="flex">
          <button
            type="button"
            className="shrink-0 text-14pxr text-gray40 underline underline-offset-4"
            onClick={toggle}
          >
            컬럼 삭제
          </button>

          <ModalButton disabled={!isValid || loading} onCancel={handleCancel}>
            변경
          </ModalButton>
        </div>
      </Modal>
      <DeleteColumnConfirmModal
        columnId={columnId}
        isOpen={isOn}
        onCancel={toggle}
        onClose={handleAllClose}
        getColum={getColum}
      />
    </>
  );
}
