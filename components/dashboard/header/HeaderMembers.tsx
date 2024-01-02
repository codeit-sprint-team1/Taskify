import { ProfileImage } from '@/components';
import useGetMembers from '@/components/boardEdit/data/useGetMembers';
import { useEffect, useState } from 'react';
import { Members } from '@/types/members';

interface HeaderMembersProps {
  dashboardId: number;
}

interface MemberProps {
  member: Members;
  index: number;
}

function Member({ member, index }: MemberProps) {
  const { userId, nickname, profileImageUrl } = member;
  return (
    <div className={`hover:z-10 ${index !== 0 && '-ml-8pxr mobile:-ml-12pxr'}`}>
      <ProfileImage name={nickname} src={profileImageUrl} userId={userId} />
    </div>
  );
}

export default function HeaderMembers({ dashboardId }: HeaderMembersProps) {
  const [profileMembers, setProfileMembers] = useState<Members[]>();
  const [restMembers, setRestMembers] = useState<Members[] | null>();
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
  }, [numberToMap, totalCount]);

  return (
    <div className="flex items-center h-34pxr">
      {profileMembers?.map((member, index) => {
        return <Member key={member.userId} member={member} index={index} />;
      })}
      {restMembers?.length !== 0 && (
        <div key={numberToMap - 1} className={`-ml-8pxr mobile:-ml-12pxr`}>
          <ProfileImage name={`${restMembers?.length}+`} src="" userId={9} />
        </div>
      )}
    </div>
  );
}
