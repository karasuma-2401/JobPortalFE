import { useQuery } from '@tanstack/react-query';
import { ApplicationService } from '../services/applicationService';
import type { JobApplicationDetail } from '../types/application';

export const useCandidateProfile = (
    applicationId: number | null | undefined
) => {
    return useQuery({
        queryKey: ['candidateProfileDetail', applicationId],
        queryFn: async (): Promise<JobApplicationDetail> => {
            if (!applicationId) throw new Error('Application ID is required');

            const response =
                await ApplicationService.getApplicationById(applicationId);
            const result = response as unknown as Record<string, unknown>;
            if (result && result.data) {
                return result.data as JobApplicationDetail;
            }

            return response as JobApplicationDetail;
        },
        enabled: !!applicationId,
        staleTime: 5 * 60 * 1000,
    });
};
