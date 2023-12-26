import React from 'react';
import { Button } from '..';
import Image from 'next/image';
import useGetMembers from './data/useGetMembers';
import { axiosAuthInstance } from '@/utils';

interface MembersTableProps {
  boardid: number;
}

function MembersTable({ boardid }: MembersTableProps) {
  const { execute, error, loading, data: members } = useGetMembers({ boardid });

  if (loading) return;

  if (loading) {
    return <p>로딩중...</p>;
  }

  const handleDeleteMember = async (memberId: number) => {
    try {
      const res = await axiosAuthInstance.delete(`members/${memberId}`);
      if (res?.status === 204) alert('성공적으로 삭제 되었습니다.'); // react toastify로 교체
      execute();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-30pxr">
      <div className="flex justify-between">
        <h1 className="font-bold text-24pxr">구성원</h1>
        <div className="flex items-center space-x-22pxr">
          <p className="font-14pxr">1 페이지 중 1</p>
          <Button variant="secondary" size="xsmall">
            페이지네이션
          </Button>
        </div>
      </div>
      <p className="text-16pxr text-gray40 py-24pxr">이름</p>
      <div className="space-y-32pxr">
        {members?.map((item) => {
          return (
            <div key={item.id} className="flex justify-between">
              <div className="flex items-center space-x-12pxr">
                <Image
                  width={38}
                  height={38}
                  className="w-38pxr h-38pxr rounded-full object-cover"
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  alt="구성원 프로필 이미지"
                />
                <p>{item.nickname}</p>
              </div>
              <Button
                onClick={() => handleDeleteMember(item.id)}
                variant="secondary"
                size="small"
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
