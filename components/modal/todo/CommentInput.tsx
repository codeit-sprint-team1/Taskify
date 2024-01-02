import { Button } from '@/components';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

function CommentInput() {
  const { control, watch } = useForm();
  return (
    <form className="flex flex-col gap-10pxr relative">
      <label className="text-16pxr font-medium">댓글</label>
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            maxLength={200}
            className="h-110pxr p-16pxr rounded-md border border-gray30 overflow-scroll focus:outline-none"
            placeholder="댓글 작성하기"
          ></textarea>
        )}
      />
      <Button
        variant="secondary"
        size="modal"
        className="absolute right-12pxr bottom-12pxr"
      >
        입력
      </Button>
    </form>
  );
}

export default CommentInput;
