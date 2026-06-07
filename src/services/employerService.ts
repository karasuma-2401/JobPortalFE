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
    getRecentJobs: async () => {
        const response = await privateApi.get('/jobpost');
        return response.data;
    },
    getSavedCandidates: async () => {
        const response = await privateApi.get('/saved-candidates');
        return response.data;
    },
};
