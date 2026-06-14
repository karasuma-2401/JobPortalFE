import { privateApi } from '../api/api';
import type { JobPostResponse, PagedJobResponse } from '../types/jobpost';

export interface InviteCandidatePayload {
    jobSeekerId: number;
    jobPostId: number;
}

export const EmployerService = {
    setupProfile: async (formData: FormData) => {
        const response = await privateApi.post('/employer', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    },

    getProfile: async () => {
        const response = await privateApi.get('/employer');
        return response;
    },
    updateProfile: async (formData: FormData) => {
        const response = await privateApi.patch('/employer', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    },
    getRecentJobs: async () => {
        const response = await privateApi.get('/jobpost');
        // `privateApi` response interceptor returns `response.data` already.
        // Return the response directly (which is the unwrapped data) and let callers
        // normalize in case backend wraps results in a `data` field.
        return response;
    },

    getSavedCandidates: async () => {
        const response = await privateApi.get('/saved-candidates');
        return response.data;
    },
    getStatistics: async () => {
        const response = await privateApi.get('/employer/statistics');
        return response.data;
    },
    discoverCandidates: async (params: Record<string, unknown>) => {
        const response = await privateApi.get('/job-seeker/discover', {
            params,
        });
        return response;
    },
    getEmployerJobPosts: async (
        params: Record<string, unknown> = {}
    ): Promise<PagedJobResponse> => {
        const response = await privateApi.get('/employer/job-posts', {
            params,
        });
        const dataNode = ((response as unknown as Record<string, unknown>)
            ?.data ?? response) as Record<string, unknown>;

        return {
            items: (dataNode?.items as JobPostResponse[]) || [],
            totalItems: (dataNode?.totalItems as number) || 0,
        };
    },
    inviteCandidate: async (payload: InviteCandidatePayload) => {
        return await privateApi.post('/employer/candidate-invitations', payload);
    },
};
