import { useRouter } from 'next/router';
import { DashboardHeader, DashboardSidebar } from '@/components';
import DashboardLayout from '@/page-layout/DashboardLayout';
import useGetDashboardList from '@/components/dashboard/data/useGetDashboards';
import { useDashboardList } from '@/store/memos/useDashboardList';
import { useEffect } from 'react';
import { Dashboards } from '@/types/dashboards';

export default function DashboardPage() {
  const { dashboards } = useGetDashboardList();
  const { dashboardList, setDashboardList } = useDashboardList();

  useEffect(() => {
    setDashboardList(dashboards);
  }, [dashboards]);

  const router = useRouter();
  const currentId = router.query['id'] as string | undefined;

  let dashboard: Dashboards | undefined;
  if (dashboardList) {
    dashboard = dashboardList.find((dashboard) => {
      return String(dashboard?.id) === currentId;
    });
  }

  if (!dashboard) return;

  return (
    <>
      <DashboardLayout
        header={<DashboardHeader dashboard={dashboard} />}
        main={<div>main</div>}
        sidebar={
          <DashboardSidebar
            dashboardList={dashboardList}
            currentId={currentId}
          />
        }
      />
    </>
  );
}
