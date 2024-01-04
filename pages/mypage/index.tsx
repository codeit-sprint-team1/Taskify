import { DashboardSidebar, Header, MypageMain } from '@/components';
import useGetDashboards from '@/components/dashboard/data/useGetDashboards';
import useRedirectToMain from '@/hooks/useRedirectToHome';
import DashboardLayout from '@/page-layout/DashboardLayout';
import useDashboardList from '@/store/memos/useDashboardList';
import React, { useEffect } from 'react';

function Mypage() {
  const { dashboards } = useGetDashboards();
  const { dashboardList, setDashboardList } = useDashboardList();
  useRedirectToMain('accessToken');
  useEffect(() => {
    setDashboardList(dashboards);
  }, [dashboards]);

  const dashboard = {
    title: '계정관리',
    createdByMe: false,
  };

  if (dashboards === undefined) return;

  return (
    <DashboardLayout
      header={<Header dashboard={dashboard} />}
      main={<MypageMain />}
      sidebar={<DashboardSidebar dashboardList={dashboardList} />}
    />
  );
}

export default Mypage;
