import { Header, DashboardSidebar } from '@/components';
import DashboardLayout from '@/page-layout/DashboardLayout';
import useGetDashboards from '@/components/dashboard/data/useGetDashboards';

export default function TestPage() {
  const { dashboards } = useGetDashboards();

  const dashboard = {
    title: '내 대시보드',
    createdByMe: false,
  };

  return (
    <>
      <DashboardLayout
        header={<Header dashboard={dashboard} />}
        main={<div>main</div>}
        sidebar={<DashboardSidebar dashboardList={dashboards} />}
      ></DashboardLayout>
    </>
  );
}
