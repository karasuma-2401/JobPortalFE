import type { ApplicationStatus } from './application';

export type InterviewSessionStatus =
    | 'PENDING_SELECTION'
    | 'CONFIRMED'
    | 'EXPIRED'
    | 'CANCELLED'
    | 'COMPLETED';

export interface InterviewSlot {
    id: number;
    startsAt: string;
    displayNote?: string;
    selected?: boolean;
}

export interface InterviewSession {
    id: number;
    applicationId: number;
    jobPostId: number;
    jobPostTitle: string;
    jobSeekerId: number;
    jobSeekerName: string;
    employerId: number;
    employerName: string;
    applicationStatus: ApplicationStatus;
    status: InterviewSessionStatus;
    message?: string;
    meetingLocation?: string;
    meetingUrl?: string;
    expiresAt: string;
    createdAt: string;
    completedAt?: string;
    cancelledAt?: string;
    selectedSlot?: InterviewSlot;
    slots: InterviewSlot[];
}

export interface CreateInterviewSessionPayload {
    applicationId: number;
    message?: string;
    meetingLocation?: string;
    meetingUrl?: string;
    slots: Array<{
        startsAt: string;
        displayNote?: string;
    }>;
}

export interface PagedInterviewSessions {
    items: InterviewSession[];
    totalItems: number;
    page: number;
    size: number;
}
