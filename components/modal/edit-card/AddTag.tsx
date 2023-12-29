import React, { KeyboardEvent, useState } from 'react';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import Tag from '../../common/Tag';
import { Input } from '../..';
import calculateLength from './calculateLength';

interface FormValues {
  tagInput: string;
}

const AddTag = () => {
  const [tagList, setTagList] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const hasError = Boolean(errors.tagInput);

  const submitTagItem = (data: FormValues) => {
    if (tagList.length >= 10) {
      setError('tagInput', {
        type: 'manual',
        message: '태그는 10개까지 입력 가능합니다',
      });
      return;
    }
    clearErrors('tagInput');
    setTagList((prev) => [...prev, data.tagInput]);
    reset({ tagInput: '' });
  };

  const deleteTagItem = (tagToDelete: string) => {
    setTagList(tagList.filter((tag) => tag !== tagToDelete));
  };

  const onKeyDown = (
    field: ControllerRenderProps<FormValues, 'tagInput'>,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(submitTagItem)();
    }

    if (e.key === 'Backspace' && !field.value) {
      e.preventDefault();
      if (tagList.length > 0) {
        setTagList((prev) => prev.slice(0, prev.length - 1));
      }
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-x-8pxr flex-wrap border ${
          hasError ? 'border-red' : 'border-gray30'
        } rounded-md px-5pxr`}
      >
        {tagList.slice(0, 10).map((tag, index) => (
          <div key={index} className="h-50pxr flex items-center">
            <Tag tag={tag} onClick={() => deleteTagItem(tag)} isEdit />
          </div>
        ))}
        <Controller
          name="tagInput"
          control={control}
          rules={{
            validate: (value) =>
              calculateLength(value) <= 16 ||
              '태그는 한글 8자 또는 영문 16자 이하로 작성해주세요',
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="입력 후 Enter"
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                onKeyDown(field, e)
              }
              className="h-50pxr outline-none"
            />
          )}
        />
      </div>
      <div className="text-14pxr text-red mt-8pxr">
        {errors.tagInput && (
          <p>{errors.tagInput.message || '태그는 8자 이하로 작성해주세요'}</p>
        )}
      </div>
    </div>
  );
};

export default AddTag;
