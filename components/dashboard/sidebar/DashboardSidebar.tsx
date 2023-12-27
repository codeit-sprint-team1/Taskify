import Image from 'next/image';
import { Dashboards } from '@/types/dashboards';
import logoLarge from '@/public/icons/logo_large-icon.svg';
import logoSmall from '@/public/icons/logo_small-icon.svg';
import crownIcon from '@/public/icons/crown-icon.svg';
import CreateDashboardButton from './CreateDashboardButton';
import Link from 'next/link';

interface DashboardListItemsProps {
  dashboard: Dashboards;
  currentId?: string;
}

interface DashboardSidebarProps {
  dashboardList: Dashboards[];
  currentId?: string;
}

interface Colors {
  [code: string]: string;
}

function DashboardListItem({ dashboard, currentId }: DashboardListItemsProps) {
  const colors: Colors = {
    '#7ac555': 'bg-green',
    '#5534da': 'bg-violet',
    '#ffa500': 'bg-orange',
    '#76a5ea': 'bg-blue',
    '#e876ea': 'bg-pink',
  };
  const bg = colors[dashboard?.color];

  return (
    <Link
      href={{
        pathname: '/dashboard/[id]',
        query: { id: dashboard.id },
      }}
    >
      <div
        className={`flex items-center mobile:justify-center w-full rounded-md h-45pxr px-12pxr ${
          String(dashboard.id) === currentId && 'bg-violet8'
        } overflow-hidden hover:bg-violet8`}
      >
        <div className={`w-8pxr h-8pxr rounded-full flex-shrink-0 ${bg}`} />
        <div className="flex items-center mobile:hidden ml-16pxr ">
          <p className="overflow-hidden font-medium text-14pxr desktop:text-16pxr mr-6pxr whitespace-nowrap">
            {dashboard.title}
          </p>
          {dashboard.createdByMe && (
            <Image
              src={crownIcon}
              alt="내가 만든 대시보드임을 나타내는 왕관 아이콘"
              width={0}
              height={0}
              className="w-auto h-14pxr"
            />
          )}
        </div>
      </div>
    </Link>
  );
}

export default function DashboardSidebar({
  dashboardList,
  currentId,
}: DashboardSidebarProps) {
  return (
    <aside className="h-full overflow-x-hidden overflow-y-scroll duration-100 ease-in-out border-r w-160pxr transition-width py-20pxr px-12pxr mobile:w-67pxr desktop:w-300pxr border-r-gray30">
      <Link href="/mydashboard">
        <div className="ml-12px mobile:flex-center">
          <Image
            src={logoLarge}
            alt="내 대시보드로 이동하는 로고"
            className="mobile:hidden"
          />
          <Image
            src={logoSmall}
            alt="내 대시보드로 이동하는 로고"
            className="hidden mobile:block"
          />
        </div>
      </Link>
      <div className="mt-42pxr">
        <div className="flex items-center justify-between px-12pxr mb-15pxr">
          <p className="font-bold text-gray50 text-12pxr mobile:hidden">
            DashBoards
          </p>
          <CreateDashboardButton />
        </div>
        <div className="flex flex-col w-full gap-3pxr">
          {dashboardList.map((dashboard) => {
            return (
              <DashboardListItem
                key={dashboard.id}
                dashboard={dashboard}
                currentId={currentId}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
}
