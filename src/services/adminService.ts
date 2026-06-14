import { privateApi } from "../api/api";
import type {
    AdminDashboardSummary,
    PageResponse,
    UserResponse,
    BackendResponseEnvelope,
    FlexiblePageData,
    EmployerProfileResponse,
    IndustryResponse,
    AuditLogResponse,
    PaymentResponse,
} from '../types/admin';
// Page Response wrappers

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

    toggleUserLock: async (id: number): Promise<UserResponse> => {
        const response = await privateApi.put(`/admin/users/${id}/lock`) as unknown as BackendResponseEnvelope<UserResponse>;

        return response.data;
    },

    deactivateUser: async (id: number): Promise<UserResponse> => {
        const response = await privateApi.delete(`/admin/users/${id}`) as unknown as BackendResponseEnvelope<UserResponse>;

        return response.data;
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
        const response = await privateApi.get("/industry", {
            params,
        }) as unknown as BackendResponseEnvelope<FlexiblePageData<IndustryResponse>>;

        const pageData = response.data;

        return {
            items: pageData?.items || pageData?.content || [],
            totalItems: pageData?.totalItems || pageData?.totalElements || 0,
            page: pageData?.page || pageData?.number || 0,
            size: pageData?.size || params.limit,
        };
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
    }): Promise<PageResponse<PaymentResponse>> => {
        const response = await privateApi.get("/admin/payments", {
            params,
        }) as unknown as BackendResponseEnvelope<FlexiblePageData<PaymentResponse>>;

        const pageData = response.data;

        return {
            items: pageData?.items || pageData?.content || [],
            totalItems: pageData?.totalItems || pageData?.totalElements || 0,
            page: pageData?.page || pageData?.number || 0,
            size: pageData?.size || params.size,
        };
    },

    updatePaymentStatus: async (
        id: number,
        status: string
    ): Promise<unknown> => {
        if (status === 'COMPLETED') {
            return privateApi.post(`/admin/payments/approve/${id}`);
        }

        return privateApi.patch(`/payments/${id}/status`, null, { params: { status } });
    }
};
