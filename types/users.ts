export interface Signup {
  email: string;
  nickname: string;
  password: string;
}

export interface UserRawData {
  id: number;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditUserData {
  nickname: string;
  profileImageUrl: string;
}

export interface profileImageRawData {
  profileImageUrl: string;
}
