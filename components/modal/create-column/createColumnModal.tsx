import { Modal } from '@/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import usePostColumns from '../data/usePostColumns';
import { useRouter } from 'next/router';

export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  getColum: () => void;
}

export interface CreateColumnModalForm {
  title: string;
}

export default function CreateColumnModal({
  isOpen,
  onCancel,
  getColum,
}: ModalProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { isValid },
  } = useForm<CreateColumnModalForm>();

  const watchInput = watch('title');

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const router = useRouter();
  const currentId = router.query['id'] as string;

  const {
    execute: postInvitations,
    loading,
    error,
  } = usePostColumns({ title: watchInput, dashboardId: Number(currentId) });

  const onSubmit = async () => {
    await postInvitations();
    getColum();
  };

  useEffect(() => {
    if (loading) return;
    if (error) {
      setError('title', {
        type: 'invalid',
        message: error.response.data.message,
      });
    } else {
      handleCancel();
    }
  }, [error, loading]);

  return (
    <Modal isOpen={isOpen} onSubmit={handleSubmit(onSubmit)}>
      <Modal.Title>새 컬럼 생성</Modal.Title>
      <Controller
        name="title"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { ref, onChange }, fieldState }) => (
          <Modal.Input
            ref={ref}
            label="이름"
            placeholder="컬럼 이름을 입력해주세요"
            type="text"
            value={watchInput}
            onChange={onChange}
            hasError={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Modal.Button disabled={!isValid || loading} onCancel={handleCancel}>
        생성
      </Modal.Button>
    </Modal>
  );
}
