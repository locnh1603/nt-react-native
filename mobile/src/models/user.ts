export type UserRole = 'user' | 'admin';

export interface User {
  username: string;
  token?: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  age: number;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export interface UserProfileResponse {
  status: boolean;
  data: UserProfile;
}

export interface UserListResponse {
  status: boolean;
  data: UserProfile[];
}

export interface UpdateUserPayload {
  age?: number;
  firstName?: string;
  lastName?: string;
}

export interface ChangeRolePayload {
  role: UserRole;
}
