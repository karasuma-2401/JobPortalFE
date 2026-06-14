import { privateApi, publicApi } from '../api/api';
import type { JobPostResponse, PagedJobResponse } from '../types/jobpost';

export const JobPostService = {
    getJobById: async (id: string): Promise<JobPostResponse> => {
        const response = await publicApi.get(`/jobpost/${id}`);
        const normalizedResponse = ((
            response as unknown as Record<string, unknown>
        )?.data ?? response) as JobPostResponse;
        return normalizedResponse;
    },
    createJob: async (
        payload: Record<string, unknown>
    ): Promise<JobPostResponse> => {
        const response = await privateApi.post('/jobpost', payload);
        const normalizedResponse = ((
            response as unknown as Record<string, unknown>
        )?.data ?? response) as JobPostResponse;
        return normalizedResponse;
    },
    getJobForEdit: async (id: string) => {
        const response = await privateApi.get(`/jobpost/${id}/for-edit`);
        return response; 
    },
    updateJob: async (
        id: string,
        payload: Record<string, unknown>
    ): Promise<JobPostResponse> => {
        const response = await privateApi.patch(`/jobpost/${id}`, payload);
        const normalizedResponse = ((
            response as unknown as Record<string, unknown>
        )?.data ?? response) as JobPostResponse;
        return normalizedResponse;
    },
    getEmployerJobs: async (
        params: Record<string, unknown>
    ): Promise<PagedJobResponse> => {
        const response = await privateApi.get('/jobpost/me/dashboard', {
            params,
        });
        const dataNode = ((response as unknown as Record<string, unknown>)
            ?.data ?? response) as Record<string, unknown>;

        return {
            items: (dataNode?.content as JobPostResponse[]) || [],
            totalItems: (dataNode?.totalElements as number) || 0,
        };
    },
    highlightJob: async (id: string): Promise<void> => {
        await privateApi.post(`/jobpost/${id}/highlight`);
    },
};
