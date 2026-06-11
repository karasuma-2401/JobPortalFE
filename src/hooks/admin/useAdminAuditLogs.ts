import { useQuery } from '@tanstack/react-query';
import {  type AuditLogResponse, type PageResponse } from '../../types/admin';
import {AdminService} from '../../services/adminService';

export type AdminAuditActionType = 'CREATE' | 'UPDATE' | 'DELETE';
export type AdminAuditEntityName = string;

export interface UseAdminAuditLogsParams {
    searchQuery: string;
    actionType: AdminAuditActionType | 'All';
    entityFilter: AdminAuditEntityName | 'All';
    startDate: string; // yyyy-mm-dd
    endDate: string; // yyyy-mm-dd
    currentPage: number;
    itemsPerPage: number;
}

export const useAdminAuditLogs = (params: UseAdminAuditLogsParams) => {
    return useQuery({
        queryKey: [
            'admin',
            'audit',
            {
                searchQuery: params.searchQuery,
                actionType: params.actionType,
                entityName: params.entityFilter,
                startDate: params.startDate,
                endDate: params.endDate,
                offset: (params.currentPage - 1) * params.itemsPerPage,
                limit: params.itemsPerPage,
            },
        ],
        queryFn: async (): Promise<PageResponse<AuditLogResponse>> => {
            return AdminService.getAuditLogs({
                search: params.searchQuery || undefined,
                actionType: params.actionType === 'All' ? undefined : params.actionType,
                entityName: params.entityFilter === 'All' ? undefined : params.entityFilter,
                startDate: params.startDate || undefined,
                endDate: params.endDate || undefined,
                offset: (params.currentPage - 1) * params.itemsPerPage,
                limit: params.itemsPerPage,
            });
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

