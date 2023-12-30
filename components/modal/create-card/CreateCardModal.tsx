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
  description: string; // TextArea를 위한 필드
  dueDate: string; // SelectDate를 위한 필드
  image: string; // ImagePick를 위한 필드
  tags: string;
}

export default function CreateCardModal({ isOpen, onCancel }: ModalProps) {
  const [formData, setFormData] = useState<FormData>();
  const [color, setColor] = useState<string>('');
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, errors },
  } = useForm<CreateCardModalForm>();
  console.log([
    watch('title'),
    watch('manager'),
    watch('description'),
    watch('dueDate'),
    watch('image'),
    watch('tags'),
  ]);
  const watchInput = watch('title');

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
          {/* <DropdownManager ProfileSrc={null} />
          <TextArea label="제목" required />
          <SelectDate label="마감일" />
          <ImagePick label="이미지" />
          <AddTag /> */}

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
            render={({ field }) => <SelectDate {...field} label="마감일" />}
          />
          <Controller
            control={control}
            name="image"
            rules={{ required: true }}
            render={({ field }) => <ImagePick {...field} label="이미지" />}
          />
          <Controller
            control={control}
            name="tags"
            rules={{ required: true }}
            render={({ field }) => <AddTag />}
          />

          {/* <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, onChange } }) => (
              <Modal.Input
                ref={ref}
                label="대시보드 이름"
                placeholder="대시보드 이름을 입력해주세요"
                type="text"
                value={watchInput}
                onChange={onChange}
              />
            )}
          /> */}
        </div>
        <ModalButton disabled={!isValid || loading} onCancel={handleCancel}>
          생성
        </ModalButton>
      </Modal>
    </div>
  );
}
