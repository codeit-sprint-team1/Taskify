import { UserRawData } from './users';

export type CommentsAuthor = Pick<
  UserRawData,
  'profileImageUrl' | 'nickname' | 'id'
>;

export interface Comments {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: CommentsAuthor;
}

export interface CreateComment {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface CommentsRawData {
  cursorId: number;
  comments: Comments[];
}
