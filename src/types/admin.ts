export interface PageResponse<T> {
    items: T[];
    totalItems: number;
    page: number;
    size: number;
}

export interface SpringPage<T> {
    content: T[];
    totalElements: number;
    number: number;
    size: number;
}

// 1. Dashboard Interfaces
export interface MetricPoint {
    label: string;
    value: number;
}

export interface PendingEmployerItem {
    id: number;
    companyName: string;
    email: string;
    industry: string;
    createdAt: string;
}

export interface AdminDashboardSummary {
    totalRevenue: number;
    totalUsers: number;
    activeJobs: number;
    pendingEmployers: number;
    monthlyRevenue: MetricPoint[];
    industryBreakdown: MetricPoint[];
    pendingEmployersList: PendingEmployerItem[];
}

// 2. User Interfaces
export interface UserResponse {
    id: number;
    email: string;
    displayName: string;
    createdAt: string;
    active: boolean;
    banned?: boolean;
    roles?: string[];
}

// 3. Employer Interfaces
export interface EmployerProfileResponse {
    id: number;
    userId: number;
    companyName: string;
    companyWebsite: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
    banner: string;
    businessLicense: string;
    industry: string;
    approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
    active: boolean;
    createdAt: string;
}

// 4. Industry Interfaces
export interface IndustryResponse {
    id: number;
    name: string;
    jobCount: number;
    createdAt: string;
}

export interface AuditLogResponse {
    id: number;
    actionType: 'CREATE' | 'UPDATE' | 'DELETE';
    entityName: string;
    recordId: number;
    userId: number;
    userName: string;
    data: string; // JSON data
    ipAddress?: string;
    createdAt: string;
}

// 6. Payment Interfaces
export interface PaymentResponse {
    id: number;
    planName: string;
    transactionRef: string;
    cost: number;
    method: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELED';
    note?: string;
    createdAt: string;
    payerEmail: string;
    employerName: string;
}
export interface BackendResponseEnvelope<T> {
    success: boolean;
    message?: string;
    data: T;
}

// Flexible structure representing paginated data from the backend
export interface FlexiblePageData<T> {
    items?: T[];
    content?: T[];
    totalItems?: number;
    totalElements?: number;
    page?: number;
    number?: number;
    size?: number;
}
