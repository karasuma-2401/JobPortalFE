import { privateApi, publicApi } from '../api/api';
import type { JobDetailType } from '../types/jobseeker';

export const JobPostService = {
    getJobById: async (id: string): Promise<JobDetailType> => {
        return publicApi.get(`/jobpost/${id}`);
    },

    updateJob: async (
        id: string,
        payload: Record<string, unknown>
    ): Promise<JobDetailType> => {
        return privateApi.patch(`/jobpost/${id}`, payload);
    },
};
