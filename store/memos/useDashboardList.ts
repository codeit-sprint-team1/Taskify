import { create } from 'zustand';
import { Dashboards } from '@/types/dashboards';

interface DashboardListStoreType {
  dashboardList: Dashboards[];
  setDashboardList: (newList: Dashboards[]) => void;
  addDashboard: (newBoard: Dashboards) => void;
}

const addBoard = (prevList: Dashboards[], newBoard: Dashboards) => {
  const newList = [newBoard, ...prevList];
  return { dashboardList: newList };
};

export const useDashboardList = create<DashboardListStoreType>((set) => ({
  dashboardList: [],
  setDashboardList: (newList) => {
    set({
      dashboardList: newList,
    });
  },
  addDashboard: (newBoard) => {
    set((prevState) => addBoard(prevState.dashboardList, newBoard));
  },
}));
