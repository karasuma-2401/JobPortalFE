import { useQuery } from '@tanstack/react-query';
import { AdminService} from '../../services/adminService';
import {type EmployerProfileResponse, type PageResponse } from '../../types/admin';

export type EmployerApprovalTab = 'Pending' | 'Approved' | 'Rejected';

export interface UseAdminEmployersParams {
    tab: EmployerApprovalTab;
    searchQuery: string;
    currentPage: number;
    itemsPerPage: number;
}

const toStatusParam = (tab: EmployerApprovalTab) => {
    switch (tab) {
        case 'Pending':
            return 'PENDING';
        case 'Approved':
            return 'APPROVED';
        case 'Rejected':
            return 'REJECTED';
        default:
            return 'PENDING';
    }
};

const queryKeyBase = ['admin', 'employers'] as const;

export const useAdminEmployers = (params: UseAdminEmployersParams) => {
    const statusParam = toStatusParam(params.tab);

    return useQuery({
        queryKey: [
            ...queryKeyBase,
            {
                tab: params.tab,
                searchQuery: params.searchQuery,
                status: statusParam,
                offset: (params.currentPage - 1) * params.itemsPerPage,
                limit: params.itemsPerPage,
            },
        ],
        queryFn: async (): Promise<PageResponse<EmployerProfileResponse>> => {
            return AdminService.getEmployers({
                search: params.searchQuery || undefined,
                status: statusParam,
                offset: (params.currentPage - 1) * params.itemsPerPage,
                limit: params.itemsPerPage,
            });
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

