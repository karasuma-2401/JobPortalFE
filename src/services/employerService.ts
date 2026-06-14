import { privateApi } from '../api/api';

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
};
