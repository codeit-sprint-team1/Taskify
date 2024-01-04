import React, { useState } from 'react';
import { Button, ProfileImage } from '..';
import useGetMembers from './data/useGetMembers';
import { axiosAuthInstance } from '@/utils';
import PagenationButton from '../common/PaginationButton';
import { notify } from '../common/Toast';

interface MembersTableProps {
  boardid: number;
}

function MembersTable({ boardid }: MembersTableProps) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);
  const {
    execute,
    data: members,
    totalCount,
  } = useGetMembers({
    boardid,
    page,
    size,
  });
  const totalPages = Math.floor(totalCount / size);

  const handleDeleteMember = async (memberId: number) => {
    try {
      const res = await axiosAuthInstance('').delete(`members/${memberId}`);
      if (res?.status === 204) {
        notify({ type: 'success', text: '멤버를 삭제했습니다!' });
      }
      execute();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickRight = () => {
    setPage(page + 1);
  };

  const handleClickLeft = () => {
    setPage(page - 1);
  };

  return (
    <div className="p-30pxr">
      <div className="flex justify-between">
        <h1 className="font-bold text-24pxr mobile:text-20pxr">구성원</h1>
        <div className="flex items-center space-x-22pxr">
          <p className="text-14pxr">
            {totalPages <= 1 ? totalPages + 1 : totalPages} 페이지 중 {page}
          </p>
          <PagenationButton
            onClickRight={handleClickRight}
            onClickLeft={handleClickLeft}
            totalPages={totalPages}
            page={page}
          />
        </div>
      </div>
      <p className="text-16pxr text-gray40 py-24pxr">이름</p>
      <div className="space-y-32pxr">
        {members?.map((item) => {
          return (
            <div key={item.id} className="flex justify-between">
              <div className="flex items-center space-x-12pxr">
                <ProfileImage
                  name={item.nickname}
                  src={item.profileImageUrl}
                  userId={item.userId}
                />
                <p>{item.nickname}</p>
              </div>
              <Button
                onClick={() => handleDeleteMember(item.id)}
                variant="secondary"
                size="small"
                className="mobile:py-7pxr mobile:px-9pxr mobile:w-52pxr"
              >
                삭제
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MembersTable;
