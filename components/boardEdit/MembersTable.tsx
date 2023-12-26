import React from 'react';
import { Button, ProfileImage } from '..';
import useGetMembers from './data/useGetMembers';
import { axiosAuthInstance } from '@/utils';
import PagenationButton from '../common/PagenationButton';

interface MembersTableProps {
  boardid: number;
}

function MembersTable({ boardid }: MembersTableProps) {
  const PAGE = 1;
  const SIZE = 4;
  const { execute, data: members } = useGetMembers({
    boardid,
    page: PAGE,
    size: SIZE,
  });

  const handleDeleteMember = async (memberId: number) => {
    try {
      const res = await axiosAuthInstance.delete(`members/${memberId}`);
      if (res?.status === 204) alert('성공적으로 삭제 되었습니다.');
      execute();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-30pxr">
      <div className="flex justify-between">
        <h1 className="font-bold text-24pxr mobile:text-20pxr">구성원</h1>
        <div className="flex items-center space-x-22pxr">
          <p className="text-14pxr">1 페이지 중 1</p>
          <PagenationButton />
        </div>
      </div>
      <p className="text-16pxr text-gray40 py-24pxr">이름</p>
      <div className="space-y-32pxr">
        {members?.map((item) => {
          return (
            <div key={item.id} className="flex justify-between">
              <div className="flex items-center space-x-12pxr">
                <ProfileImage name={item.nickname} src={item.profileImageUrl} />
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
