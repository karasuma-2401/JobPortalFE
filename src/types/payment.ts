export interface PaymentResponse {
    id: number;
    planName: string;
    transactionRef: string;
    cost: number;
    method: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELED';
    note?: string;
}
