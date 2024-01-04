import { DropdownMenu } from '@/components';
import { useRouter } from 'next/router';
import React from 'react';

function TodoDropDownMenu() {
  const router = useRouter();
  let options = [
    {
      key: 1,
      title: '수정하기',
      handler: () => {
        router.push('/mydashboard');
      },
    },
    {
      key: 2,
      title: '삭제하기',
      handler: () => {
        router.push('/mypage');
      },
    },
  ];

  const isMydashboard = router.pathname === '/mydashboard';
  if (isMydashboard) {
    options = options.splice(1);
  }

  return <DropdownMenu options={options} />;
}

export default TodoDropDownMenu;
