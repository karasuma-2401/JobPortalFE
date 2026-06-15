import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PaymentService } from '../services/paymentService';
import { type ApiError } from '../api/api';

export const usePlans = () => {
    return useQuery({
        queryKey: ['plans'],
        queryFn: PaymentService.getPlans,
        staleTime: 1000 * 60 * 60,
    });
};

export const useCreateCheckout = () => {
    return useMutation({
        mutationFn: (planId: number) => PaymentService.createCheckout(planId),
        onError: (error: ApiError) => {
            toast.error(error.message || 'Failed to initiate checkout.');
        },
    });
};

export const useConfirmPayment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (paymentId: number) =>
            PaymentService.confirmPayment(paymentId),
        onSuccess: () => {
            toast.success('Payment confirmed successfully!');
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Payment confirmation failed.');
        },
        retry: 0,
    });
};
