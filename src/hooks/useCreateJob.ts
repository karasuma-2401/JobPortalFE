import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobPostService } from '../services/jobPostService';
import { toast } from 'sonner';

export const useCreateJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: Record<string, unknown>) => {
            return await JobPostService.createJob(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employerJobs'] });
            toast.success('Job posted successfully!');
        },
        onError: () => {
            toast.error('Failed to post job. Please check your inputs.');
        },
    });
};
