export interface User {
  nickname: string;
  email: string;
  id: number;
}

export interface Invitations {
  id: number;
  inviter: User;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: User;
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
