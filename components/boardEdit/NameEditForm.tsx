import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, EditColorChips, Input } from '..';
import usePutDashboard from './data/usePutDashboard';
import { Dashboards } from '@/types/dashboards';
import { useDashboardList } from '@/store/memos';

interface NameEditFormProps {
  boardInfo: Dashboards;
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
  const { setDashboardList, dashboardList } = useDashboardList();

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
  };

  useEffect(() => {
    if (!data) return;
    getDashboard();
    const updatedDashboards = dashboardList.map((dashboard) =>
      dashboard.id === boardid
        ? {
            ...dashboard,
            title: data?.title,
            color: data?.color,
          }
        : dashboard
    );
    setDashboardList(updatedDashboards);
  }, [data]);

  return (
    <div className="space-y-24pxr p-30pxr">
      <div className="flex justify-between">
        <h1 className="font-bold text-20pxr">{dashboardTitle}</h1>
        <EditColorChips onSelect={onSelect} />
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
