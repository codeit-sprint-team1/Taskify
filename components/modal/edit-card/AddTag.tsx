import React, { KeyboardEvent, useState } from 'react';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import calculateLength from './calculateLength';
import { Input, Label, Tag } from '@/components';

interface FormValues {
  tagInput: string;
}

interface AddTagProps {
  onTagListChange: (tags: string[]) => void;
  addedTags?: string[];
}

const AddTag = ({ onTagListChange, addedTags }: AddTagProps) => {
  const [tagList, setTagList] = useState(addedTags ? addedTags : []);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { tagInput: '' }, mode: 'onBlur' });
  const hasError = Boolean(errors.tagInput);

  const updateTagList = (newTags: string[]) => {
    setTagList(newTags);
    onTagListChange(newTags);
  };

  const submitTagItem = (data: FormValues) => {
    if (tagList.length >= 10) {
      setError('tagInput', {
        type: 'manual',
        message: '태그는 10개까지 입력 가능합니다',
      });
      return;
    }
    const regex = /^[가-힣A-Za-z0-9]+$/;
    const validTag = regex.test(data.tagInput);
    if (!validTag) {
      setError('tagInput', {
        type: 'manual',
        message: '태그는 한글, 영문, 숫자만 사용할 수 있습니다',
      });
      return;
    }
    if (tagList.includes(data.tagInput)) {
      setError('tagInput', {
        type: 'manual',
        message: '중복된 태그입니다',
      });
      return;
    }

    clearErrors('tagInput');
    updateTagList([...tagList, data.tagInput]);
    reset({ tagInput: '' });
  };

  const deleteTagItem = (tagToDelete: string) => {
    const newTagList = tagList.filter((tag) => tag !== tagToDelete);
    updateTagList(newTagList);
  };

  const onKeyDown = (
    field: ControllerRenderProps<FormValues, 'tagInput'>,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(submitTagItem)();
    }
    if (e.key === 'Backspace' && !field.value) {
      e.preventDefault();
      if (tagList.length > 0) {
        const newTagList = tagList.slice(0, tagList.length - 1);
        updateTagList(newTagList);
      }
    }
  };

  return (
    <div>
      <Label text="태그" />
      <div
        className={`flex items-center gap-x-8pxr flex-wrap border ${
          hasError ? 'border-red' : 'border-gray30'
        } rounded-md px-5pxr mobile:w-287pxr`}
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
            <div className="flex-grow">
              <Input
                {...field}
                type="text"
                placeholder="입력 후 Enter"
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  onKeyDown(field, e)
                }
                className=" w-full h-50pxr outline-none mobile:text-14pxr mobile:w-80pxr"
              />
            </div>
          )}
        />
      </div>
      <div className="text-14pxr text-red mt-8pxr">
        {errors.tagInput && <p>{errors.tagInput.message}</p>}
      </div>
    </div>
  );
};

export default AddTag;
