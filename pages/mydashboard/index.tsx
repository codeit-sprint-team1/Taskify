import { Header, DashboardSidebar } from '@/components';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { useDashboardList } from '@/store/memos/useDashboardList';

export default function MyDashboardPage() {
  const { dashboardList, setDashboardList } = useDashboardList();

  const dashboard = {
    title: '내 대시보드',
    createdByMe: false,
  };

  return (
    <>
      <DashboardLayout
        header={<Header dashboard={dashboard} />}
        main={<div>main</div>}
        sidebar={<DashboardSidebar dashboardList={dashboardList} />}
      ></DashboardLayout>
    </>
  );
}
