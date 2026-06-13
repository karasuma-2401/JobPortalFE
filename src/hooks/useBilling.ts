import { useQuery } from '@tanstack/react-query';
import { privateApi } from '../api/api';
import type { InvoicesResponse } from '../types/invoice';

export interface BillingOverview {
    planName: string;
    description: string;
    isCanceled: boolean;
    amount: string;
    dueDate: string;
    packageStarted: string;
    maxJobPosts: number;
    activeJobsCount: number;
    remainingJobPosts: number;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const useBillingOverviewData = () => {
    return useQuery({
        queryKey: ['billing-overview'],
        queryFn: async (): Promise<BillingOverview> => {
            const response = (await privateApi.get(
                '/payments/me/billing-overview'
            )) as unknown as ApiResponse<BillingOverview>;

            return response.data;
        },
    });
};

export const useInvoicesData = (limit: number, offset: number) => {
    return useQuery({
        queryKey: ['invoices', limit, offset],
        queryFn: async (): Promise<InvoicesResponse> => {
            const response = (await privateApi.get('/payments/me/invoices', {
                params: { limit, offset },
            })) as unknown as ApiResponse<InvoicesResponse>;

            return response.data;
        },
    });
};
