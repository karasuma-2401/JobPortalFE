import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type ApiError } from '../api/api';
import { SavedCandidateServices } from '../services/savedCandidateService';

export const useSavedCandidates = () => {
    return useQuery({
        queryKey: ['savedCandidates'],
        queryFn: async () => {
            return await SavedCandidateServices.getSavedCandidates();
        },
    });
};

export const useSaveCandidate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (jobSeekerId: number) =>
            SavedCandidateServices.saveCandidate(jobSeekerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['savedCandidates'] });
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Failed to save candidate');
        },
    });
};

export const useRemoveSavedCandidate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (jobSeekerId: number) =>
            SavedCandidateServices.removeSavedCandidates(jobSeekerId),
        onSuccess: () => {
            toast.success('Removed candidate from saved list');
            queryClient.invalidateQueries({ queryKey: ['savedCandidates'] });
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
