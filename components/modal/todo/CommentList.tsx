import React, { FormEvent, useEffect, useState } from 'react';
import useGetComments from './data/useGetComments';
import { DateTime } from 'ts-luxon';
import { axiosAuthInstance } from '@/utils';
import { notify } from '@/components/common/Toast';
import { Controller, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { Comments } from '@/types/comments';

interface CommentListProps {
  cardId: number;
  comments: Comments[];
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
}

interface CommentInputState {
  [key: number]: boolean;
}

function CommentList({ cardId, comments, setComments }: CommentListProps) {
  const [isCommentInputOpen, setIsCommentInputOpen] =
    useState<CommentInputState>({});
  const { control, watch, setError } = useForm();
  const {
    execute: getComments,
    data,
    loading,
    error,
  } = useGetComments({ cardId });

  useEffect(() => {
    getComments();
    if (!data) return;
    setComments(data?.comments);
  }, [comments]);
  const formatTime = (date: string) => {
    return DateTime.fromISO(date).toFormat('yyyy-MM-dd');
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const res = await axiosAuthInstance.delete(`comments/${commentId}`);
      if (res.status === 204) {
        notify({ type: 'success', text: '댓글을 삭제했습니다.' });
      }
    } catch (error) {
      notify({ type: 'error', text: '삭제할 수 없습니다.' });
    } finally {
      getComments();
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    try {
      const res = await axiosAuthInstance.put(`comments/${commentId}`, {
        content: watch('commentInput'),
      });
      toggleCommentInput(commentId);
      getComments();
    } catch (error) {
      if (isAxiosError(error)) {
        setError('commentInput', error.response?.data.message);
      }
      console.error(error);
    }
  };

  const toggleCommentInput = (commentId: number) => {
    setIsCommentInputOpen((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="flex gap-10pxr flex-col overflow-scroll max-h-[160px]">
      {data?.comments.map((comment) => (
        <div key={comment?.id} className="flex gap-10pxr">
          <img
            src={comment?.author.profileImageUrl}
            alt="프로필아이콘"
            className="w-34pxr h-34pxr rounded-full bg-green flex-center mobile:w-26pxr mobile:h-26pxr"
          />
          <div className="flex flex-col gap-6pxr">
            <div className="space-x-8pxr">
              <span className="font-semibold text-14pxr mobile:text-12pxr">
                {comment?.author.nickname}
              </span>
              <span className="text-gray40 text-12pxr mobile:text-10pxr">
                {formatTime(comment?.createdAt)}
              </span>
            </div>
            {isCommentInputOpen[comment?.id] ? (
              <Controller
                control={control}
                name="commentInput"
                render={({ field, fieldState }) => (
                  <form className="space-x-6pxr flex">
                    <input
                      type="text"
                      {...field}
                      placeholder="댓글수정"
                      className="border border-gray40 rounded-xl indent-8pxr placeholder:text-12pxr focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdateComment(comment?.id)}
                      className="text-12pxr"
                    >
                      수정하기
                    </button>
                  </form>
                )}
              />
            ) : (
              <p className="text-14pxr mobile:text-12pxr">{comment?.content}</p>
            )}

            <div className="flex gap-12pxr">
              <button
                className="text-gray40 text-12pxr underline mobile:text-10pxr"
                type="button"
                onClick={() => toggleCommentInput(comment?.id)}
              >
                수정
              </button>
              <button
                className="text-gray40 text-12pxr underline mobile:text-10pxr"
                type="button"
                onClick={() => handleDeleteComment(comment?.id)}
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
