import { Modal } from '@/components';
import { ModalProps } from '../CreateDashboardModal';
import { Controller, useForm } from 'react-hook-form';
import { ERROR_MESSAGE, VALID_EMAIL_REG } from '@/components/sign/constants';
import usePostInvitations from '../data/usePostInvitations';
import { useEffect } from 'react';

export interface InviteModalForm {
  email: string;
}

export default function InviteModal({ isOpen, onCancel }: ModalProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { isValid, isSubmitSuccessful },
  } = useForm<InviteModalForm>();

  const watchInput = watch('email');

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const {
    execute: postInvitations,
    loading,
    error,
  } = usePostInvitations('182', watchInput);

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
            placeholder="초대를 보낼 멤버의 이메일을 입력해주세요"
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
