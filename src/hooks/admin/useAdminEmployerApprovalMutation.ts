import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {AdminService } from '../../services/adminService';
import {  type EmployerProfileResponse} from '../../types/admin';

const employerApprovalsQueryKey = ['admin', 'employers'] as const;
const dashboardSummaryQueryKey = ['admin', 'dashboard', 'summary'] as const;

export const useAdminEmployerApprovalMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: {
            id: number;
            approvalStatus: string;
            rejectionReason?: string;
        }): Promise<EmployerProfileResponse> => {
            return AdminService.updateEmployerApproval(payload.id, {
                approvalStatus: payload.approvalStatus,
                rejectionReason: payload.rejectionReason,
            });
        },
        onSuccess: () => {
            toast.success('Employer approval updated');
            queryClient.invalidateQueries({ queryKey: employerApprovalsQueryKey });
            queryClient.invalidateQueries({ queryKey: dashboardSummaryQueryKey });
        },
        onError: (error: unknown) => {
            const message =
                typeof error === 'object' && error !== null && 'message' in error
                    ? String((error as { message?: unknown }).message)
                    : 'Failed to update approval';
            toast.error(message);
        },
    });
};

