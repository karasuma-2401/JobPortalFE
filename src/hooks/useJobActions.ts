import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobPostService } from '../services/jobPostService';
import { toast } from 'sonner';

export const useJobActions = () => {
    const queryClient = useQueryClient();
    const expireMutation = useMutation({
        mutationFn: async (id: string) => {
            return await JobPostService.updateJobStatus(id, 'EXPIRED');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employerJobs'] });
            queryClient.invalidateQueries({ queryKey: ['employerDashboard'] });

            toast.success('Job marked as expired!');
        },
        onError: () => toast.error('Failed to update job status.'),
    });

    return {
        // promoteJob: promoteMutation.mutate,
        // isPromoting: promoteMutation.isPending,
        expireJob: expireMutation.mutate,
        isExpiring: expireMutation.isPending,
    };
};
