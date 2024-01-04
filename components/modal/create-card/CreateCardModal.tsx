import { ImagePick, Input, Modal, SelectDate, TextArea } from '@/components';
import { Controller, useForm } from 'react-hook-form';
import { ModalButton } from '@/components';
import DropdownManager from '../DropdownManager';
import AddTag from '../edit-card/AddTag';
import usePostCard from './data/usePostCard';

export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  dashboardId: number;
  columnId: number;
  getCards: () => void;
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
  getCards,
}: ModalProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isValid, errors },
  } = useForm<CreateCardModalForm>({
    mode: 'onChange',
  });

  const assigneeUserId = watch('manager')
    ? Number(watch('manager'))
    : undefined;

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

  const { execute: postCard, loading } = usePostCard({
    assigneeUserId,
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
    getCards();
    handleCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onSubmit={handleSubmit(onSubmit)}
      classNames="w-506pxr"
    >
      <div className="max-h-[90vh] overflow-y-auto flex flex-col gap-20pxr">
        <Modal.Title>할 일 생성</Modal.Title>
        <div className="flex flex-col gap-32pxr ">
          <div className="w-217pxr mobile:w-287pxr">
            <Controller
              control={control}
              name="manager"
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
            render={({ field: { ref, ...rest } }) => (
              <SelectDate {...rest} label="마감일" />
            )}
          />
          <Controller
            control={control}
            name="imageUrl"
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
            render={({ field: { ref, ...rest } }) => (
              <AddTag {...rest} onTagListChange={onTagListChange} />
            )}
          />
        </div>
        <ModalButton disabled={!isValid || loading} onCancel={handleCancel}>
          생성
        </ModalButton>
      </div>
    </Modal>
  );
}
