export interface Dashboards {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface DashboardsRawData {
  cursorId: number;
  totalCount: number;
  dashboards: Dashboards[];
}
