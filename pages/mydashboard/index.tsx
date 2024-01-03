import { useCallback, useEffect, useState } from 'react';
import { useDashboardList } from '@/store/memos';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { Header, DashboardSidebar } from '@/components';
import useGetDashboards from '@/components/dashboard/data/useGetDashboards';
import MyDashBoards from '@/components/myBoard/MyDashBoards';
import useRedirectToMain from '@/hooks/useRedirectToHome';
import { axiosInstance } from '@/utils';
import { useAsync } from '@/hooks/useAsync';

export default function MyDashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const { dashboardList, setDashboardList } = useDashboardList();

  useRedirectToMain('accessToken');

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
    setDashboardList([]);
  }, []);

  const getDashboards = useCallback(
    () =>
      axiosInstance.get(
        `dashboards?navigationMethod=infiniteScroll&page=1&size=100`,
        {
          baseURL: 'https://sp-taskify-api.vercel.app/1-1/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    [token]
  );

  const { execute, data } = useAsync(getDashboards, true);

  useEffect(() => {
    execute();
  }, [token]);

  useEffect(() => {
    if (data !== null) setDashboardList(data.dashboards);
  }, [data, token]);

  const dashboard = {
    title: '내 대시보드',
    createdByMe: false,
  };

  if (!data || dashboardList === null) return;

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
