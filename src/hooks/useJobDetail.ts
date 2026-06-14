import { useQuery } from '@tanstack/react-query';
import { JobPostService } from '../services/jobPostService';
import type { JobDetail } from '../types/jobpost';

export const useJobDetail = (jobId: string | undefined) => {
    return useQuery({
        queryKey: ['jobDetail', jobId],
        queryFn: async (): Promise<JobDetail> => {
            if (!jobId) throw new Error('Job ID is required');
            return await JobPostService.getJobById(jobId);
        },
        enabled: !!jobId,
        staleTime: 5 * 60 * 1000,
    });
};
