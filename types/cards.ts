export interface CreateCard {
  assigneeUserId?: number | null;
  dashboardId?: number;
  columnId?: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string | null;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  dashboardId: number;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardsList {
  cursorId: number;
  totalCount: number;
  cards: Card[];
}

export interface ModifyingCard {
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}
