import { privateApi } from '../api/api';
import type {
    ApplicationStatus,
    JobApplicationDetail,
} from '../types/application';

export const ApplicationService = {
    getApplications: async (jobPostId?: number) => {
        const params: Record<string, unknown> = {
            limit: 100,
        };
        if (jobPostId) {
            params.jobPostId = jobPostId;
        }

        const response = await privateApi.get('/job-application', { params });
        return response.data;
    },

    getApplicationById: async (id: number): Promise<JobApplicationDetail> => {
        const response = await privateApi.get(`/job-application/${id}`);
        return (
            ((response.data as Record<string, unknown>)
                .data as JobApplicationDetail) || response.data
        );
    },

    updateStatus: async (id: number, status: ApplicationStatus) => {
        // API PATCH chỉ nhận JSON body
        const response = await privateApi.patch(`/job-application/${id}`, {
            status,
        });
        return response.data;
    },

    deleteApplication: async (id: number) => {
        const response = await privateApi.delete(`/job-application/${id}`);
        return response.data;
    },
};
