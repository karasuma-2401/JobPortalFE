import type { Role } from '../bases/constants/app';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshResponse {
    accessToken: string;
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
    email: string;
    roles: Role[];
    hasProfile: boolean;
    employerApprovalStatus: string | null;
    avatar?: string | null;
    name?: string | null;
}
