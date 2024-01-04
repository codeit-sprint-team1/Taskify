import { create } from 'zustand';
import { Dashboards } from '@/types/dashboards';
import { persist } from 'zustand/middleware';

interface DashboardListStoreType {
  dashboardList: Dashboards[];
  setDashboardList: (newList: Dashboards[]) => void;
  addDashboard: (newBoard: Dashboards) => void;
  deleteDashboard: (boardId: number) => void;
  clearDashboardList: () => void;
}

const addBoard = (prevList: Dashboards[], newBoard: Dashboards) => {
  const newList = [newBoard, ...prevList];
  return { dashboardList: newList };
};

const deleteBoard = (prevList: Dashboards[], boardId: number) => {
  const newList = prevList.filter((dashboard) => {
    dashboard.id !== boardId;
  });
  return { dashboardList: newList };
};

const useDashboardList = create(
  persist<DashboardListStoreType>(
    (set) => ({
      dashboardList: [],
      setDashboardList: (newList: Dashboards[]) => {
        set({
          dashboardList: newList,
        });
      },
      addDashboard: (newBoard) => {
        set((prevState) => addBoard(prevState.dashboardList, newBoard));
      },
      deleteDashboard: (boardId) => {
        set((prevState) => deleteBoard(prevState.dashboardList, boardId));
      },
      clearDashboardList: () => {
        set({ dashboardList: [] });
      },
    }),
    { name: 'dashboardList' }
  )
);

export default useDashboardList;
