import { ImagePick, Input, Modal, SelectDate, TextArea } from '@/components';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import usePostDashboards from '../data/usePostDashboards';
import { useDashboardList } from '@/store/memos/useDashboardList';
import { ModalButton } from '@/components';
import DropdownManager from '../DropdownManager';
import AddTag from '../edit-card/AddTag';
import { DevTool } from '@hookform/devtools';

export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export interface CreateCardModalForm {
  title: string;
  manager: string;
  description: string;
  dueDate: Date | null;
  image: string;
  tags: string[];
}

export default function CreateCardModal({ isOpen, onCancel }: ModalProps) {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>();
  const defaultValues = {
    title: '',
    manager: '',
    description: '',
    dueDate: null,
    image: '',
    tags: [],
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
    watch('title'),
    watch('manager'),
    watch('description'),
    watch('dueDate'),
    watch('image'), // File 객체는 selectImageFile
    watch('tags'),
  ]);

  const handleImageSelect = (file: File) => {
    setSelectedImageFile(file);
    setValue('image', file.name);
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

  const { addDashboard } = useDashboardList();
  const {
    execute: postDashboards,
    data: response,
    loading,
  } = usePostDashboards({
    title: watch('title'),
    color: 'color',
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
          <Controller //선택한 value가 member와 동일해야함
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
            name="image"
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
      </Modal>
    </div>
  );
}
