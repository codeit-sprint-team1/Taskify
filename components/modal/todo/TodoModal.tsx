import React from 'react';
import Modal from '../Modal';
import Image from 'next/image';
import kekbabIcon from '@/public/icons/kebabIcon.svg';
import closeIcon from '@/public/icons/closeIcon.svg';
import verticalLineIcon from '@/public/icons/verticalLineIcon.svg';
import sampleImage from '@/public/images/landing/taskify-top-img.png';
import { ModalProps } from '../create-dashboard/CreateDashboardModal';
import { Tag } from '@/components';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import AsigneeCard from './AsigneeCard';

interface TodoModalProps extends ModalProps {
  tag?: string;
}

function TodoModal({ isOpen, onCancel, tag }: TodoModalProps) {
  const handleSubmit = () => {
    console.log('submitted');
  };
  return (
    <Modal isOpen={isOpen} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-24pxr">
        <div className="flex justify-between items-center">
          <Modal.Title>새로운 일정 관리 Taskify</Modal.Title>
          <div className="flex gap-24pxr">
            <button type="button">
              <Image
                src={kekbabIcon}
                alt="케밥 아이콘"
                className="w-28pxr h-28pxr"
              />
            </button>
            <button type="button" onClick={onCancel}>
              <Image
                src={closeIcon}
                alt="취소 아이콘"
                className="w-32pxr h-32pxr"
              />
            </button>
          </div>
        </div>
        <div className="flex gap-24pxr">
          <div className="flex flex-col gap-26pxr max-w-[450px]">
            <div className="flex gap-20pxr">
              <Tag tag="To Do" />
              <Image
                src={verticalLineIcon}
                alt="수직선"
                className="w-1pxr h-20pxr"
              />
              <div className="flex gap-6pxr">
                <Tag tag="프로젝트" />
                <Tag tag="일반" />
                <Tag tag="백엔드" />
                <Tag tag="상" />
              </div>
            </div>
            <div className=" h-300pxr overflow-scroll space-y-16pxr ">
              <p className="text-14pxr">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum finibus nibh arcu, quis consequat ante cursus eget.
                Cras mattis, nulla non laoreet porttitor, diam justo laoreet
              </p>
              <Image src={sampleImage} alt="본문 이미지" />
            </div>
            <CommentInput />
            <CommentList />
          </div>
          <AsigneeCard />
        </div>
      </div>
    </Modal>
  );
}

export default TodoModal;
