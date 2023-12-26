import React, { ChangeEvent, useState } from 'react';
import ColorChips from '../common/ColorChips';
import { Button, Input } from '..';
import usePutDashboard from './data/usePutDashboard';
import { Dashboard } from '@/types/types';

interface NameEditFormProps {
  boardInfo: Dashboard;
  dashboardTitle: string;
  getDashboard: () => void;
}

function NameEditForm({
  boardInfo,
  dashboardTitle,
  getDashboard,
}: NameEditFormProps) {
  const [color, setColor] = useState('');
  const [title, setTitle] = useState('');
  const onSelect = (color: string) => {
    setColor(color);
  };
  const boardid = boardInfo?.id;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const {
    execute: putDashboard,
    loading,
    error,
    data,
  } = usePutDashboard({ title, color, boardid });

  const handlePutDashboard = async () => {
    await putDashboard();
    getDashboard();
  };

  return (
    <div className="space-y-24pxr p-30pxr">
      <div className="flex justify-between">
        <h1 className="font-bold text-20pxr">{dashboardTitle}</h1>
        <ColorChips onSelect={onSelect} />
      </div>
      <form className="flex flex-col">
        <Input
          placeholder="변경할 이름을 입력해주세요"
          label="대시보드 이름"
          value={title}
          onChange={onChange}
        />
        <Button
          variant="primary"
          size="desktop"
          className="self-end w-84pxr mt-24pxr"
          onClick={handlePutDashboard}
        >
          변경
        </Button>
      </form>
    </div>
  );
}

export default NameEditForm;
