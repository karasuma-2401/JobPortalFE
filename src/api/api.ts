import axios from 'axios';
import { toast } from 'sonner';
import { TokenType } from '../bases/enums/jwt.enum';
export interface AxiosApiError {
    response: {
        data: ApiError;
    };
}
export interface ApiError {
    message: string;
    code: string;
}

const normalizeApiError = (error: AxiosApiError) => {
    const responseData = error.response.data;

    return responseData;
};

const BASE_URL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api';

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
        const token = localStorage.getItem(TokenType.ACCESS_TOKEN);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(normalizeApiError(error))
);

privateApi.interceptors.response.use(
    (response) => {
        const data = response.data;


        // Unwrap ApiResponse<T> that backend returns (success/message/data)
        // If backend does not wrap, just return original payload.
        if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
            // Backend: { success, message?, data }
            return (data as { data: unknown }).data;
        }

        return data;
    },
    async (error) => {
        if (error.response?.status === 401) {
            const token = localStorage.getItem(TokenType.REFRESH_TOKEN);

            if (!token) {
                toast.error('Session expired. Please log in again.');
                localStorage.removeItem(TokenType.ACCESS_TOKEN);
                localStorage.removeItem(TokenType.REFRESH_TOKEN);
                window.location.href = '/login';
                return Promise.reject(normalizeApiError(error));
            }

            window.location.href = '/login';
        }

        return Promise.reject(normalizeApiError(error));
    }
);
