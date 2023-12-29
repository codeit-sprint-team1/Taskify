import { useEffect, useState } from 'react';
import { useDashboardList } from '@/store/memos/useDashboardList';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { Header, DashboardSidebar } from '@/components';
import useGetDashboards from '@/components/dashboard/data/useGetDashboards';
import { Dashboards } from '@/types/dashboards';

export default function MyDashboardPage() {
  const [dashboardData, setDashboardData] = useState<Dashboards[]>([]);
  const { dashboards } = useGetDashboards();
  const { dashboardList, setDashboardList } = useDashboardList();

  useEffect(() => {
    setDashboardList(dashboards);
  }, [dashboards]);

  useEffect(() => {
    setDashboardData(dashboardList);
  }, [dashboardList]);

  const dashboard = {
    title: '내 대시보드',
    createdByMe: false,
  };

  if (dashboardData?.length === 0) return;

  return (
    <>
      <DashboardLayout
        header={<Header dashboard={dashboard} />}
        main={'main'}
        sidebar={<DashboardSidebar dashboardList={dashboardData} />}
      ></DashboardLayout>
    </>
  );
}
