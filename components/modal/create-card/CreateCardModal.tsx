import { ImagePick, Input, Modal, SelectDate, TextArea } from '@/components';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import usePostDashboards from '../data/usePostDashboards';
import { useDashboardList } from '@/store/memos/useDashboardList';
import { ColorChips, ModalButton } from '@/components';
import DropdownManager from '../DropdownManager';
import DropdownState from '../DropdownState';
import AddTag from '../edit-card/AddTag';
export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export interface CreateCardModalForm {
  //받아올거 : 상태 담당자? 제목 설명 마감일 태그 이미지
  title: string;
  manager: string;
  description: string;
  dueDate: Date | null;
  image: string;
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
      image: '',
      tags: '',
    },
  });
  console.log([
    watch('title'),
    watch('manager'),
    watch('description'),
    watch('dueDate'),
    watch('image'), // File 객체는 selectImageFile
    watch('tags'),
  ]);

  const watchInput = watch('title');

  const handleImageSelect = (file: File) => {
    setSelectedImageFile(file);
    setValue('image', file.name);
  };

  const updateTagList = (newTags: string[]) => {
    onTagListChange(newTags); // 부모 컴포넌트에 변경 사항 전달
  };

  const onTagListChange = (newTagList: string[]) => {
    setValue('tags', newTagList.join(',')); // 'tags' 필드 업데이트
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
  } = usePostDashboards({
    title: watch('title'),
    color: color,
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
          {errors.title && <p>"제목은 필수입니다."</p>}
          {errors.manager && <p>"담당자는 필수입니다."</p>}
          {errors.description && <p>"설명 필수입니다."</p>}
          {errors.dueDate && <p>"마감일는 필수입니다."</p>}
          {errors.image && <p>"이미지는 필수입니다."</p>}
          {errors.tags && <p>"태그는 필수입니다."</p>}
          {/* <DropdownManager ProfileSrc={null} />
          <TextArea label="제목" required />
          <SelectDate label="마감일" />
          <ImagePick label="이미지" />
          <AddTag /> */}

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
        <ModalButton disabled={!isValid || loading} onCancel={handleCancel}>
          생성
        </ModalButton>
        <div></div>
      </Modal>
    </div>
  );
}
