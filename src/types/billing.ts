export interface BillingOverview {
    planName: string;
    description: string;
    isCanceled: boolean;
    amount: string;
    dueDate: string;
    packageStarted: string;
    maxJobPosts: number;
    activeJobsCount: number;
    remainingJobPosts: number;
}

export interface InvoiceItem {
    id: string;
    date: string;
    plan: string;
    status: string;
    amount: string;
}

export interface InvoicesFilterResponse {
    items: InvoiceItem[];
    totalItems: number;
    page: number;
    size: number;
}

export interface TransactionDetails {
    id: number;
    planName: string;
    transactionRef: string;
    cost: number;
    method: string;
    status: string;
    note: string;
    createdAt: string;
    payerEmail: string;
    employerName: string;
    checkoutUrl: string;
    qrCode: string;
    bin: string;
    accountNumber: string;
    accountName: string;
}
