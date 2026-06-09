import type { JobSeekerProfile } from './jobseeker';

export type ApplicationStatus =
    | 'PENDING'
    | 'REVIEWING'
    | 'INTERVIEW'
    | 'OFFER'
    | 'REJECTED'
    | 'ACCEPTED';

export interface JobSeekerProfileBrief {
    id: number;
    fullName: string;
    address: string;
    phone: string;
}

export interface JobApplication {
    id: number;
    coverLetter: string;
    status: ApplicationStatus;
    appliedAt?: string;
    jobSeekerProfile: JobSeekerProfileBrief;
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
