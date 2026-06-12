import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../../services/adminService';
import { type EmployerProfileResponse} from '../../types/admin';

const queryKeyBase = ['admin', 'employers'] as const;

export const useAdminEmployerById = (id?: number) => {
    return useQuery({
        queryKey: [...queryKeyBase, 'detail', id],
        queryFn: async (): Promise<EmployerProfileResponse> => {
            if (id == null) throw new Error('Missing employer id');
            return AdminService.getEmployerById(id);
        },
        enabled: id != null,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

