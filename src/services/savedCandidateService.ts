import { privateApi } from '../api/api';
import type { SavedCandidatesResponse } from '../types/savedCandidates';
import type { ApiResponse } from '../types/jobseeker';

export const SavedCandidateServices = {
    getSavedCandidates: async (): Promise<SavedCandidatesResponse[]> => {
        const response = (await privateApi.get(
            '/saved-candidates'
        )) as ApiResponse<SavedCandidatesResponse[]>;
        return response.data;
    },

    saveCandidate: async (jobSeekerId: number) => {
        const response = await privateApi.post('/saved-candidates', {
            jobSeekerId,
        });
        return response;
    },

    removeSavedCandidates: async (jobSeekerId: number) => {
        const response = await privateApi.delete(
            `/saved-candidates/${jobSeekerId}`
        );
        return response;
    },
};
