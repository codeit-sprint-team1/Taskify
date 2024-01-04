import { Button } from '@/components';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import usePostComments from './data/usePostComments';
import useGetComments from './data/useGetComments';
import { Comments } from '@/types/comments';

interface CommentInputProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
  comments: Comments[];
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
}

function CommentInput({
  cardId,
  columnId,
  dashboardId,
  comments,
  setComments,
}: CommentInputProps) {
  const { control, watch } = useForm();
  const content = watch('comment');
  const { execute: postComments, data: updatedComments } = usePostComments({
    content,
    cardId,
    columnId,
    dashboardId,
  });
  const { execute: getComments, data } = useGetComments({ cardId });

  useEffect(() => {
    if (!data) return;
    setComments([...data?.comments]);
  }, []);

  useEffect(() => {
    if (comments.length !== 0) {
      setComments([...comments, updatedComments]);
    } else {
      setComments([updatedComments]);
    }
  }, [updatedComments]);

  return (
    <div className="flex flex-col gap-10pxr relative">
      <label className="text-16pxr font-medium mobile:text-14pxr">댓글</label>
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            maxLength={200}
            className="h-110pxr p-16pxr rounded-md border border-gray30 overflow-scroll focus:outline-none mobile:h-70pxr"
            placeholder="댓글 작성하기"
          ></textarea>
        )}
      />
      <Button
        variant="secondary"
        size="modal"
        className="absolute right-12pxr bottom-12pxr mobile:w-84pxr"
        onClick={postComments}
      >
        입력
      </Button>
    </div>
  );
}

export default CommentInput;
