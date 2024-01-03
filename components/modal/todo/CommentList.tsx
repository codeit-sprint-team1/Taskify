import Image from 'next/image';
import React, { useEffect } from 'react';
import sampleIcon from '@/public/icons/crown-icon.svg';
import useGetComments from './data/useGetComments';
import { DateTime } from 'ts-luxon';

interface CommentListProps {
  cardId: number;
}

function CommentList({ cardId }: CommentListProps) {
  const {
    execute: getComments,
    data,
    loading,
    error,
  } = useGetComments({ cardId });

  useEffect(() => {
    getComments();
  }, []);

  const comments = data?.comments;
  const formatTime = (date: string) => {
    return DateTime.fromISO(date).toFormat('yyyy-MM-dd');
  };
  return (
    <div className="flex gap-10pxr flex-col overflow-scroll min-h-[160px]">
      {comments?.map((comment) => (
        <div key={comment.id} className="flex gap-10pxr">
          <img
            src={comment.author.profileImageUrl}
            alt="프로필아이콘"
            className="w-34pxr h-34pxr rounded-full bg-green flex-center mobile:w-26pxr mobile:h-26pxr"
          />
          <div className="flex flex-col gap-6pxr">
            <div className="space-x-8pxr">
              <span className="font-semibold text-14pxr mobile:text-12pxr">
                {comment.author.nickname}
              </span>
              <span className="text-gray40 text-12pxr mobile:text-10pxr">
                {formatTime(comment.createdAt)}
              </span>
            </div>
            <p className="text-14pxr mobile:text-12pxr">{comment.content}</p>
            <div className="flex gap-12pxr">
              <button
                className="text-gray40 text-12pxr underline mobile:text-10pxr"
                type="button"
              >
                수정
              </button>
              <button
                className="text-gray40 text-12pxr underline mobile:text-10pxr"
                type="button"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
