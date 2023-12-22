export interface Dashboard {
  id: number;
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

export interface Invitations {
  id: number;
  inviterUserId: number;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvitationsRawData {
  totalCount: number;
  invitations: Invitations[];
}
