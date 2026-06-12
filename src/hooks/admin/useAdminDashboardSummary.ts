import { useQuery } from '@tanstack/react-query';
import {  type AdminDashboardSummary } from '../../types/admin';
import {AdminService} from '../../services/adminService';

const queryKey = ['admin', 'dashboard', 'summary'] as const;

export const useAdminDashboardSummary = () => {
    return useQuery({
        queryKey,
        queryFn: async (): Promise<AdminDashboardSummary> => {
            return AdminService.getDashboardSummary();
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

