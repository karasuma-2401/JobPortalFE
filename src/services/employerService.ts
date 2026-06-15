import { privateApi } from '../api/api';
import type { PagedJobResponse } from '../types/jobpost';

export interface InviteCandidatePayload {
    jobSeekerId: number;
    jobPostId: number;
}
interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export const EmployerService = {
    setupProfile: async (formData: FormData) => {
        return await privateApi.post('/employer', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    getProfile: async () => {
        return await privateApi.get('/employer');
    },

    updateProfile: async (formData: FormData) => {
        return await privateApi.patch('/employer', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    getRecentJobs: async <T = unknown>(
        params?: Record<string, unknown>
    ): Promise<T> => {
        const response = (await privateApi.get('/employer/job-posts/recent', {
            params,
        })) as ApiResponse<T>;
        return response.data;
    },

    getStatistics: async <T = unknown>(): Promise<T> => {
        const response = (await privateApi.get(
            '/employer/statistics'
        )) as ApiResponse<T>;
        return response.data;
    },

    getSavedCandidates: async <T = unknown>(): Promise<T> => {
        const response = (await privateApi.get(
            '/saved-candidates'
        )) as ApiResponse<T>;
        return response.data;
    },

    discoverCandidates: async (params: Record<string, unknown>) => {
        return await privateApi.get('/job-seeker/discover', { params });
    },

    getEmployerJobPosts: async (
        params: Record<string, unknown> = {}
    ): Promise<PagedJobResponse> => {
        const response = (await privateApi.get('/employer/job-posts', {
            params,
        })) as ApiResponse<PagedJobResponse>;

        return {
            items: response.data?.items || [],
            totalItems: response.data?.totalItems || 0,
        };
    },

    inviteCandidate: async (payload: InviteCandidatePayload) => {
        return await privateApi.post(
            '/employer/candidate-invitations',
            payload
        );
    },
};
