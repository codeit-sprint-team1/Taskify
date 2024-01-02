import { ProfileImage } from '@/components';
import useGetMembers from '@/components/boardEdit/data/useGetMembers';
import { useEffect, useState } from 'react';
import { Members } from '@/types/members';
import MemberInfoItem from './MemberInfoItem';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
    size: 20,
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
    console.log(totalCount, numberToMap);
  }, [numberToMap, totalCount, dashboardId]);

  return (
    <div className="flex items-center h-34pxr">
      {profileMembers?.map((member, index) => {
        return <Member key={member.id} member={member} index={index} />;
      })}
      <div className="relative group">
        {restMembers?.length !== 0 && (
          <Link
            href={`/dashboard/${dashboardId}/edit`}
            className={`relative block -ml-8pxr mobile:-ml-12pxr`}
          >
            <ProfileImage textDiv name={`${restMembers?.length}+`} src="" />
          </Link>
        )}

        <div className="absolute right-0pxr invisible group-hover:visible p-5pxr bg-violet8 rounded-md mt-5pxr">
          {restMembers?.map((member) => {
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
