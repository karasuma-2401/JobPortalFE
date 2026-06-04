import type { Role } from "../bases/constants/app";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  role: Role;
  email: string;
  password: string;
}

export interface VerifyResetPasswordRequest {
  token: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  role: Role;
  hasProfile: boolean;
}
