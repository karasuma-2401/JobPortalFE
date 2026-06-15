import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type ApiError } from '../api/api';
import { ApplicationService } from '../services/applicationService';
import type { ApplicationStatus, JobApplication } from '../types/application';

export const useApplicationCount = (jobId: string | undefined) => {
    return useQuery({
        queryKey: ['applicationCount', jobId],
        queryFn: () => ApplicationService.getApplicationCount(Number(jobId)),
        enabled: !!jobId,
        staleTime: 30 * 1000,
    });
};

export const useApplications = (jobId: string | null) => {
    return useQuery({
        queryKey: ['jobApplications', jobId],
        queryFn: async (): Promise<JobApplication[]> => {
            const numericJobId = jobId ? Number(jobId) : undefined;
            return await ApplicationService.getApplications(numericJobId);
        },
    });
};

export const useUpdateApplicationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: number;
            status: ApplicationStatus;
        }) => ApplicationService.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
        },
        onError: (error: ApiError) => {
            toast.error(
                error.message || 'Failed to update application status.'
            );
        },
    });
};

export const useDeleteApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => ApplicationService.deleteApplication(id),
        onSuccess: () => {
            toast.success('Application deleted successfully.');
            queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Failed to delete application.');
        },
    });
};
