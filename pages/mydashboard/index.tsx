import { useEffect } from 'react';
import { useDashboardList } from '@/store/memos/useDashboardList';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { Header, DashboardSidebar } from '@/components';
import useGetDashboardList from '@/components/dashboard/data/useGetDashboards';

export default function MyDashboardPage() {
  const { dashboards } = useGetDashboardList();
  const { dashboardList, setDashboardList } = useDashboardList();

  useEffect(() => {
    setDashboardList(dashboards);
  }, [dashboards]);

  const dashboard = {
    title: '내 대시보드',
    createdByMe: false,
  };

  if (!dashboardList) return;

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
