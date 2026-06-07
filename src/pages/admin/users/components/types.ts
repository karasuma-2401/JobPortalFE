export type UserRole = 'Candidate' | 'Employer';
export type UserStatus = 'Active' | 'Locked';

export interface UserProfile {
    id: string;
    avatarUrl: string;
    fullName: string;
    email: string;
    role: UserRole;
    createdAt: string;
    status: UserStatus;
}
