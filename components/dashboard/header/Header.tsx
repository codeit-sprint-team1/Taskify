import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { Profile } from '@/components';
import crownIcon from '@/public/icons/crown-icon.svg';
import { useUserInfo } from '@/store/memos';

export interface MyDashboardHeaderProps {
  dashboard: {
    title: string;
    createdByMe: boolean;
  };
}
export interface DashboardHeaderProps {
  dashboard: {
    id: number;
    title: string;
    createdByMe: boolean;
  };
  children?: ReactNode;
}

type HeaderProps = {
  dashboard: {
    id?: number;
    title: string;
    createdByMe: boolean;
  };
  children?: ReactNode;
};

export default function Header({ dashboard, children }: HeaderProps) {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>('');

  const { userInfo } = useUserInfo();
  useEffect(() => {
    setNickname(userInfo.nickname);
    setProfileImage(userInfo.profileImageUrl);
  }, []);
  return (
    <header className="flex items-center justify-end border-b desktop:justify-between mobile:justify-end h-70pxr desktop:pl-40pxr desktop:pr-80pxr px-40pxr mobile:px-12pxr border-b-gray30">
      <div className="hidden desktop:flex desktop:items-center gap-8pxr ">
        <h1 className="flex items-center font-bold text-20pxr whitespace-nowrap">
          {dashboard.title}
        </h1>
        {dashboard.createdByMe && (
          <Image
            src={crownIcon}
            alt="내가 만든 대시보드임을 나타내는 왕관 아이콘"
            width={0}
            height={0}
            className="w-20pxr h-16pxr"
          />
        )}
      </div>
      <div className="flex items-center">
        {children}
        <Profile name={nickname} src={profileImage} />
      </div>
    </header>
  );
}
