import { DropdownMenu } from '@/components';
import React from 'react';

interface TodoDropDownMenuProps {
  onDelete: () => void;
  onEdit: () => void;
}

function TodoDropDownMenu({ onDelete, onEdit }: TodoDropDownMenuProps) {
  let options = [
    {
      key: 1,
      title: '수정하기',
      handler: onEdit,
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
