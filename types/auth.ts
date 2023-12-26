export interface Login {
  email: string;
  password: string;
}

export interface LoginData {
  id: number | null;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRawData {
  user: LoginData;
  accessToken: string;
}

export interface PasswordEdit {
  password: string;
  newPassword: string;
}
