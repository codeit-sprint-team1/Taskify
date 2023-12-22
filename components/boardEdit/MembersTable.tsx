import React, { useEffect, useState } from 'react';
import { Button } from '..';
import Image from 'next/image';
import useGetMembers from './data/useGetMembers';
import { useRouter } from 'next/router';
import { Members } from '@/types/types';

function MembersTable() {
  const testArr = Array.from({ length: 4 }, (v, i) => i);
  const router = useRouter();
  const boardid = router.query.boardid;
  const { error, loading, data } = useGetMembers({ boardid });
  const [members, setMembers] = useState<Members[]>([]);

  useEffect(() => {
    if (!loading && data && data.members) {
      setMembers(data?.members);
    }
  }, [loading]);

  console.log(members);

  if (loading) {
    return <p>로딩중...</p>;
  }

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
                  src="https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
                  alt="구성원 프로필 이미지"
                />
                <p>{item.nickname}</p>
              </div>
              <Button variant="secondary" size="small">
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
