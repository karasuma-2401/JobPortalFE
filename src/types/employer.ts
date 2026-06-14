export interface SocialLinkPayload {
    network: string;
    url: string;
}

export interface EmployerSetupPayload {
    companyName: string;
    description: string;
    logo: File | null;
    banner: File | null;
    organizationType: string;
    industry: string;
    teamSize: string;
    founded: string;
    companyWebsite: string;
    vision: string;
    address: string;
    phone: string;
    email: string;
    socialLinks: SocialLinkPayload[];
}

export interface EmployerProfile {
    id: number;
    companyName: string;
    address: string;
    companyWebsite: string;
    logo: string;
    banner: string;
    description: string;
    vision: string;
    founded: string;
    teamSize: string;
    industry: string;
    organizationType: string;
    email: string;
    phone: string;
    facebookUrl?: string;
    twitterUrl?: string;
    linkedlnUrl?: string;
}

export interface JobResponse {
    id: number;
    title: string;
    employmentType: string;
    salaryMin: number;
    salaryMax: number;
    salaryType: string;
    expiresAt: string;
    status: string;
}

export interface JobSeekerData {
    id: string | number;
    fullName?: string;
    avatar?: string;
    professionalTitle?: string;
    experienceSummary?: string;
    educationSummary?: string;
    biography?: string;
    dateOfBirth?: string;
    nationality?: string;
    maritalStatus?: string;
    gender?: string;
    website?: string;
    address?: string;
    phone?: string;
    secondaryPhone?: string;
    email?: string;
    facebookUrl?: string;
    twitterUrl?: string;
    linkedlnUrl?: string;
}
