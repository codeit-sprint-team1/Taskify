import { ImagePick, Input, Modal, SelectDate, TextArea } from '@/components';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useDashboardList } from '@/store/memos/useDashboardList';
import { ModalButton } from '@/components';
import DropdownManager from '../DropdownManager';
import AddTag from '../edit-card/AddTag';
import { DevTool } from '@hookform/devtools';
import usePostCard from './data/usePostCard';

export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export interface CreateCardModalForm {
  title: string;
  manager: string;
  description: string;
  dueDate: Date | null;
  imageUrl: string;
  tags: string;
}

export default function CreateCardModal({ isOpen, onCancel }: ModalProps) {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>();
  const [color, setColor] = useState<string>('');
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isValid, errors },
  } = useForm<CreateCardModalForm>({
    defaultValues: {
      title: '',
      manager: '',
      description: '',
      dueDate: null,
      imageUrl: '',
      tags: '',
    },
    mode: 'onChange',
  });
  console.log([
    watch('title'),
    watch('manager'),
    watch('description'),
    watch('dueDate'),
    watch('imageUrl'), // File 객체는 selectImageFile
    watch('tags'),
  ]);

  const handleImageSelect = (file: File) => {
    setSelectedImageFile(file);
    setValue('imageUrl', file.name);
  };

  const onTagListChange = (newTagList: string[]) => {
    setValue('tags', newTagList.join(','));
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const { addDashboard } = useDashboardList();

  const {
    execute: postDashboards,
    data: response,
    loading,
  } = usePostCard({
    title: watch('title'),
    manager: watch('manager'),
    description: watch('description'),
    dueDate: watch('dueDate'),
    imageUrl: watch('imageUrl'),
    tags: watch('tags'),
  });

  const onSubmit = async () => {
    await postDashboards();
    handleCancel();
  };

  useEffect(() => {
    if (response) {
      addDashboard(response);
    }
  }, [response]);

  return (
    <div>
      <Modal isOpen={isOpen} onSubmit={handleSubmit(onSubmit)}>
        <Modal.Title>할 일 생성</Modal.Title>
        <div className="flex flex-col items-cen gap-10pxr">
          <Controller
            control={control}
            name="manager"
            rules={{ required: true }}
            render={({ field }) => (
              <DropdownManager {...field} ProfileSrc={null} />
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
          disabled={Object.keys(errors).length !== 0 || loading}
          onCancel={handleCancel}
        >
          생성
        </ModalButton>
        <DevTool control={control} />
      </Modal>
    </div>
  );
}
