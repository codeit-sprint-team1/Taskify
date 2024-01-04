import { Modal } from '@/components';
import { ModalProps } from '../create-dashboard/CreateDashboardModal';
import { Controller, useForm } from 'react-hook-form';
import { ERROR_MESSAGE, VALID_EMAIL_REG } from '@/components/sign/constants';
import usePostInvitations from '../data/usePostInvitations';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export interface InviteModalForm {
  email: string;
}

export interface InviteModalProps extends ModalProps {
  handler?: () => void;
}

export default function InviteModal({
  isOpen,
  onCancel,
  handler,
}: InviteModalProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { isValid },
  } = useForm<InviteModalForm>();

  const watchInput = watch('email');

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
    data: response,
  } = usePostInvitations(currentId, watchInput);

  const onSubmit = async () => {
    await postInvitations();
  };

  useEffect(() => {
    if (loading) return;
    if (error) {
      setError('email', {
        type: 'invalid',
        message: error.response.data.message,
      });
    } else {
      handleCancel();
    }
  }, [error, loading]);

  useEffect(() => {
    if (handler && response) {
      handler();
    }
  }, [response]);

  return (
    <Modal isOpen={isOpen} onSubmit={handleSubmit(onSubmit)}>
      <Modal.Title>초대하기</Modal.Title>
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: VALID_EMAIL_REG,
            message: ERROR_MESSAGE.emailInvalid,
          },
        }}
        render={({ field: { ref, onChange }, fieldState }) => (
          <Modal.Input
            ref={ref}
            label="이메일"
            placeholder="초대할 멤버의 이메일을 입력해 주세요"
            type="text"
            value={watchInput}
            onChange={onChange}
            hasError={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Modal.Button disabled={!isValid || loading} onCancel={handleCancel}>
        초대
      </Modal.Button>
    </Modal>
  );
}
