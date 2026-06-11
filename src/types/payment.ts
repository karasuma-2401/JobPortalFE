export interface PaymentResponse {
    id: number;
    planName: string;
    transactionRef: string;
    cost: number;
    method: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELED';
    note?: string;
}
export interface PlanResponse {
    id: number;
    name: string;
    price: number;
    priority: number;
    duration: number;
    maxJobPostsPerMonth: number;
}
