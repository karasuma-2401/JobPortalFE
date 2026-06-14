import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthService } from '../services/authService';
import { registerDeviceToken } from '../lib/fcm';
import type {
    LoginRequest,
    RegisterRequest,
    VerifyResetPasswordRequest,
} from '../types/auth';
import { type ApiError } from '../api/api';
import { AuthSessionService } from '../services/authSessionService';
import { getDefaultAuthenticatedRoute } from '../contexts/auth/auth-utils';
import {
    consumePostAuthRedirect,
    readPostAuthRedirect,
} from '../utils/post-auth-redirect';

interface AuthFlowError extends ApiError {
    type?: 'LOGIN_ERROR' | 'PROFILE_ERROR';
    originalError?: ApiError;
}

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (payload: LoginRequest) => {
            let tokens;
            try {
                const deviceToken = await registerDeviceToken();
                console.log('Device Token nhan duo la: ', deviceToken);
                tokens = await AuthService.login({
                    ...payload,
                    ...(deviceToken ? { deviceToken } : {}),
                });
            } catch (err) {
                const apiError = err as ApiError;

                return Promise.reject({
                    ...apiError,
                    type: 'LOGIN_ERROR',
                    originalError: apiError,
                });
            }
            AuthSessionService.saveAccessToken(tokens.accessToken);

            if (tokens.refreshToken) {
                AuthSessionService.saveRefreshToken(tokens.refreshToken);
            }

            try {
                const user = await AuthService.getMe();
                AuthSessionService.saveUser(user);
                return user;
            } catch (err) {
                const apiError = err as ApiError;

                return Promise.reject({
                    ...apiError,
                    type: 'PROFILE_ERROR',
                    originalError: apiError,
                });
            }
        },
        onSuccess: (user) => {
            toast.success('Login successful!');
            const pendingRedirect = readPostAuthRedirect();
            const shouldUsePendingRedirect =
                Array.isArray(user.roles) &&
                user.roles.includes('SEEKER') &&
                user.hasProfile &&
                pendingRedirect;

            navigate(
                shouldUsePendingRedirect
                    ? consumePostAuthRedirect() ||
                          getDefaultAuthenticatedRoute(user)
                    : getDefaultAuthenticatedRoute(user),
                { replace: true }
            );
        },
        onError: (error: ApiError) => {
            const authError = error as AuthFlowError;

            if (authError?.type === 'LOGIN_ERROR') {
                toast.error(error.message);
            } else if (authError?.type === 'PROFILE_ERROR') {
                toast.error(
                    'Login successful, but failed to fetch profile. Please check the Backend API!'
                );
                console.error(
                    'Details of /auth/me error:',
                    authError.originalError
                );
            } else {
                toast.error('An unexpected error occurred during processing.');
                console.error('Unknown error:', error);
            }
        },
    });
};
export const useRegister = () => {
    return useMutation({
        mutationFn: (payload: RegisterRequest) => AuthService.register(payload),
        onSuccess: () => {
            toast.success(
                'Registration successful! Please check your email to verify your account.'
            );
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};

export const useVerify = () => {
    return useMutation({
        mutationFn: (token: string) => AuthService.verifyEmail(token),
        onSuccess: () => {
            toast.success('Your account has been verified successfully');
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};

export const useRequestPasswordReset = () => {
    return useMutation({
        mutationFn: (email: string) => AuthService.requestPasswordReset(email),
        onSuccess: () => {
            toast.success('Password reset link sent! Please check your email.');
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};

export const useVerifyResetPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (payload: VerifyResetPasswordRequest) =>
            AuthService.verifyResetPassword(payload),
        onSuccess: () => {
            toast.success(
                'Password updated successfully! Please log in again.'
            );
            navigate('/login');
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
