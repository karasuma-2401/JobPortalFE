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

export const AdminService = {
    // 1. Dashboard
    getDashboardSummary: async (): Promise<AdminDashboardSummary> => {
        const response = await privateApi.get<unknown>("/admin/dashboard/summary");
        const res = response as unknown as Record<string, unknown>;

        const payload = res.data ? (res.data as unknown as Record<string, unknown>) : res;

        if (payload && typeof payload === 'object' && 'data' in payload && payload.data) {
            return payload.data as unknown as AdminDashboardSummary;
        }

        return payload as unknown as AdminDashboardSummary;
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
            page: pageData?.page || pageData?.number || 0,
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
            page: pageData?.page || pageData?.number || 0,
            size: pageData?.size || 10
        };
    },

    getEmployerById: async (id: number): Promise<EmployerProfileResponse> => {
        const response = await privateApi.get(`/admin/employers/${id}`) as unknown as BackendResponseEnvelope<EmployerProfileResponse>;
        return response.data;
    },

    updateEmployerApproval: async (
        id: number,
        payload: { approvalStatus: string; rejectionReason?: string }
    ): Promise<EmployerProfileResponse> => {
        const response = await privateApi.patch(`/admin/employers/${id}/approval`, payload) as unknown as BackendResponseEnvelope<EmployerProfileResponse>;
        return response.data;
    },

    // 4. Industries
    getIndustries: async (params: {
        name?: string;
        offset: number;
        limit: number;
    }): Promise<PageResponse<IndustryResponse>> => {
        const response = await privateApi.get("/industry", { params }) as unknown as BackendResponseEnvelope<FlexiblePageData<IndustryResponse>>;

        const pageData = response.data;

        return {
            items: pageData?.items || pageData?.content || [],
            totalItems: pageData?.totalItems || pageData?.totalElements || 0,
            page: pageData?.page || pageData?.number || 0,
            size: pageData?.size || params.limit,
        };
    },

    createIndustry: async (name: string): Promise<IndustryResponse> => {
        const response = await privateApi.post("/industry", { name }) as unknown as BackendResponseEnvelope<IndustryResponse>;
        return response.data;
    },

    updateIndustry: async (id: number, name: string): Promise<IndustryResponse> => {
        const response = await privateApi.patch(`/industry/${id}`, { name }) as unknown as BackendResponseEnvelope<IndustryResponse>;
        return response.data;
    },

    deleteIndustry: async (id: number): Promise<{ status: boolean; message: string }> => {
        const response = await privateApi.delete(`/industry/${id}`) as unknown as BackendResponseEnvelope<{ status: boolean; message: string }>;
        return response.data;
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
        const response = await privateApi.get("/audit", { params }) as unknown as BackendResponseEnvelope<FlexiblePageData<AuditLogResponse>>;
        
        const pageData = response.data;
        
        return {
            items: pageData?.items || pageData?.content || [],
            totalItems: pageData?.totalItems || pageData?.totalElements || 0,
            page: pageData?.page || pageData?.number || 0,
            size: pageData?.size || params.limit,
        };
    },

    // 6. Payments
    getPayments: async (params: {
        search?: string;
        status?: string;
        page: number;
        size: number;
    }): Promise<PageResponse<PaymentResponse>> => {
        const response = await privateApi.get("/admin/payments", { params }) as unknown as BackendResponseEnvelope<FlexiblePageData<PaymentResponse>>;

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
            const response = await privateApi.post(`/admin/payments/approve/${id}`) as unknown as BackendResponseEnvelope<unknown>;
            return response.data;
        }

        const response = await privateApi.patch(`/payments/${id}/status`, null, { params: { status } }) as unknown as BackendResponseEnvelope<unknown>;
        return response.data;
    }
};