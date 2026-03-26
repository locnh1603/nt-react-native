export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  age: number;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface AuthResponse {
  status: boolean;
  data: {
    token: string;
  };
}

export interface ApiErrorResponse {
  status: boolean;
  error: {
    message?: string;
    [key: string]: any;
  };
}
