export interface Job {
    id: string;
    companyName: string;
    createdAt: string;
    daysRemaining: string;
    description?: string;
    education: string;
    educationLevel?: string;
    logo: string;
    location: string;
    employer?: {
        companyName: string;
        companyWebsite: string;
    };
    employmentType?: string;
    experience: number | string;
    experienceLabel?: string;
    expiresAt?: string;
    industries?: Array<{
        id: number;
        name: string;
    }>;
    isFeatured: boolean;
    isHighlighted?: boolean;
    jobLevel: string;
    jobLevelLabel?: string;
    salary: string;
    salaryMax?: number;
    salaryMin?: number;
    salaryType?: string;
    status?: string;
    tags?: string;
    title: string;
    type: string;
    vacancies?: number;
}

export interface JobOverview {
    postedDate: string;
    expireIn: string;
    education: string;
    salary: string;
    location: string;
    jobType: string;
    experience: string;
}

export interface CompanyProfile {
    industry: string;
    foundedIn: string;
    orgType: string;
    companySize: string;
}

export interface JobDetailType {
    id: string;
    title: string;
    companyName: string;
    logo: string;
    type: string;
    isFeatured: boolean;
    website: string;
    phone: string;
    email: string;
    expireDate: string;
    description: string | string[];
    responsibilities: string[];
    requirements?: string;
    overview: JobOverview;
    companyProfile: CompanyProfile;
}

export interface Employer {
    id: string;
    name: string;
    logo: string;
    location: string;
    openJobsCount: number;
    category?: string;
}

export interface EmployerOverview {
    founded: string;
    orgType: string;
    teamSize: string;
    industry: string;
}

export interface EmployerContact {
    website: string;
    phone: string;
    email: string;
}

export interface EmployerDetail {
    id: string;
    name: string;
    logo: string;
    category: string;
    description: string;
    benefits: string[];
    vision: string;
    overview: EmployerOverview;
    contact: EmployerContact;
}

export interface JobFilterParams {
    keyword?: string;
    location?: string;
    category?: string;
    jobType?: string;
    salaryMin?: number;
    salaryMax?: number;
    experience?: string;
    salaryRange?: string;
    jobTypes?: string[];
    education?: string[];
    jobLevel?: string;
    page: number;
    limit: number;
    sortBy?: string;
}

export interface EmployerFilterParams {
    keyword?: string;
    location?: string;
    category?: string;
    page: number;
    limit: number;
}

export interface ApplyJobRequest {
    jobId: string;
    resumeId: string;
    coverLetter: string;
}

export interface AppliedJobType {
    id: string;
    role: string;
    logo: string;
    jobPostId: string;
    type: string;
    location: string;
    salary: string;
    appliedAt: string;
    status: string;
}

export interface FavoriteJobType {
    id: string;
    logo: string;
    role: string;
    type: string;
    location: string;
    salary: string;
    timeStatus: string;
    isExpired?: boolean;
}

export interface JobAlertItemType {
    id: string;
    keyword: string | null;
    location: string | null;
    category: string | null;
    createdAt: string | null;
}

export interface DashboardOverviewType {
    appliedCount: number;
    favoriteCount: number;
    alertCount: number;
    recentApplied: AppliedJobType[];
    isProfileCompleted: boolean;
}

export interface Resume {
    id: string;
    fileName: string;
    fileUrl: string;
    defaultResume: boolean;
    uploadedAt: string;
}

export interface JobSeekerProfile {
    id: number;
    fullName: string;
    email: string;
    avatar: string | null;
    address: string;
    phone: string;
    professionalTitle: string | null;
    biography: string | null;
    dateOfBirth: string | null;
    nationality: string | null;
    maritalStatus: string | null;
    gender: string | null;
    experienceSummary: string | null;
    educationSummary: string | null;
    website: string | null;
    facebookUrl: string | null;
    twitterUrl: string | null;
    linkedlnUrl: string | null;
    secondaryPhone: string | null;
    approve: boolean;
}

export interface JobSeekerProfileFormValues {
    fullName: string;
    address: string;
    phone: string;
    professionalTitle: string;
    biography: string;
    dateOfBirth: string;
    nationality: string;
    maritalStatus: string;
    gender: string;
    experienceSummary: string;
    educationSummary: string;
    website: string;
    facebookUrl: string;
    twitterUrl: string;
    linkedInUrl: string;
    secondaryPhone: string;
    avatarFile?: File | null;
}

export interface PagedResponse<T> {
    items: T[];
    totalItems: number;
    page: number;
    size: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export interface SpringPageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

