import { useMutation, useQuery } from '@tanstack/react-query';
import { PaymentService } from '../services/paymentService';

export const useCreateCheckout = () => {
    return useMutation({
        mutationFn: (planId: number) => PaymentService.createCheckout(planId),
    });
};

export const useConfirmPayment = () => {
    return useMutation({
        mutationFn: (paymentId: number) =>
            PaymentService.confirmPayment(paymentId),
    });
};

export const usePlans = () => {
    return useQuery({
        queryKey: ['pricingPlans'],
        queryFn: PaymentService.getPlans,
        staleTime: 10 * 60 * 1000,
    });
};
