import { useMutation, useQuery } from '@tanstack/react-query';
import { PaymentService } from '../services/paymentService';

export const useCreatePayment = () => {
    return useMutation({
        mutationFn: PaymentService.createPayment,
    });
};

export const usePaymentStatus = (transactionRef: string | null) => {
    return useQuery({
        queryKey: ['paymentStatus', transactionRef],
        queryFn: () =>
            PaymentService.getPaymentStatus(transactionRef as string),
        enabled: !!transactionRef,
        refetchInterval: (query) => {
            const status = query.state?.data?.status;
            if (
                status === 'COMPLETED' ||
                status === 'FAILED' ||
                status === 'CANCELED'
            ) {
                return false;
            }
            return 3000;
        },
    });
};

export const usePlans = () => {
    return useQuery({
        queryKey: ['pricingPlans'],
        queryFn: PaymentService.getPlans,
        staleTime: 10 * 60 * 1000,
    });
};
