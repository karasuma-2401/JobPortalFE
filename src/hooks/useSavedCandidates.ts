import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type ApiError } from '../api/api';
import { SavedCandidateServices } from '../services/savedCandidateService';

export const useSavedCandidates = () => {
    return useQuery({
        queryKey: ['savedCandidates'],
        queryFn: async () => {
            const response = await SavedCandidateServices.getSavedCandidates();
            return response.data;
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
