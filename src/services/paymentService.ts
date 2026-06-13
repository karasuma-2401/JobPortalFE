import { privateApi, publicApi } from '../api/api';
import type { PaymentResponse, PlanResponse } from '../types/payment';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const PaymentService = {
    createCheckout: async (planId: number): Promise<PaymentResponse> => {
        const response = (await privateApi.post(
            `/payments/checkout?planId=${planId}`
        )) as unknown as ApiResponse<PaymentResponse>;
        return response.data || response;
    },
    confirmPayment: async (paymentId: number): Promise<void> => {
        await privateApi.post(`/payments/confirm/${paymentId}`);
    },
    getPlans: async (): Promise<PlanResponse[]> => {
        const response = (await publicApi.get(
            '/plans'
        )) as unknown as ApiResponse<PlanResponse[]>;

        return response?.data || [];
    },
};
