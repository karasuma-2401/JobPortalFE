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
            try {
                const profileResponse = await EmployerService.getProfile();
                // normalize profile
                // The API returns the employer profile as a plain object (see API schema).
                // Normalize: if the response already looks like EmployerProfile use it,
                // otherwise try to read `data` field as a fallback.
                const maybeProfile = profileResponse as unknown;
                let profile: EmployerProfile;
                if (
                    maybeProfile &&
                    typeof maybeProfile === 'object' &&
                    'companyName' in (maybeProfile as Record<string, unknown>)
                ) {
                    profile = maybeProfile as EmployerProfile;
                } else {
                    const profileData = maybeProfile as
                        | Record<string, unknown>
                        | undefined;
                    profile =
                        (profileData?.data as EmployerProfile) ||
                        (profileResponse as unknown as EmployerProfile);
                }

                const jobsResponse = await EmployerService.getRecentJobs();
                // Normalize jobs which might be returned as an array or wrapped in `data`.
                const rawJobs: unknown = jobsResponse;
                let jobs: JobResponse[] = [];

                if (Array.isArray(rawJobs)) {
                    jobs = rawJobs as JobResponse[];
                } else if (
                    rawJobs &&
                    typeof rawJobs === 'object' &&
                    'data' in (rawJobs as Record<string, unknown>)
                ) {
                    const maybeData = (rawJobs as Record<string, unknown>).data;
                    if (Array.isArray(maybeData))
                        jobs = maybeData as JobResponse[];
                }

                if (import.meta.env.DEV) {
                    console.debug(
                        'useEmployerProfilePageData: profileResponse=',
                        profileResponse
                    );
                    console.debug(
                        'useEmployerProfilePageData: jobsResponse=',
                        jobsResponse
                    );
                    console.debug(
                        'useEmployerProfilePageData: normalized jobs=',
                        jobs
                    );
                }

                return { profile, jobs };
            } catch (err) {
                // Log error and rethrow to let react-query handle retries
                console.error('useEmployerProfilePageData error:', err);
                throw err;
            }
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
