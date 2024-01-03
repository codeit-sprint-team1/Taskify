import React from 'react';
import Modal from '../Modal';
import Image from 'next/image';
import kekbabIcon from '@/public/icons/kebabIcon.svg';
import closeIcon from '@/public/icons/closeIcon.svg';
import verticalLineIcon from '@/public/icons/verticalLineIcon.svg';
import { ModalProps } from '../create-dashboard/CreateDashboardModal';
import { Tag } from '@/components';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import AsigneeCard from './AsigneeCard';
import { Card } from '@/types/cards';
import { useRouter } from 'next/router';

interface TodoModalProps extends ModalProps {
  tag?: string;
  card: Card;
}

function TodoModal({ isOpen, onCancel, card }: TodoModalProps) {
  const handleSubmit = () => {
    console.log('submitted');
  };
  const router = useRouter();
  const dashboardId = Number(router.query['id']);
  if (!card) return;
  const {
    id: cardId,
    title,
    description,
    tags,
    dueDate,
    assignee,
    imageUrl,
    columnId,
  } = card;
  return (
    <Modal isOpen={isOpen} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-24pxr">
        <div className="flex justify-between items-center mobile:flex-col-reverse">
          <Modal.Title>{title}</Modal.Title>
          <div className="flex gap-24pxr mobile:self-end">
            <button type="button">
              <Image
                src={kekbabIcon}
                alt="케밥 아이콘"
                className="w-28pxr h-28pxr mobile:w-20pxr mobile:h-20pxr"
              />
            </button>
            <button type="button" onClick={onCancel}>
              <Image
                src={closeIcon}
                alt="취소 아이콘"
                className="w-32pxr h-32pxr mobile:w-24pxr mobile:h-24pxr"
              />
            </button>
          </div>
        </div>
        <div className="flex gap-24pxr mobile:flex-col">
          <div className="flex flex-col gap-26pxr max-w-[450px] mobile:order-2">
            <div className="flex gap-20pxr">
              <Tag tag="To Do" />
              <Image
                src={verticalLineIcon}
                alt="수직선"
                className="w-1pxr h-20pxr"
              />
              <div className="flex gap-6pxr">
                {tags.map((tag) => (
                  <Tag tag={tag} />
                ))}
              </div>
            </div>
            <div className=" h-full overflow-scroll space-y-16pxr ">
              <p className="text-14pxr">{description}</p>
              <img src={imageUrl} alt="본문 이미지" className="w-screen" />
            </div>
            <CommentInput
              cardId={cardId}
              columnId={columnId}
              dashboardId={dashboardId}
            />
            <CommentList cardId={cardId} />
          </div>
          <AsigneeCard dueDate={dueDate} assignee={assignee} />
        </div>
      </div>
    </Modal>
  );
}

export default TodoModal;
