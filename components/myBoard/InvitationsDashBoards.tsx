import searchIcon from '../../public/icons/search-icon.svg';
import notValidIcon from '../../public/icons/invitations-not-valid-icon.svg';
import { Button } from '@/components';
import Image from 'next/image';
import { Invitations } from '@/types/invitations';
import { useEffect, useState } from 'react';
import React from 'react';
import useGetInvitations from './data/useGetInvitations';
import usePutInvitations from './data/usePutInvitations';

function InvitationsList({
  item,
  setData,
  data,
  index,
}: {
  item: Invitations;
  setData: React.Dispatch<React.SetStateAction<Invitations[]>>;
  data: Invitations[];
  index: number;
}) {
  const { execute: Accept } = usePutInvitations(true, item.id);
  const { execute: Refuse } = usePutInvitations(false, item.id);
  function acceptInvitation() {
    data.splice(index, 1);
    setData(data);
    Accept();
  }
  function refuseInvitation() {
    data.splice(index, 1);
    setData(data);
    Refuse();
  }
  return (
    <div className="grid grid-cols-3 justify-center items-center">
      <div className="pl-32pxr">{item.dashboard.title}</div>
      <div>{item.invitee.nickname}</div>
      <div className="flex gap-10pxr">
        <Button variant="primary" size="small" onClick={acceptInvitation}>
          수락
        </Button>
        <Button variant="secondary" size="small" onClick={refuseInvitation}>
          거절
        </Button>
      </div>
    </div>
  );
}

function InvitationsValid({
  data,
  setData,
}: {
  data: Invitations[];
  setData: React.Dispatch<React.SetStateAction<Invitations[]>>;
}) {
  const [searchValue, setSearchValue] = useState('');
  const filterInvitations = data.filter((item) =>
    item.dashboard.title.includes(searchValue)
  );
  return (
    <>
      <div className="flex rounded-md border border-solid border-gray30 px-16pxr py-8pxr gap-8pxr">
        <Image src={searchIcon} alt="searchIcon" />
        <input
          className="w-full placeholder:text-gray40"
          placeholder="검색"
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray40">이름</div>
        <div className="text-gray40">초대자</div>
        <div className="text-gray40">수락 여부</div>
      </div>
      {filterInvitations.map((item, index, array) => (
        <React.Fragment key={item.id}>
          <InvitationsList
            item={item}
            setData={setData}
            data={array}
            index={index}
          />
          {index !== filterInvitations.length - 1 && (
            <hr className="border-gray20" />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

function InvitationsNotValid() {
  return (
    <div className="flex-col-center gap-24pxr pt-44pxr pb-100pxr">
      <Image src={notValidIcon} alt="notValidIcon" />
      <div>아직 초대받은 대시보드가 없어요</div>
    </div>
  );
}

export default function InvitationsDashBoards() {
  const { invitations } = useGetInvitations();
  const [data, setData] = useState(invitations);

  useEffect(() => setData(invitations), [invitations]);

  return (
    <div className="bg-white rounded-lg px-32pxr py-28pxr flex flex-col gap-20pxr w-full">
      <div className="text-gray70 text-24pxr font-bold">초대받은 대시보드</div>
      {data && data.length !== 0 ? (
        <InvitationsValid data={data} setData={setData} />
      ) : (
        <InvitationsNotValid />
      )}
    </div>
  );
}
