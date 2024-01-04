import { useEffect } from 'react';
import { useDashboardList, useStoreAccessToken } from '@/store/memos';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { Header, DashboardSidebar } from '@/components';
import useGetDashboards from '@/components/dashboard/data/useGetDashboards';
import MyDashBoards from '@/components/mydashboard/MyDashBoards';
import useRedirectToMain from '@/hooks/useRedirectToHome';

export default function MyDashboardPage() {
  const { accessToken: token } = useStoreAccessToken();
  const { dashboardList, setDashboardList } = useDashboardList();

  useRedirectToMain('accessToken');

  useEffect(() => {
    setDashboardList([]);
  }, []);

  const { execute: getDashboard, dashboards } = useGetDashboards(token);

  useEffect(() => {
    getDashboard();
  }, [token]);

  useEffect(() => {
    if (dashboards !== null) setDashboardList(dashboards);
  }, [dashboards]);

  const dashboard = {
    title: '내 대시보드',
    createdByMe: false,
  };

  if (!dashboards || dashboardList === null) return;

  return (
    <>
      <DashboardLayout
        header={<Header dashboard={dashboard} />}
        main={<MyDashBoards />}
        sidebar={<DashboardSidebar dashboardList={dashboardList} />}
      ></DashboardLayout>
    </>
  );
}
