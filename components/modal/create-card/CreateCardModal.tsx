import { ImagePick, Input, Modal, SelectDate, TextArea } from '@/components';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ModalButton } from '@/components';
import DropdownManager from '../DropdownManager';
import AddTag from '../edit-card/AddTag';
import { DevTool } from '@hookform/devtools';
import usePostCard from './data/usePostCard';

export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  dashboardId: number;
  columnId: number;
}

export interface CreateCardModalForm {
  manager: string;
  title: string;
  description: string;
  dueDate: string | null;
  imageUrl: string | null;
  tags: string[];
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
}

export default function CreateCardModal({
  isOpen,
  onCancel,
  dashboardId,
  columnId,
}: ModalProps) {
  const [formData, setFormData] = useState<FormData>();
  const defaultValues = {
    title: '',
    manager: '',
    description: '',
    dueDate: '',
    imageUrl: '',
    tags: [],
    assigneeUserId: 0,
    dashboardId: 0,
    columnId: 0,
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateCardModalForm>({
    defaultValues,
    mode: 'onChange',
  });

  const assigneeUserId = Number(watch('manager'));

  const handleImageSelect = (imageUrl: string) => {
    setValue('imageUrl', imageUrl);
  };

  const onTagListChange = (newTagList: string[]) => {
    setValue('tags', newTagList);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const isFormFullyFilled = () => {
    const formValues = watch();
    return (
      Object.keys(defaultValues) as Array<keyof CreateCardModalForm>
    ).every((key) => {
      const value = formValues[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      } else {
        return value !== null && value !== '';
      }
    });
  };

  const {
    execute: postCard,
    data: response,
    loading,
  } = usePostCard({
    assigneeUserId: assigneeUserId,
    dashboardId,
    columnId,
    title: watch('title'),
    description: watch('description'),
    dueDate: watch('dueDate')?.toString(),
    imageUrl: watch('imageUrl'),
    tags: watch('tags'),
  });

  const onSubmit = async () => {
    await postCard();
    handleCancel();
  };

  return (
    <Modal isOpen={isOpen} onSubmit={handleSubmit(onSubmit)}>
      <div className="max-h-[90vh] overflow-y-auto flex flex-col gap-20pxr">
        <Modal.Title>할 일 생성</Modal.Title>
        <div className="flex flex-col gap-32pxr w-506pxr">
          <div className="w-217pxr mobile:w-287pxr">
            <Controller
              control={control}
              name="manager"
              rules={{ required: true }}
              render={({ field: { ref, ...rest } }) => (
                <DropdownManager
                  ref={ref}
                  {...rest}
                  dashboardId={dashboardId}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field: { ref, ...rest } }) => (
              <Input
                ref={ref}
                {...rest}
                label="제목"
                required
                classNames="mobile:w-287pxr"
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { ref, ...rest } }) => (
              <TextArea ref={ref} {...rest} label="설명" required />
            )}
          />
          <Controller
            control={control}
            name="dueDate"
            rules={{ required: true }}
            render={({ field: { ref, ...rest } }) => (
              <SelectDate {...rest} label="마감일" />
            )}
          />
          <Controller
            control={control}
            name="imageUrl"
            rules={{ required: true }}
            render={({ field: { ref, ...rest } }) => (
              <ImagePick
                ref={ref}
                {...rest}
                onSelectImage={handleImageSelect}
                label="이미지"
                columnId={columnId}
              />
            )}
          />
          <Controller
            control={control}
            name="tags"
            rules={{ required: true }}
            render={() => <AddTag onTagListChange={onTagListChange} />}
          />
        </div>
        <ModalButton
          disabled={Object.keys(errors).length !== 0 || !isFormFullyFilled()}
          onCancel={handleCancel}
        >
          생성
        </ModalButton>
        <DevTool control={control} />
      </div>
    </Modal>
  );
}
