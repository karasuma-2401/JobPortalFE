import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { EmployerService } from '../services/employerService';
import { type ApiError } from '../api/api';
import type { EmployerProfile, JobResponse } from '../types/employer';

export const useSetupEmployer = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (formData: FormData) =>
            EmployerService.setupProfile(formData),
        onSuccess: () => {
            toast.success('Employer profile created successfully!');
            navigate('/employer/setup/success');
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};

export interface EmployerProfilePageData {
    profile: EmployerProfile;
    jobs: JobResponse[];
}

export const useEmployerProfilePageData = () => {
    return useQuery<EmployerProfilePageData>({
        queryKey: ['employerProfilePage'],
        queryFn: async () => {
            const profileResponse = await EmployerService.getProfile();
            const profileData = profileResponse as unknown as Record<
                string,
                unknown
            >;
            const profile =
                (profileData.data as EmployerProfile) ||
                (profileResponse as unknown as EmployerProfile);

            const jobs =
                (await EmployerService.getRecentJobs()) as JobResponse[];

            return { profile, jobs };
        },
    });
};

export const useEmployerProfile = () => {
    return useQuery({
        queryKey: ['employerProfile'],
        queryFn: async () => {
            const response = await EmployerService.getProfile();
            const safeResponse = response as unknown as Record<string, unknown>;

            return (
                (safeResponse.data as EmployerProfile) ||
                (response as unknown as EmployerProfile)
            );
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useUpdateEmployerProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) =>
            EmployerService.updateProfile(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employerProfile'] });
            queryClient.invalidateQueries({
                queryKey: ['employerProfilePage'],
            });
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
