import { Invitations } from './invitations';

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

export interface DashboardsInvitation {
  totalCount: number;
  invitations: Invitations[];
}
