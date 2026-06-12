import { privateApi } from '../api/api';
import { publicApi } from '../api/api';
import type { PaymentResponse } from '../types/payment';
import type { PlanResponse } from '../types/payment';

export const PaymentService = {
    createPayment: async (payload: {
        cost: number;
        planName: string;
        note?: string;
    }): Promise<PaymentResponse> => {
        const response = await privateApi.post('/payments', payload);
        return (response.data as Record<string, unknown>)
            .data as PaymentResponse;
    },
    getPaymentStatus: async (
        transactionRef: string
    ): Promise<PaymentResponse> => {
        const response = await privateApi.get(
            `/payments/transaction/${transactionRef}`
        );
        return (response.data as Record<string, unknown>)
            .data as PaymentResponse;
    },
    getPlans: async (): Promise<PlanResponse[]> => {
        const response = await publicApi.get('/plans');
        return (response.data as Record<string, unknown>)
            .data as PlanResponse[];
    },
};
