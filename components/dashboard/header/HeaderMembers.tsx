import { ProfileImage } from '@/components';
import useGetMembers from '@/components/boardEdit/data/useGetMembers';
import { useEffect, useState } from 'react';
import { Members } from '@/types/members';
import MemberInfoItem from './MemberInfoItem';

const mock = [
  {
    id: 1,
    email: 'user1@example.com',
    nickname: 'User1',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: true,
    userId: 101,
  },
  {
    id: 2,
    email: 'user2@example.com',
    nickname: 'User2',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: false,
    userId: 102,
  },
  {
    id: 3,
    email: 'user3@example.com',
    nickname: 'User3',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: false,
    userId: 103,
  },
  {
    id: 4,
    email: 'user4@example.com',
    nickname: 'User4',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: true,
    userId: 104,
  },
  {
    id: 5,
    email: 'user5@example.com',
    nickname: 'User5',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: false,
    userId: 105,
  },
  {
    id: 6,
    email: 'user6@example.com',
    nickname: 'User6',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: true,
    userId: 106,
  },
  {
    id: 7,
    email: 'user7@example.com',
    nickname: 'User7',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: false,
    userId: 107,
  },
  {
    id: 8,
    email: 'user8@example.com',
    nickname: 'User8',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: true,
    userId: 108,
  },
  {
    id: 9,
    email: 'user9@example.com',
    nickname: 'User9',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: false,
    userId: 109,
  },
  {
    id: 10,
    email: 'user10@example.com',
    nickname: 'User10',
    profileImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isOwner: true,
    userId: 110,
  },
];

interface HeaderMembersProps {
  dashboardId: number;
}

interface MemberProps {
  member: Members;
  index: number;
}

function Member({ member, index }: MemberProps) {
  const { email, nickname, profileImageUrl } = member;
  return (
    <>
      <div
        className={`relative group hover:z-10 ${
          index !== 0 && '-ml-8pxr mobile:-ml-12pxr'
        }`}
      >
        <ProfileImage name={nickname} src={profileImageUrl} />
        <div className="absolute invisible group-hover:visible p-5pxr bg-violet8 rounded-md mt-5pxr">
          <MemberInfoItem nickname={nickname} email={email} />
        </div>
      </div>
    </>
  );
}

export default function HeaderMembers({ dashboardId }: HeaderMembersProps) {
  const [profileMembers, setProfileMembers] = useState<Members[] | null>(null);
  const [restMembers, setRestMembers] = useState<Members[] | null>(null);
  const [numberToMap, setNumberToMap] = useState(5);

  const {
    execute: getMembers,
    totalCount,
    data: members,
  } = useGetMembers({
    boardid: dashboardId,
    page: 1,
    size: 1000,
  });

  useEffect(() => {
    getMembers();
  }, [dashboardId]);

  useEffect(() => {
    if (window.innerWidth < 1023) {
      if (totalCount <= 3) {
        setNumberToMap(3);
      } else {
        setNumberToMap(2);
      }
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width:1023px)');
    const handler = (event: MediaQueryListEvent) => {
      if (event.matches) {
        if (totalCount <= 3) {
          setNumberToMap(3);
        } else {
          setNumberToMap(2);
        }
      } else {
        if (totalCount <= 5) {
          setNumberToMap(5);
        } else {
          setNumberToMap(4);
        }
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    setProfileMembers(members.slice(0, numberToMap));
    setRestMembers(members.slice(numberToMap));
  }, [numberToMap, totalCount, dashboardId]);

  return (
    <div className="flex items-center h-34pxr">
      {profileMembers?.map((member, index) => {
        return <Member key={member.id} member={member} index={index} />;
      })}
      <div className="relative group">
        {restMembers?.length !== 0 && (
          <div className={`relative  -ml-8pxr mobile:-ml-12pxr`}>
            <ProfileImage textDiv name={`${restMembers?.length}+`} src="" />
          </div>
        )}
        <div className="absolute flex flex-col gap-5pxr -left-15pxr max-h-200pxr overflow-scroll invisible group-hover:visible p-5pxr bg-violet8 rounded-md mt-1pxr">
          {mock?.map((member) => {
            return (
              <MemberInfoItem
                showImage
                key={member.id}
                nickname={member.nickname}
                email={member.email}
                imageUrl={member.profileImageUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
