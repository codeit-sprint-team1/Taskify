export interface Dashboard {
  id: string | string[] | undefined;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
}
