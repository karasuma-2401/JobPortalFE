import { publicApi, privateApi } from '../api/api';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    VerifyResetPasswordRequest,
    UserResponse,
} from '../types/auth';

export const AuthService = {
    login: async (payload: LoginRequest): Promise<LoginResponse> => {
        return publicApi.post('/auth/login', payload);
    },

    getMe: async (): Promise<UserResponse> => {
        return privateApi.get('/auth/me');
    },
    register: async (payload: RegisterRequest) => {
        return publicApi.post('/auth/register', payload);
    },

    verifyEmail: async (token: string) => {
        return publicApi.get('/auth/verify', { params: { token } });
    },
    requestPasswordReset: async (email: string) => {
        return publicApi.get('/auth/reset-password', { params: { email } });
    },

    verifyResetPassword: async (payload: VerifyResetPasswordRequest) => {
        return publicApi.post('/auth/verify-reset-password', payload);
    },
    refresh: async (token: string) => {
        return await publicApi.get(`/auth/refresh?token=${token}`);
    },
};
