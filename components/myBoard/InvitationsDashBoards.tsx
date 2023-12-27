import searchIcon from '../../public/icons/search-icon.svg';
import notValidIcon from '../../public/icons/invitations-not-valid-icon.svg';
import { Button } from '@/components';
import Image from 'next/image';
import { InvitationsRawData, Invitations } from '@/types/invitations';
import { useState } from 'react';
import React from 'react';
import useGetInvitations from './data/useGetInvitations';

const CreatedAt = new Date();
const UpdatedAt = new Date();

const mok: InvitationsRawData = {
  cursorId: 1,
  invitations: [
    {
      id: 1,
      inviterUserId: 0,
      teamId: 'test1',
      dashboard: {
        title: 'test1',
        id: 0,
      },
      invitee: {
        nickname: '1번',
        email: 'string',
        id: 0,
      },
      inviteAccepted: true,
      createdAt: CreatedAt,
      updatedAt: UpdatedAt,
    },
    {
      id: 2,
      inviterUserId: 0,
      teamId: 'test2',
      dashboard: {
        title: 'test2',
        id: 0,
      },
      invitee: {
        nickname: '2번',
        email: 'string',
        id: 0,
      },
      inviteAccepted: true,
      createdAt: CreatedAt,
      updatedAt: UpdatedAt,
    },
    {
      id: 3,
      inviterUserId: 0,
      teamId: 'test3',
      dashboard: {
        title: 'test3',
        id: 0,
      },
      invitee: {
        nickname: '3번',
        email: 'string',
        id: 0,
      },
      inviteAccepted: true,
      createdAt: CreatedAt,
      updatedAt: UpdatedAt,
    },
    {
      id: 4,
      inviterUserId: 0,
      teamId: 'test4',
      dashboard: {
        title: 'test4',
        id: 0,
      },
      invitee: {
        nickname: '4번',
        email: 'string',
        id: 0,
      },
      inviteAccepted: true,
      createdAt: CreatedAt,
      updatedAt: UpdatedAt,
    },
    {
      id: 5,
      inviterUserId: 0,
      teamId: 'test5',
      dashboard: {
        title: 'test5',
        id: 0,
      },
      invitee: {
        nickname: '5번',
        email: 'string',
        id: 0,
      },
      inviteAccepted: true,
      createdAt: CreatedAt,
      updatedAt: UpdatedAt,
    },
  ],
};

function InvitationsList({ item }: { item: Invitations }) {
  return (
    <div className="grid grid-cols-3 justify-center items-center">
      <div className="pl-32pxr">{item.dashboard.title}</div>
      <div>{item.invitee.nickname}</div>
      <div className="flex gap-10pxr">
        <Button variant="primary" size="small">
          수락
        </Button>
        <Button variant="secondary" size="small">
          거절
        </Button>
      </div>
    </div>
  );
}

function InvitationsValid({ invitations }: { invitations: Invitations[] }) {
  const [searchValue, setSearchValue] = useState('');
  const filterInvitations = invitations.filter((item) =>
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
      {filterInvitations.map((item, index) => (
        <React.Fragment key={item.id}>
          <InvitationsList item={item} />
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
  // const { invitations } = mok;
  const { invitations } = useGetInvitations();
  console.log(invitations);
  return (
    <div className="bg-white rounded-lg px-32pxr py-28pxr flex flex-col gap-20pxr w-full">
      <div className="text-gray70 text-24pxr font-bold">초대받은 대시보드</div>
      {invitations && invitations.length !== 0 ? (
        <InvitationsValid invitations={invitations} />
      ) : (
        <InvitationsNotValid />
      )}
    </div>
  );
}
