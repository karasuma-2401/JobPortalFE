import { privateApi } from '../api/api';
import type {
    BillingOverview,
    InvoicesFilterResponse,
    TransactionDetails,
} from '../types/billing';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const BillingService = {
    getBillingOverview: async (): Promise<BillingOverview> => {
        const response = (await privateApi.get(
            '/payments/me/billing-overview'
        )) as unknown as ApiResponse<BillingOverview>;
        return response.data;
    },

    getInvoices: async (
        page: number,
        size: number,
        startDate?: string,
        endDate?: string
    ): Promise<InvoicesFilterResponse> => {
        const response = (await privateApi.get('/payments/me/invoices/filter', {
            params: {
                page,
                size,
                ...(startDate && { startDate }),
                ...(endDate && { endDate }),
            },
        })) as unknown as ApiResponse<InvoicesFilterResponse>;
        return response.data || { items: [], totalItems: 0, page: 0, size };
    },

    getTransactionDetails: async (
        transactionRef: string
    ): Promise<TransactionDetails> => {
        const response = (await privateApi.get(
            `/payments/transaction/${transactionRef}`
        )) as unknown as ApiResponse<TransactionDetails>;
        return response.data;
    },
};
