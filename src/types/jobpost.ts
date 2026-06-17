export interface JobPostResponse {
    id: string | number;
    title: string;
    description?: string;
    type?: string;           // employment type string (e.g. "Full-Time")
    employmentType?: string;
    status?: string;
    educationLevel?: string;
    experience?: number;
    jobLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    tags?: string[];
    location?: string;
    createdAt?: string;
    expiresAt?: string;
    daysRemaining?: string;  // pre-computed string from backend (e.g. "5 days remaining")
    isFeatured?: boolean;
    isHighlighted?: boolean;
    applicationCount?: number;
    views?: number;
}

export interface PagedJobResponse {
    items: JobPostResponse[];
    totalItems: number;
}

export interface JobDetail extends JobPostResponse {
    salaryType?: string;
    jobRole?: string;
    vacancies?: number;
    requirements?: string;
    benefits?: string[];
    industryIds?: number[];
    reviews?: JobReview[];
    userApplication?: UserApplication;
}
export interface JobReview {
    id: string | number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface UserApplication {
    status: string; 
    hasInterview: boolean; 
}