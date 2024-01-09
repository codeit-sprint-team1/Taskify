import { DashboardHeader, DashboardSidebar } from '@/components';
import React from 'react';
import { useRouter } from 'next/router';
import BoardEditMain from '@/components/boardEdit/BoardEditMain';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { useDashboardList, useUserInfo } from '@/store/memos';
import { Dashboards } from '@/types/dashboards';

function BoardEditPage() {
  const router = useRouter();
  const params = router.query;
  const boardid = params?.id ? Number(params.id) : null;
  const { dashboardList } = useDashboardList();
  if (boardid === null || isNaN(boardid)) return;

  const currentId = router.query['id'] as string | undefined;

  let dashboard: Dashboards | undefined;
  if (dashboardList) {
    dashboard = dashboardList.find((dashboard) => {
      return String(dashboard?.id) === currentId;
    });
  }

  if (!dashboard) {
    router.push('/');
  }
  if (!dashboard) return;

  return (
    <DashboardLayout
      main={<BoardEditMain boardid={boardid} />}
      header={<DashboardHeader dashboard={dashboard} />}
      sidebar={
        <DashboardSidebar currentId={currentId} dashboardList={dashboardList} />
      }
    />
  );
}

export default BoardEditPage;
