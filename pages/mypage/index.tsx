import { DashboardSidebar, Header, MypageMain } from '@/components';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { useDashboardList } from '@/store/memos/useDashboardList';
import React from 'react';

function Mypage() {
  const { dashboardList } = useDashboardList();
  const dashboard = {
    title: '계정관리',
    createdByMe: false,
  };

  return (
    // <DashboardLayout
    //   header={<Header dashboard={dashboard} />}
    //   main={<MypageMain />}
    //   sidebar={<DashboardSidebar dashboardList={dashboardList} />}
    // />
    <MypageMain />
  );
}

export default Mypage;
