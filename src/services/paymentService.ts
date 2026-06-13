import { privateApi, publicApi } from '../api/api';
import type { PaymentResponse, PlanResponse } from '../types/payment';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const PaymentService = {
    createPayment: async (payload: {
        cost: number;
        planName: string;
        note?: string;
    }): Promise<PaymentResponse> => {
        const response = (await privateApi.post(
            '/payments',
            payload
        )) as unknown as ApiResponse<PaymentResponse>;

        return response.data;
    },

    getPaymentStatus: async (
        transactionRef: string
    ): Promise<PaymentResponse> => {
        const response = (await privateApi.get(
            `/payments/transaction/${transactionRef}`
        )) as unknown as ApiResponse<PaymentResponse>;

        return response.data;
    },

    getPlans: async (): Promise<PlanResponse[]> => {
        // Dùng unknown thay vì any để đảm bảo an toàn kiểu (Strict Type)
        const response = (await publicApi.get('/plans')) as unknown;
        let plans: PlanResponse[] = [];

        // Kiểm tra và bóc tách dữ liệu an toàn
        if (Array.isArray(response)) {
            plans = response as PlanResponse[];
        } else {
            const apiResponse = response as ApiResponse<PlanResponse[]>;
            if (apiResponse && Array.isArray(apiResponse.data)) {
                plans = apiResponse.data;
            }
        }

        // ⚠️ NẾU DATABASE TRỐNG -> Đẩy data giả vào để bạn test UI và luồng Checkout
        if (plans.length === 0) {
            console.warn('⚠️ Database is empty! Using MOCK DATA to render UI.');
            return [
                {
                    id: 1,
                    name: 'Standard',
                    price: 19,
                    priority: 0,
                    duration: 30,
                    maxJobPostsPerMonth: 5,
                },
                {
                    id: 2,
                    name: 'Premium',
                    price: 49,
                    priority: 1,
                    duration: 30,
                    maxJobPostsPerMonth: 20,
                },
                {
                    id: 3,
                    name: 'Enterprise',
                    price: 99,
                    priority: 0,
                    duration: 60,
                    maxJobPostsPerMonth: 100,
                },
            ];
        }

        return plans;
    },
};
