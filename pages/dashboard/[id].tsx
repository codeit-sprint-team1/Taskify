import { useRouter } from 'next/router';
import { useDashboardList } from '@/store/memos/useDashboardList';
import { Dashboards } from '@/types/dashboards';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { DashboardHeader, DashboardSidebar } from '@/components';

export default function DashboardPage() {
  const { dashboardList } = useDashboardList();

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
