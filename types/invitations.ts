export interface Invitee {
  nickname: string;
  email: string;
  id: number;
}

export interface Invitations {
  id: number;
  inviterUserId: number;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: Invitee;
  inviteAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvitationsRawData {
  cursorId: number;
  invitations: Invitations[];
}

export interface InviteAccepted {
  inviteAccepted: boolean;
}
