import { useQuery } from '@tanstack/react-query';
import { fetchInterviews } from '../services/interviewService';

export const useInterviews = () => {
    return useQuery({
        queryKey: ['candidate-interviews'],
        queryFn: fetchInterviews,
    });
};