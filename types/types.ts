export interface Dashboard {
  id: string | string[] | undefined;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
}

export interface Members {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isOwner: boolean;
  userId: number;
}
