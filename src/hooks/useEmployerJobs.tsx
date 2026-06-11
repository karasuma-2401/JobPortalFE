import { useQuery } from '@tanstack/react-query';
import { JobPostService } from '../services/jobPostService';

export const useEmployerJobs = (
    filterStatus: string,
    page: number,
    limit: number
) => {
    return useQuery({
        queryKey: ['employerJobs', filterStatus, page, limit],
        queryFn: async () => {
            const params: Record<string, unknown> = {
                offset: (page - 1) * limit,
                limit,
            };

            if (filterStatus !== 'All Jobs') {
                params.status = filterStatus === 'Active' ? 'OPEN' : 'EXPIRED';
            }

            return await JobPostService.getEmployerJobs(params);
        },
        staleTime: 5 * 60 * 1000,
    });
};
