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
  dueDate: Date | null;
  imageUrl: File | null;
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
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>();
  const defaultValues = {
    title: '',
    manager: '',
    description: '',
    dueDate: null,
    imageUrl: null,
    tags: [],
    assigneeUserId: 1,
    dashboardId: 1,
    columnId: 1,
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
  console.log([
    // assigneeUserId: 1,
    // dashboardId: 1,
    // columnId: 1,
    watch('title'),
    // watch('manager'),
    watch('description'),
    watch('dueDate'),
    selectedImageFile, // File 객체는 selectImageFile
    watch('tags'),
  ]);

  const handleImageSelect = (file: File) => {
    setSelectedImageFile(file);
    setValue('imageUrl', file);
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
    assigneeUserId: 1,
    dashboardId: 1,
    columnId: 1,
    title: watch('title'),
    description: watch('description'),
    dueDate: watch('dueDate')?.toString(),
    imageUrl: watch('imageUrl'), // File 객체는 selectImageFile
    tags: watch('tags'),
  });

  const onSubmit = async () => {
    await postCard();
    handleCancel();
  };

  // useEffect(() => {
  //   if (response) {
  //     addDashboard(response);
  //   }
  // }, [response]);

  return (
    <Modal isOpen={isOpen} onSubmit={handleSubmit(onSubmit)}>
      <div className="max-h-[90vh] overflow-y-auto flex flex-col gap-20pxr">
        <Modal.Title>할 일 생성</Modal.Title>
        <div className="flex flex-col gap-32pxr w-506pxr">
          <Controller
            control={control}
            name="manager"
            rules={{ required: true }}
            render={({ field }) => (
              <DropdownManager
                {...field}
                ProfileSrc={null}
                dashboardId={dashboardId}
                columnId={columnId}
              />
            )}
          />
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => <Input {...field} label="제목" required />}
          />
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea {...field} label="설명" required />
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
            render={({ field }) => (
              <ImagePick
                {...field}
                onSelectImage={handleImageSelect}
                label="이미지"
              />
            )}
          />
          <Controller
            control={control}
            name="tags"
            rules={{ required: true }}
            render={({ field }) => <AddTag onTagListChange={onTagListChange} />}
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
