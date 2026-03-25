export interface User {
  username: string;
  token?: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  status: boolean;
  data: UserProfile;
}
