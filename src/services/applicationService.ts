import { privateApi } from '../api/api';
import type {
    ApplicationStatus,
    JobApplicationDetail,
    JobApplication,
} from '../types/application';

export const ApplicationService = {
    getApplications: async (jobPostId?: number): Promise<JobApplication[]> => {
        const params: Record<string, unknown> = { limit: 100 };
        if (jobPostId) {
            params.jobPostId = jobPostId;
        }

        const response = await privateApi.get('/job-application', { params });

        const root = response as unknown as Record<string, unknown>;
        if (Array.isArray(root)) return root as JobApplication[];

        const dataNode = root?.data as Record<string, unknown> | undefined;
        if (Array.isArray(dataNode)) return dataNode as JobApplication[];
        if (Array.isArray(dataNode?.items))
            return dataNode.items as JobApplication[];
        if (Array.isArray(dataNode?.content))
            return dataNode.content as JobApplication[];
        if (Array.isArray(root?.items)) return root.items as JobApplication[];
        if (Array.isArray(root?.content))
            return root.content as JobApplication[];

        return [];
    },

    getApplicationCount: async (jobPostId: number): Promise<number> => {
        const response = await privateApi.get('/job-application', {
            params: { jobPostId, limit: 1, offset: 0 },
        });
        const root = response as unknown as Record<string, unknown>;
        const dataNode = root?.data as Record<string, unknown> | undefined;

        return (
            (dataNode?.totalElements as number) ||
            (dataNode?.totalItems as number) ||
            (root?.totalElements as number) ||
            (root?.totalItems as number) ||
            0
        );
    },

    getApplicationById: async (id: number): Promise<JobApplicationDetail> => {
        const response = await privateApi.get(`/job-application/${id}`);
        const root = response as unknown as Record<string, unknown>;

        return (
            (root?.data as JobApplicationDetail) ||
            (response as unknown as JobApplicationDetail)
        );
    },

    updateStatus: async (id: number, status: ApplicationStatus) => {
        const response = await privateApi.patch(`/job-application/${id}`, {
            status,
        });
        const root = response as unknown as Record<string, unknown>;
        return root?.data ?? response;
    },

    deleteApplication: async (id: number) => {
        return await privateApi.delete(`/job-application/${id}`);
    },
};
