import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import Image from 'next/image';
import kebabIcon from '@/public/icons/kebabIcon.svg';
import closeIcon from '@/public/icons/closeIcon.svg';
import verticalLineIcon from '@/public/icons/verticalLineIcon.svg';
import { ModalProps } from '../create-dashboard/CreateDashboardModal';
import { Tag } from '@/components';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import AsigneeCard from './AsigneeCard';
import { Card } from '@/types/cards';
import { useRouter } from 'next/router';
import { Comments } from '@/types/comments';
import useGetComments from './data/useGetComments';
import useToggle from '@/hooks/useToggle';
import TodoDropDownMenu from './data/TodoDropDownMenu';
import { axiosAuthInstance } from '@/utils';
import { notify } from '@/components/common/Toast';
import { Columns } from '@/types/columns';
import EditCardModal from '../edit-card/EditCardModal';

interface TodoModalProps extends ModalProps {
  tag?: string;
  card: Card;
  getCards: () => void;
  state: Columns;
  states: Columns[];
}

function TodoModal({
  isOpen,
  onCancel,
  card,
  getCards,
  state,
  states,
}: TodoModalProps) {
  const [comments, setComments] = useState<Comments[]>([]);
  const [isEditOn, setIsEditOn] = useState(false);
  const { isOn, toggle } = useToggle();
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
  const { execute: getComments, data } = useGetComments({ cardId });

  useEffect(() => {
    getComments();
    if (!data) return;
    setComments(data?.comments);
  }, []);

  const handleDeleteCard = async () => {
    try {
      const res = await axiosAuthInstance.delete(`cards/${cardId}`);
      if (res.status === 204) {
        notify({ type: 'success', text: '카드가 삭제되었습니다!' });
      }
      toggle();
      getCards();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenEditCardModal = () => {
    toggle();
    onCancel();
    setIsEditOn(true);
  };

  const handleCloseEditCardModal = () => {
    setIsEditOn(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24pxr max-h-760pxr mobile:h-700pxr  overflow-scroll">
          <div className="flex justify-between items-center mobile:flex-col-reverse">
            <Modal.Title>{title}</Modal.Title>
            <div className="flex gap-24pxr mobile:self-end">
              <div className="relative">
                <button type="button" onClick={toggle}>
                  <Image
                    src={kebabIcon}
                    alt="케밥 아이콘"
                    className="w-28pxr h-28pxr mobile:w-20pxr mobile:h-20pxr"
                  />
                </button>
                {isOn && (
                  <TodoDropDownMenu
                    onDelete={handleDeleteCard}
                    onEdit={handleOpenEditCardModal}
                  />
                )}
              </div>
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
            <div className="flex flex-col gap-26pxr h-full w-full mobile:order-2">
              <div className="flex gap-20pxr">
                <div>
                  <Tag tag={state.title} />
                </div>
                <Image
                  src={verticalLineIcon}
                  alt="수직선"
                  className="w-1pxr h-20pxr"
                />
                <div className="flex gap-6pxr flex-wrap">
                  {tags.map((tag, index) => (
                    <Tag tag={tag} key={index} />
                  ))}
                </div>
              </div>
              <div className="h-auto space-y-16pxr">
                <p className="text-14pxr">{description}</p>
                {imageUrl && (
                  <img src={imageUrl} alt="본문 이미지" className="w-full" />
                )}
              </div>
              <CommentInput
                cardId={cardId}
                columnId={columnId}
                dashboardId={dashboardId}
                comments={comments}
                setComments={setComments}
              />
              <CommentList
                cardId={cardId}
                comments={comments}
                setComments={setComments}
              />
            </div>
            <AsigneeCard dueDate={dueDate} assignee={assignee} />
          </div>
        </div>
      </Modal>
      <EditCardModal
        isOpen={isEditOn}
        onCancel={handleCloseEditCardModal}
        card={card}
        state={state}
        states={states}
      />
    </>
  );
}

export default TodoModal;
