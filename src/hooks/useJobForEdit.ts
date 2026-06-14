import { useQuery } from '@tanstack/react-query';
import { JobPostService } from '../services/jobPostService';

export const useJobForEdit = (id: string | undefined) => {
    return useQuery({
        queryKey: ['jobForEdit', id],
        queryFn: async () => {
            if (!id) throw new Error('Job ID is required');
            const data = await JobPostService.getJobForEdit(id);
            return data; 
        },
        enabled: !!id,
        staleTime: 0, // Luôn fetch data mới nhất khi edit
    });
};