import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobPostService } from '../services/jobPostService';
import { toast } from 'sonner';

export const useJobActions = () => {
    const queryClient = useQueryClient();

    const promoteMutation = useMutation({
        mutationFn: async ({
            id,
            plan,
        }: {
            id: string;
            plan: 'featured' | 'highlight';
        }) => {
            if (plan === 'highlight') {
                return await JobPostService.highlightJob(id);
            } else {
                return await JobPostService.updateJob(id, { isFeatured: true });
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['employerJobs'] });
            toast.success(
                `Successfully promoted job as ${variables.plan.toUpperCase()}`
            );
        },
        onError: () => toast.error('Failed to promote job. Please try again.'),
    });

    const expireMutation = useMutation({
        mutationFn: async (id: string) => {
            return await JobPostService.updateJob(id, {
                status: 'EXPIRED',
                isUpdateExpires: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employerJobs'] });
            toast.success('Job marked as expired!');
        },
        onError: () => toast.error('Failed to update job status.'),
    });

    return {
        promoteJob: promoteMutation.mutate,
        isPromoting: promoteMutation.isPending,
        expireJob: expireMutation.mutate,
        isExpiring: expireMutation.isPending,
    };
};
