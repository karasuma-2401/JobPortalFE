import { useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type PaymentStatus } from './components/StatusBadge';
import PaymentDetailDrawer, {
    type Payment,
} from './components/PaymentDetailDrawer';
import PaymentFilterBar from './components/PaymentFilterBar';
import PaymentTable from './components/PaymentTable';
import ConfirmModal from '../../../components/ui/ConfirmModal';
import TablePagination from '../../../components/ui/TablePagination';
import { AdminService } from '../../../services/adminService';
import type { PaymentResponse } from '../../../types/admin';

const paymentQueryKey = ['admin', 'payments'] as const;

const toApiStatus = (status: PaymentStatus | 'All') => {
    if (status === 'All') return undefined;

    return status.toUpperCase();
};

const toPaymentStatus = (status: PaymentResponse['status']): PaymentStatus => {
    switch (status) {
        case 'COMPLETED':
            return 'Completed';
        case 'FAILED':
            return 'Failed';
        case 'CANCELED':
            return 'Canceled';
        case 'PENDING':
        default:
            return 'Pending';
    }
};

const formatPaymentDate = (date?: string) => {
    if (!date) return 'N/A';

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return parsed.toLocaleString();
};

const mapPayment = (payment: PaymentResponse): Payment => ({
    id: String(payment.id),
    user: payment.employerName || 'Unknown employer',
    email: payment.payerEmail || 'N/A',
    plan: payment.planName || 'N/A',
    amount: payment.cost || 0,
    date: formatPaymentDate(payment.createdAt),
    status: toPaymentStatus(payment.status),
    paymentMethod: payment.method || 'N/A',
    transactionRef: payment.transactionRef || 'N/A',
});

export default function PaymentManagementPage() {
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'All'>(
        'All'
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
        null
    );
    const [activeDropdownId, setActiveDropdownId] = useState<string | null>(
        null
    );

    const [confirmConfig, setConfirmConfig] = useState<{
        isOpen: boolean;
        id: string | null;
        newStatus: PaymentStatus | null;
    }>({ isOpen: false, id: null, newStatus: null });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [
            ...paymentQueryKey,
            {
                searchQuery,
                statusFilter,
                page: currentPage - 1,
                size: itemsPerPage,
            },
        ],
        queryFn: () =>
            AdminService.getPayments({
                search: searchQuery || undefined,
                status: toApiStatus(statusFilter),
                page: currentPage - 1,
                size: itemsPerPage,
            }),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const payments = useMemo<Payment[]>(() => {
        return (data?.items ?? []).map(mapPayment);
    }, [data]);

    const totalItems = data?.totalItems ?? 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const selectedPayment = useMemo(() => {
        return payments.find((p) => p.id === selectedPaymentId) || null;
    }, [payments, selectedPaymentId]);

    const updatePaymentStatusMutation = useMutation({
        mutationFn: ({
            id,
            newStatus,
        }: {
            id: string;
            newStatus: PaymentStatus;
        }) => AdminService.updatePaymentStatus(Number(id), toApiStatus(newStatus) || ''),
        onSuccess: (_data, variables) => {
            toast.success(
                `Transaction ${variables.id} marked as ${variables.newStatus}`
            );
            setSelectedPaymentId(null);
            queryClient.invalidateQueries({ queryKey: paymentQueryKey });
        },
        onError: (mutationError: { message?: string }) => {
            toast.error(
                mutationError.message || 'Failed to update payment status'
            );
        },
        onSettled: () => {
            setConfirmConfig({ isOpen: false, id: null, newStatus: null });
        },
    });

    const handleUpdateStatus = (id: string, newStatus: PaymentStatus) => {
        setConfirmConfig({ isOpen: true, id, newStatus });
        setActiveDropdownId(null);
    };

    const executeStatusUpdate = () => {
        const { id, newStatus } = confirmConfig;
        if (id && newStatus) {
            updatePaymentStatusMutation.mutate({ id, newStatus });
            return;
        }
        setConfirmConfig({ isOpen: false, id: null, newStatus: null });
    };

    const handleItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    };

    return (
        <div className='animate-in fade-in duration-500 h-full flex flex-col'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Payment Management
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        Review and manage employer transactions
                    </p>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden'>
                <PaymentFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={(query) => {
                        setSearchQuery(query);
                        setCurrentPage(1);
                    }}
                    statusFilter={statusFilter}
                    onStatusChange={(status) => {
                        setStatusFilter(status);
                        setCurrentPage(1);
                    }}
                />

                {isLoading ? (
                    <div className='flex-1 flex items-center justify-center p-12'>
                        <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
                    </div>
                ) : isError ? (
                    <div className='flex-1 flex items-center justify-center p-12 text-sm text-red-600'>
                        {(error as { message?: string })?.message ||
                            'Failed to load payments.'}
                    </div>
                ) : (
                    <PaymentTable
                        payments={payments}
                        onViewDetail={setSelectedPaymentId}
                        activeDropdownId={activeDropdownId}
                        onToggleDropdown={setActiveDropdownId}
                        onUpdateStatus={handleUpdateStatus}
                    />
                )}

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            </div>

            <PaymentDetailDrawer
                isOpen={!!selectedPaymentId}
                onClose={() => setSelectedPaymentId(null)}
                payment={selectedPayment}
                onUpdateStatus={handleUpdateStatus}
            />

            <ConfirmModal
                isOpen={confirmConfig.isOpen}
                title='Update Payment Status'
                message={`Are you sure you want to mark transaction ${confirmConfig.id} as ${confirmConfig.newStatus}?`}
                onConfirm={executeStatusUpdate}
                onCancel={() =>
                    setConfirmConfig({
                        isOpen: false,
                        id: null,
                        newStatus: null,
                    })
                }
                confirmText={`Mark as ${confirmConfig.newStatus}`}
                isLoading={updatePaymentStatusMutation.isPending}
                isDanger={confirmConfig.newStatus === 'Failed'}
            />
        </div>
    );
}
