import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type ApiError } from '../api/api';
import { InterviewService } from '../services/interviewService';
import type {
    CreateInterviewSessionPayload,
    InterviewSessionStatus,
} from '../types/interview';

export const useInterviewSessions = (status?: InterviewSessionStatus) => {
    return useQuery({
        queryKey: ['interviewSessions', status],
        queryFn: () =>
            InterviewService.listSessions({
                status,
                limit: 100,
                offset: 0,
            }),
    });
};

export const useInterviewSession = (id: number | undefined) => {
    return useQuery({
        queryKey: ['interviewSession', id],
        queryFn: () => InterviewService.getSession(Number(id)),
        enabled: Boolean(id),
    });
};

export const useCreateInterviewSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateInterviewSessionPayload) =>
            InterviewService.createSession(payload),
        onSuccess: () => {
            toast.success('Interview invitation sent.');
            queryClient.invalidateQueries({ queryKey: ['interviewSessions'] });
            queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Failed to create interview session.');
        },
    });
};

export const useSelectInterviewSlot = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, slotId }: { id: number; slotId: number }) =>
            InterviewService.selectSlot(id, slotId),
        onSuccess: (session) => {
            toast.success('Interview slot selected.');
            queryClient.invalidateQueries({ queryKey: ['interviewSessions'] });
            queryClient.invalidateQueries({
                queryKey: ['interviewSession', session.id],
            });
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Failed to select interview slot.');
        },
    });
};

export const useInterviewAction = (
    action: 'cancel' | 'complete'
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            action === 'cancel'
                ? InterviewService.cancelSession(id)
                : InterviewService.completeSession(id),
        onSuccess: () => {
            toast.success(
                action === 'cancel'
                    ? 'Interview session cancelled.'
                    : 'Interview session completed.'
            );
            queryClient.invalidateQueries({ queryKey: ['interviewSessions'] });
            queryClient.invalidateQueries({ queryKey: ['interviewSession'] });
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Interview action failed.');
        },
    });
};

export const useRescheduleInterviewSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: CreateInterviewSessionPayload;
        }) => InterviewService.rescheduleSession(id, payload),
        onSuccess: () => {
            toast.success('Interview session rescheduled.');
            queryClient.invalidateQueries({ queryKey: ['interviewSessions'] });
            queryClient.invalidateQueries({ queryKey: ['interviewSession'] });
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Failed to reschedule interview.');
        },
    });
};
