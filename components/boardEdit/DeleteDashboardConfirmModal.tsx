import { FormEvent, useEffect } from 'react';
import { Modal, ModalButton } from '@/components';
import { notify } from '@/components/common/Toast';
import { ModalProps } from '../modal/create-dashboard/CreateDashboardModal';
import useDeleteDashboard from './data/useDeleteDashboard';
import { useRouter } from 'next/router';

export interface DeleteColumnConfirmModalProps extends ModalProps {
  boardid: number;
}

export default function DeleteDashboardConfirmModal({
  isOpen,
  onCancel,
  boardid,
}: DeleteColumnConfirmModalProps) {
  const {
    execute: deleteDashboard,
    loading,
    error,
    status,
  } = useDeleteDashboard({ boardid });

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await deleteDashboard();
  };

  useEffect(() => {
    if (loading) return;
    if (error) {
      notify({ type: 'error', text: error.response.data.message });
    } else if (status === 204) {
      notify({ type: 'success', text: '대시보드가 삭제됐습니다 🗑' });
      router.push('/mydashboard');
    }
    onCancel();
  }, [loading]);

  return (
    <Modal onSubmit={handleSubmit} isOpen={isOpen}>
      <div className="pt-80pxr pb-17pxr text-center text-18pxr font-medium">
        정말 지우시겠어요? 대시보드의 모든 정보가 사라집니다!
      </div>
      <ModalButton disabled={loading} onCancel={onCancel}>
        삭제
      </ModalButton>
    </Modal>
  );
}
