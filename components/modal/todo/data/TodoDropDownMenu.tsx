import { DropdownMenu } from '@/components';
import React from 'react';

interface TodoDropDownMenuProps {
  onDelete: () => void;
}

function TodoDropDownMenu({ onDelete }: TodoDropDownMenuProps) {
  let options = [
    {
      key: 1,
      title: '수정하기',
      handler: () => {},
    },
    {
      key: 2,
      title: '삭제하기',
      handler: onDelete,
    },
  ];

  return <DropdownMenu options={options} />;
}

export default TodoDropDownMenu;
