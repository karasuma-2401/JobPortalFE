import { useQuery } from '@tanstack/react-query';
import { BillingService } from '../services/billingService';

export const useBillingOverviewData = () => {
    return useQuery({
        queryKey: ['billing-overview'],
        queryFn: () => BillingService.getBillingOverview(),
    });
};

export const useInvoicesData = (
    page: number,
    size: number,
    startDate?: string,
    endDate?: string
) => {
    return useQuery({
        queryKey: ['invoices', page, size, startDate, endDate],
        queryFn: () =>
            BillingService.getInvoices(page - 1, size, startDate, endDate),
    });
};
export const useTransactionDetails = (transactionRef: string | null) => {
    return useQuery({
        queryKey: ['transaction', transactionRef],
        queryFn: () =>
            BillingService.getTransactionDetails(transactionRef as string),
        enabled: !!transactionRef,
    });
};
