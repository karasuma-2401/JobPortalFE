export interface Resume {
    id: string;
    name: string;
    size: string;
    uploadDate: string;
}

export interface UserProfile {
    fullName: string;
    title: string;
    experience: string;
    education: string;
    personalWebsite?: string;
    avatarUrl?: string;
}
