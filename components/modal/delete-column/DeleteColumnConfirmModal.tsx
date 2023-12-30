import { FormEvent, useEffect } from 'react';
import { Modal, ModalButton } from '@/components';
import useDeleteColumns from '@/components/dashboard/data/useDeleteColumns';
import { notify } from '@/components/common/Toast';
import { DeleteColumnModalProps } from './DeleteColumnModal';

export default function DeleteColumnConfirmModal({
  isOpen,
  onCancel,
  columnId,
}: DeleteColumnModalProps) {
  const {
    execute: deleteColumns,
    loading,
    error,
    status,
  } = useDeleteColumns(columnId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await deleteColumns();
  };

  useEffect(() => {
    if (loading) return;
    if (error) {
      notify({ type: 'error', text: error.response.data.message });
    } else if (status === 204) {
      notify({ type: 'success', text: '컬럼이 삭제됐습니다 🗑' });
    }
    onCancel();
  }, [loading]);

  return (
    <Modal onSubmit={handleSubmit} isOpen={isOpen}>
      <div className="pt-80pxr pb-17pxr text-center text-18pxr font-medium">
        컬럼의 모든 카드가 삭제됩니다.
      </div>
      <ModalButton disabled={loading} onCancel={onCancel}>
        삭제
      </ModalButton>
    </Modal>
  );
}
