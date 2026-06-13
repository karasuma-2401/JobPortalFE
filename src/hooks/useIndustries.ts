import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/api';
import type { Industry, IndustryResponse } from '../types/industry';

export const useIndustries = () => {
    return useQuery({
        queryKey: ['industries'],
        queryFn: async (): Promise<Industry[]> => {
            const response = (await publicApi.get(
                '/industry?limit=100'
            )) as unknown as IndustryResponse;
            return response.data?.items || [];
        },
        staleTime: 1000 * 60 * 60,
    });
};
