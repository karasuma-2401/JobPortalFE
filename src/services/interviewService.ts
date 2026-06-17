import { privateApi } from '../api/api';
import type {
    CreateInterviewSessionPayload,
    InterviewSession,
    InterviewSessionStatus,
    PagedInterviewSessions,
} from '../types/interview';

interface ApiResponse<T> {
    data: T;
}

const unwrap = <T>(response: unknown): T => {
    const root = response as ApiResponse<T>;
    return root?.data ?? (response as T);
};

export const InterviewService = {
    createSession: async (
        payload: CreateInterviewSessionPayload
    ): Promise<InterviewSession> => {
        return unwrap<InterviewSession>(
            await privateApi.post('/interview-sessions', payload)
        );
    },

    listSessions: async (params?: {
        status?: InterviewSessionStatus;
        limit?: number;
        offset?: number;
    }): Promise<PagedInterviewSessions> => {
        return unwrap<PagedInterviewSessions>(
            await privateApi.get('/interview-sessions', { params })
        );
    },

    getSession: async (id: number): Promise<InterviewSession> => {
        return unwrap<InterviewSession>(
            await privateApi.get(`/interview-sessions/${id}`)
        );
    },

    selectSlot: async (
        id: number,
        slotId: number
    ): Promise<InterviewSession> => {
        return unwrap<InterviewSession>(
            await privateApi.post(`/interview-sessions/${id}/select-slot`, {
                slotId,
            })
        );
    },

    cancelSession: async (id: number): Promise<InterviewSession> => {
        return unwrap<InterviewSession>(
            await privateApi.post(`/interview-sessions/${id}/cancel`)
        );
    },

    rescheduleSession: async (
        id: number,
        payload: CreateInterviewSessionPayload
    ): Promise<InterviewSession> => {
        return unwrap<InterviewSession>(
            await privateApi.post(`/interview-sessions/${id}/reschedule`, payload)
        );
    },

    completeSession: async (id: number): Promise<InterviewSession> => {
        return unwrap<InterviewSession>(
            await privateApi.post(`/interview-sessions/${id}/complete`)
        );
    },
};
