import type { JobSeekerProfile } from './jobseeker';
export type ApplicationStatus =
    | 'PENDING'
    | 'REVIEWING'
    | 'REJECTED'
    | 'ACCEPTED';

export interface JobSeekerProfileBrief {
    id: number;
    fullName: string;
    address: string;
    phone: string;
    professionalTitle?: string;
    experienceSummary?: string;
    educationSummary?: string;
    avatar?: string;
    email?: string;
}

export interface JobApplication {
    id: number;
    coverLetter: string;
    status: ApplicationStatus;
    appliedAt?: string;
    jobSeekerProfile: JobSeekerProfileBrief;
    resume?: {
        id: number;
        fileUrl: string;
    };
}

export interface JobApplicationResponse {
    success: boolean;
    message: string;
    data: JobApplication[];
}

export interface JobApplicationDetail {
    id: number;
    coverLetter: string;
    approve: boolean;
    status: ApplicationStatus;
    appliedAt?: string;
    jobSeekerProfile: JobSeekerProfile;

    jobPost: {
        id: number;
        title: string;
    };
    resume: {
        id: number;
        fileUrl: string;
    };
}
