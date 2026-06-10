export interface JobDetail {
    id?: string | number;
    title?: string;
    employmentType?: string;
    location?: string;
    salaryMin?: number;
    salaryMax?: number;
    experience?: number;
    description?: string;
    requirements?: string;
    benefits?: string[];
    skills?: string[];
    status?: string;
}
