import { useQuery } from '@tanstack/react-query';  
import { privateApi } from '../api/api';

import type { JobSeekerProfile } from '../types/jobseeker'; 

export const useSeekerProfileById = (seekerId: number | null | undefined) => {  
    return useQuery<JobSeekerProfile | null>({  
        queryKey: ['seekerProfileById', seekerId],  
        queryFn: async () => {  
            if (!seekerId) return null;
            
            const response = await privateApi.get(`/job-seeker/${seekerId}`);  
            
            const safeResponse = response as unknown as { data: JobSeekerProfile }; 
            
            return safeResponse.data; 
        },  
        enabled: !!seekerId,  
        staleTime: 5 * 60 * 1000,  
    });  
};