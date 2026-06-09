import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobPostService } from '../services/jobPostService';
import { toast } from 'sonner';

export const useUpdateJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            payload,
        }: {
            id: string;
            payload: Record<string, any>;
        }) => {
            return await JobPostService.updateJob(id, payload);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['jobDetail', variables.id],
            });
            toast.success('Job updated successfully!');
        },
        onError: () => {
            toast.error('Failed to update job. Please check your inputs.');
        },
    });
};
