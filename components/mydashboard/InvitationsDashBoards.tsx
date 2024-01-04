import searchIcon from '../../public/icons/search-icon.svg';
import notValidIcon from '../../public/icons/invitations-not-valid-icon.svg';
import { Button } from '@/components';
import Image from 'next/image';
import { Invitations } from '@/types/invitations';
import { useEffect, useState } from 'react';
import React from 'react';
import useGetInvitations from './data/useGetInvitations';
import usePutInvitations from './data/usePutInvitations';
import useGetDashboards from '@/components/dashboard/data/useGetDashboards';
import { useDashboardList, useStoreAccessToken } from '@/store/memos';

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
  const { accessToken: token } = useStoreAccessToken();
  const { execute: Accept } = usePutInvitations({
    inviteAccepted: true,
    id: item.id,
    token,
  });
  const { execute: Refuse } = usePutInvitations({
    inviteAccepted: false,
    id: item.id,
    token,
  });
  const { execute } = useGetDashboards(token);
  const { setDashboardList } = useDashboardList();
  async function acceptInvitation() {
    Accept();
    data.splice(index, 1);
    setData(data);
    const dashboards = await execute();
    setDashboardList(dashboards.data.dashboards);
  }

  function refuseInvitation() {
    Refuse();
    data.splice(index, 1);
    setData(data);
  }

  return (
    <div className="grid desktop:grid-cols-3 tablet:grid-cols-3 mobile:grid-rows-3 justify-center items-center mobile:text-14pxr">
      <div className="pl-32pxr mobile:pl-0pxr">
        <span className="pr-28pxr hidden mobile:inline text-gray40">이름</span>
        {item.dashboard.title}
      </div>
      <div className="mobile:text-14pxr">
        <span className="pr-16pxr hidden mobile:inline text-gray40">
          초대자
        </span>
        {item.invitee.nickname}
      </div>
      <div className="flex gap-10pxr">
        <Button variant="primary" size="xsmall" onClick={acceptInvitation}>
          수락
        </Button>
        <Button variant="secondary" size="xsmall" onClick={refuseInvitation}>
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
      <div className="flex flex-col gap-20pxr">
        <div className="flex rounded-md border border-solid border-gray30 px-16pxr py-8pxr gap-8pxr">
          <Image src={searchIcon} alt="searchIcon" />
          <input
            className="w-full placeholder:text-gray40 mobile:text-14pxr"
            placeholder="검색"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 mobile:hidden">
          <div className="text-gray40">이름</div>
          <div className="text-gray40">초대자</div>
          <div className="text-gray40">수락 여부</div>
        </div>
      </div>
      <div className="flex flex-col gap-20pxr overflow-scroll h-full">
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
      </div>
    </>
  );
}

function InvitationsNotValid() {
  return (
    <div className="flex-col-center gap-24pxr pt-44pxr pb-100pxr">
      <div className="mobile:w-60pxr mobile:h-60pxr">
        <Image src={notValidIcon} alt="notValidIcon" />
      </div>
      <div className="mobile:text-14pxr">아직 초대받은 대시보드가 없어요</div>
    </div>
  );
}

export default function InvitationsDashBoards() {
  const { accessToken: token } = useStoreAccessToken();
  const { invitations } = useGetInvitations(token);
  const [data, setData] = useState(invitations);

  useEffect(() => setData(invitations), [invitations]);

  return (
    <div className="bg-white rounded-lg px-32pxr py-28pxr flex flex-col gap-20pxr w-full overflow-hidden">
      <div className="text-gray70 text-24pxr font-bold mobile:text-20pxr">
        초대받은 대시보드
      </div>
      {data && data.length !== 0 ? (
        <InvitationsValid data={data} setData={setData} />
      ) : (
        <InvitationsNotValid />
      )}
    </div>
  );
}
