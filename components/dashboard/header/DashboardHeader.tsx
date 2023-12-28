import { useRouter } from 'next/router';
import Header from './Header';
import { DashboardHeaderProps } from './Header';
import HeaderButton from './HeaderButton';
import InviteButton from './InviteButton';
import addBoxIcon from '@/public/icons/add_box-icon.svg';
import settingIcon from '@/public/icons/setting-icon.svg';

export default function DashboardHeader({ dashboard }: DashboardHeaderProps) {
  const router = useRouter();
  const handleSettingButtonClick = () => {
    router.push(`${dashboard.id}/edit`);
  };
  return (
    <Header dashboard={dashboard}>
      <div className="flex items-center desktop:gap-32pxr gap-24pxr mobile:gap-12pxr">
        <div className="flex">
          <HeaderButton
            onClick={handleSettingButtonClick}
            src={settingIcon}
            alt="관리 페이지로 이동하는 톱니 모양"
          >
            설정
          </HeaderButton>
          <InviteButton />
        </div>
        <div className="desktop:w-158pxr h-34pxr w-98pxr mobile:w-82pxr bg-pink" />
        <div className="w-1pxr h-38pxr desktop:mr-32pxr mr-24pxr mobile:mr-12pxr bg-gray30" />
      </div>
    </Header>
  );
}
