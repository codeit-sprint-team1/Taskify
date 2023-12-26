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

export interface MembersRawData {
  members: Members[];
  totalCount: number;
}
