import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/api';
import type { Industry } from '../types/industry';

export const useIndustries = () => {
    return useQuery({
        queryKey: ['industries'],
        queryFn: async (): Promise<Industry[]> => {
            const response = (await publicApi.get(
                '/industries'
            )) as unknown as IndustryResponse;
            return response.data || [];
        },
        staleTime: 1000 * 60 * 60,
    });
};
