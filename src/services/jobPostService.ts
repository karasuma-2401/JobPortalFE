import { privateApi, publicApi } from '../api/api';
import type { JobPostResponse, PagedJobResponse } from '../types/jobpost';

export const JobPostService = {
    getJobById: async (id: string): Promise<JobPostResponse> => {
        const response = await publicApi.get(`/jobpost/${id}`);
        return (
            ((response.data as Record<string, unknown>)
                .data as JobPostResponse) || response.data
        );
    },
    createJob: async (
        payload: Record<string, unknown>
    ): Promise<JobPostResponse> => {
        const response = await privateApi.post('/jobpost', payload);
        return (
            ((response.data as Record<string, unknown>)
                .data as JobPostResponse) || response.data
        );
    },

    updateJob: async (
        id: string,
        payload: Record<string, unknown>
    ): Promise<JobPostResponse> => {
        const response = await privateApi.patch(`/jobpost/${id}`, payload);
        return (
            ((response.data as Record<string, unknown>)
                .data as JobPostResponse) || response.data
        );
    },
    getEmployerJobs: async (
        params: Record<string, unknown>
    ): Promise<PagedJobResponse> => {
        const response = await privateApi.get('/jobpost', { params });
        const dataNode = (response.data as Record<string, unknown>)
            .data as Record<string, unknown>;

        return {
            items: (dataNode?.items as JobPostResponse[]) || [],
            totalItems: (dataNode?.totalElements as number) || 0,
        };
    },
    highlightJob: async (id: string): Promise<void> => {
        await privateApi.post(`/jobpost/${id}/highlight`);
    },
};
