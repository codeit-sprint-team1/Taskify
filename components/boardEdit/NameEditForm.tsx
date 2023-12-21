import React, { ChangeEvent, useState } from 'react';
import ColorChips from '../common/ColorChips';
import { Button, Input } from '..';

function NameEditForm() {
  const [color, setColor] = useState('');
  const [nextBoardName, setNextBoardName] = useState('');
  const onSelect = (color: string) => {
    setColor(color);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNextBoardName(event.target.value);
  };

  return (
    <div className="space-y-24pxr p-30pxr">
      <div className="flex justify-between">
        <h1 className="font-bold text-20pxr">비브리지</h1>
        <ColorChips onSelect={onSelect} />
      </div>
      <form className="flex flex-col">
        <Input
          placeholder="변경할 이름을 입력해주세요"
          label="대시보드 이름"
          value={nextBoardName}
          onChange={onChange}
        />
        <Button
          variant="primary"
          size="desktop"
          className="self-end w-84pxr mt-24pxr"
        >
          변경
        </Button>
      </form>
    </div>
  );
}

export default NameEditForm;
