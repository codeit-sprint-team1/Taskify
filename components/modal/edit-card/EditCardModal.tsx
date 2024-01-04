import { ImagePick, Input, Modal, SelectDate, TextArea } from '@/components';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ModalButton } from '@/components';
import DropdownManager from '../DropdownManager';
import AddTag from '../edit-card/AddTag';
import usePutCard from './data/usePutCard';
import DropdownState from '../DropdownState';
import { Columns } from '@/types/columns';
import { Card } from '@/types/cards';

export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  card: Card;
  state: Columns;
  states: Columns[];
}

export interface EditCardModalForm {
  manager: string;
  title: string;
  description: string;
  dueDate: string | null;
  imageUrl: string | null;
  tags: string[];
  assigneeUserId: number | null;
  dashboardId: number;
  columnId: number;
  states: Columns[];
}

export default function EditCardModal({
  isOpen,
  onCancel,
  card,
  states,
  state,
}: ModalProps) {
  const [selectedStateId, setSelectedStateId] = useState<number>(state.id);
  const defaultValues = {
    title: card?.title,
    manager: card?.assignee?.nickname,
    description: card?.description,
    dueDate: card?.dueDate,
    imageUrl: card?.imageUrl,
    tags: card?.tags,
    assigneeUserId: card?.assignee?.id,
    dashboardId: card?.dashboardId,
    columnId: state?.id,
    cardId: card?.id,
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isValid, errors },
  } = useForm<EditCardModalForm>({
    defaultValues,
    mode: 'onChange',
  });

  const handleImageSelect = (imageUrl: string) => {
    setValue('imageUrl', imageUrl);
  };

  const onTagListChange = (newTagList: string[]) => {
    setValue('tags', newTagList);
  };

  const handleStateChange = (newStateId: number) => {
    setSelectedStateId(newStateId);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const {
    execute: putCard,
    data,
    loading,
  } = usePutCard({
    assigneeUserId: watch('assigneeUserId'),
    title: watch('title'),
    description: watch('description'),
    dueDate: watch('dueDate')?.toString(),
    imageUrl: watch('imageUrl'),
    tags: watch('tags'),
    cardId: card?.id,
    columnId: selectedStateId,
  });

  const onSubmit = async () => {
    await putCard();
    handleCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onSubmit={handleSubmit(onSubmit)}
      classNames="w-506pxr"
    >
      <div className="max-h-[90vh] overflow-y-auto flex flex-col gap-20pxr">
        <Modal.Title>할 일 수정</Modal.Title>
        <div className="flex flex-col gap-32pxr ">
          <div className="flex flex-row justify-between mobile:flex-col mobile:gap-24pxr">
            <div className="w-217pxr mobile:w-287pxr">
              <Controller
                control={control}
                name="states"
                render={({ field: { ref, ...rest } }) => (
                  <DropdownState
                    ref={ref}
                    {...rest}
                    initialState={state.title}
                    states={states}
                    onChange={handleStateChange}
                  />
                )}
              />
            </div>
            <div className="w-217pxr mobile:w-287pxr">
              <Controller
                control={control}
                name="manager"
                render={({ field: { ref, ...rest } }) => (
                  <DropdownManager
                    ref={ref}
                    {...rest}
                    dashboardId={card.dashboardId}
                  />
                )}
              />
            </div>
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
                columnId={state?.id}
                selectedImageUrl={card.imageUrl}
              />
            )}
          />
          <Controller
            control={control}
            name="tags"
            render={() => (
              <AddTag onTagListChange={onTagListChange} addedTags={card.tags} />
            )}
          />
        </div>
        <ModalButton disabled={!isValid || loading} onCancel={handleCancel}>
          수정
        </ModalButton>
      </div>
    </Modal>
  );
}
