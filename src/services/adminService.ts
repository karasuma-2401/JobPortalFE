import { privateApi } from "../api/api";

// Page Response wrappers
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

// 5. Audit Log Interfaces
export interface AuditLogResponse {
    id: number;
    actionType: 'CREATE' | 'UPDATE' | 'DELETE';
    entityName: string;
    recordId: number;
    userId: number;
    userName: string;
    data: string; // JSON data
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

// Định nghĩa một cấu trúc linh hoạt đại diện cho Page từ Backend
export interface FlexiblePageData<T> {
    items?: T[];
    content?: T[];
    totalItems?: number;
    totalElements?: number;
    page?: number;
    number?: number;
    size?: number;
}
export const AdminService = {
    // 1. Dashboard
    getDashboardSummary: async (): Promise<AdminDashboardSummary> => {
        return privateApi.get("/admin/dashboard/summary");
    },

    // 2. Users
   getUsers: async (params: {
    search?: string;
    role?: string;
    active?: boolean;
    offset: number;
    limit: number;
    }): Promise<PageResponse<UserResponse>> => {
        const response = await privateApi.get("/admin/users", { params }) as unknown as BackendResponseEnvelope<FlexiblePageData<UserResponse>>;
        
        const pageData = response.data;

        return {
            items: pageData?.items || pageData?.content || [],
            totalItems: pageData?.totalItems || pageData?.totalElements || 0,
            page: pageData?.page || 0,
            size: pageData?.size || 10
        };
    },

// 3. Employers
    getEmployers: async (params: {
        search?: string;
        status?: string;
        limit: number;
        offset: number;
    }): Promise<PageResponse<EmployerProfileResponse>> => {
        const response = await privateApi.get("/admin/employers", { params }) as unknown as BackendResponseEnvelope<FlexiblePageData<EmployerProfileResponse>>;
        
        const pageData = response.data;

        return {
            items: pageData?.items || pageData?.content || [],
            totalItems: pageData?.totalItems || pageData?.totalElements || 0,
            page: pageData?.page || 0,
            size: pageData?.size || 10
        };
    },

    getEmployerById: async (id: number): Promise<EmployerProfileResponse> => {
        return privateApi.get(`/admin/employers/${id}`);
    },

    updateEmployerApproval: async (
        id: number,
        payload: { approvalStatus: string; rejectionReason?: string }
    ): Promise<EmployerProfileResponse> => {
        return privateApi.patch(`/admin/employers/${id}/approval`, payload);
    },

    // 4. Industries
    getIndustries: async (params: {
        name?: string;
        offset: number;
        limit: number;
    }): Promise<PageResponse<IndustryResponse>> => {
        return privateApi.get("/industry", { params });
    },

    createIndustry: async (name: string): Promise<IndustryResponse> => {
        return privateApi.post("/industry", { name });
    },

    updateIndustry: async (id: number, name: string): Promise<IndustryResponse> => {
        return privateApi.patch(`/industry/${id}`, { name });
    },

    deleteIndustry: async (id: number): Promise<{ status: boolean; message: string }> => {
        return privateApi.delete(`/industry/${id}`);
    },

    // 5. Audit Logs
    getAuditLogs: async (params: {
        search?: string;
        actionType?: string;
        entityName?: string;
        startDate?: string;
        endDate?: string;
        offset: number;
        limit: number;
    }): Promise<PageResponse<AuditLogResponse>> => {
        return privateApi.get("/audit", { params });
    },

    // 6. Payments
    getPayments: async (params: {
        search?: string;
        status?: string;
        page: number;
        size: number;
    }): Promise<SpringPage<PaymentResponse>> => {
        return privateApi.get("/admin/payments", { params });
    },

    updatePaymentStatus: async (
        id: number,
        status: string
    ): Promise<PaymentResponse> => {
        return privateApi.patch(`/payments/${id}/status`, null, { params: { status } });
    }
};
