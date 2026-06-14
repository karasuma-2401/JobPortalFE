export interface JobPostResponse {
    id: string | number;
    title: string;
    description?: string;
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
}
