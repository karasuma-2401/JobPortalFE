export interface PaymentResponse {
    id: number;
    planName: string;
    transactionRef: string;
    cost: number;
    method: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELED';
    note?: string;
    qrCode?: string;
    checkoutUrl?: string;
    accountNumber?: string;
    accountName?: string;
    bin?: string;
}

export interface PlanResponse {
    id: number;
    name: string;
    price: number;
    priority: number;
    duration: number;
    maxJobPostsPerMonth: number;
    maxResumeAccess: number;
    allowHighlight: boolean;
    featureDurationDays: number;
}
