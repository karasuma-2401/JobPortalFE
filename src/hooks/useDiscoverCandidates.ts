import { useQuery } from '@tanstack/react-query';
import { EmployerService } from '../services/employerService';

export const useDiscoverCandidates = (filters: {
    search?: string;
    jobLevel?: string;
    limit?: number;
    offset?: number;
}) => {
    return useQuery({
        queryKey: ['discoverCandidates', filters],
        queryFn: async () => {
            const response = await EmployerService.discoverCandidates(filters);
            const result = response as any;
            return result.data; // this is PageResponse<JobSeekerResponse>
        },
    });
};
