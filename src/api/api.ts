import axios, {
    AxiosHeaders,
    type AxiosError,
    type InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'sonner';
import { AuthSessionService } from '../services/authSessionService';
import type { RefreshResponse } from '../types/auth';

export interface AxiosApiError {
    response?: {
        data: ApiError;
        status?: number;
    };
    message?: string;
}
export interface ApiError {
    message: string;
    code: string;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const normalizeApiError = (error: AxiosApiError): ApiError => {
    if (error.response?.data) {
        return error.response.data;
    }

    return {
        message: error.message || 'Something went wrong. Please try again.',
        code: String(error.response?.status || 'UNKNOWN_ERROR'),
    };
};

const BASE_URL =
    import.meta.env.VITE_BACKEND_URL;
let refreshTokenRequest: Promise<string> | null = null;
let isRedirectingToLogin = false;

const redirectToLogin = (message?: string) => {
    if (!isRedirectingToLogin && message) {
        toast.error(message);
    }

    if (isRedirectingToLogin) {
        return;
    }

    isRedirectingToLogin = true;
    AuthSessionService.clear();
    window.location.replace('/login');
};

const refreshAccessToken = async () => {
    const refreshToken = AuthSessionService.getRefreshToken();

    if (!refreshToken) {
        throw {
            message: 'Session expired. Please log in again.',
            code: 'UNAUTHORIZED',
        } satisfies ApiError;
    }

    if (!refreshTokenRequest) {
        refreshTokenRequest = (
            publicApi.get('/auth/refresh', {
                params: { token: refreshToken },
            }) as Promise<RefreshResponse>
        )
            .then((response) => {
                AuthSessionService.saveAccessToken(response.accessToken);
                return response.accessToken;
            })
            .finally(() => {
                refreshTokenRequest = null;
            });
    }

    return refreshTokenRequest;
};

export const publicApi = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

publicApi.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(normalizeApiError(error))
);

export const privateApi = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});
privateApi.interceptors.request.use(
    (config) => {
        const token = AuthSessionService.getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(normalizeApiError(error))
);

privateApi.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as RetryableRequestConfig;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                const headers = AxiosHeaders.from(originalRequest.headers);

                headers.set('Authorization', `Bearer ${newAccessToken}`);
                originalRequest.headers = headers;

                return privateApi(originalRequest);
            } catch (refreshError) {
                const apiError = normalizeApiError(
                    refreshError as AxiosApiError
                );

                redirectToLogin(apiError.message);
                return Promise.reject(apiError);
            }
        }

        return Promise.reject(normalizeApiError(error));
    }
);
