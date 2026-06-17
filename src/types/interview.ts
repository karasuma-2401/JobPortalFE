
export type InterviewStatus = 
    | 'PENDING_CONFIRMATION' 
    | 'SCHEDULED' 
    | 'COMPLETED' 
    | 'CANCELLED';

export const InterviewStatusList = {
    PENDING_CONFIRMATION: 'PENDING_CONFIRMATION',
    SCHEDULED: 'SCHEDULED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export interface InterviewSession {
    id: string;
    applicationId: string;
    jobTitle: string;
    companyName: string;
    scheduledAt: string; 
    status: InterviewStatus; 
    location?: string;
    notes?: string;
}

export interface InterviewConfirmationPayload {
    applicationId: string;
    selectedDateTime: string;
    candidateNotes?: string;
}