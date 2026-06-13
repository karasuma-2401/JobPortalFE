export interface Invoice {
    id: string;
    date: string;
    plan: string;
    amount: string;
}

export interface InvoicesResponse {
    totalElements: number;
    totalPages: number;
    content: Invoice[];
}
