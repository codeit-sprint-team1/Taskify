import { useEffect } from 'react';
import { useDashboardList } from '@/store/memos/useDashboardList';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { Header, DashboardSidebar } from '@/components';
import useGetDashboards from '@/components/dashboard/data/useGetDashboards';

export default function MyDashboardPage() {
  const { dashboards } = useGetDashboards();
  const { dashboardList, setDashboardList } = useDashboardList();

  useEffect(() => {
    setDashboardList(dashboards);
  }, [dashboards]);

  const dashboard = {
    title: '내 대시보드',
    createdByMe: false,
  };

  if (dashboards === undefined) return;

  return (
    <>
      <DashboardLayout
        header={<Header dashboard={dashboard} />}
        main={'main'}
        sidebar={<DashboardSidebar dashboardList={dashboardList} />}
      ></DashboardLayout>
    </>
  );
}
