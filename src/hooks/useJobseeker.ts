import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { JobseekerService } from '../services/jobseekerService';
import type { JobSeekerProfile } from '../types/jobseeker';
import { type ApiError } from '../api/api';

export const useJobseekerProfile = () => {
    return useQuery({
        queryKey: ['jobseekerProfile'],
        queryFn: async () => {
            const response = await JobseekerService.getProfile();
            const safeResponse = response as unknown as Record<string, unknown>;

            return (
                (safeResponse.data as JobSeekerProfile) ||
                (response as unknown as JobSeekerProfile)
            );
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useUpdateJobseekerProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) =>
            JobseekerService.updateProfile(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobseekerProfile'] });
            toast.success('Your profile has been updated successfully!');
        },
        onError: (error: ApiError) => {
            toast.error(
                error.message ||
                    'Failed to update profile. Please check your inputs.'
            );
        },
    });
};
