import type { Role } from '../../bases/constants/app';
import { LocalStorageService } from '../../services/local-storage';

type AuthenticatedUserLike = {
    roles?: Role[];
    hasProfile?: boolean;
};

export interface AuthUser {
    roles?: Role[];
    name?: string;
    email?: string;
    hasProfile?: boolean;
    [key: string]: unknown;
}

export interface AuthState {
    user: AuthUser | null;
    roles: Role[];
    isAuthenticated: boolean;
    isAdmin: boolean;
    isEmployer: boolean;
    isJobSeeker: boolean;
}

export const getAuthStateFromStorage = (): AuthState => {
    const me = LocalStorageService.getValue<AuthUser>('me');
    const roles = Array.isArray(me?.roles) ? me.roles : [];
    return {
        user: me ?? null,
        roles,
        isAuthenticated: Boolean(me),
        isAdmin: roles.includes('ADMIN'),
        isEmployer: roles.includes('EMPLOYER'),
        isJobSeeker: roles.includes('SEEKER'),
    };
};

export const getDefaultAuthenticatedRoute = (
    user: AuthenticatedUserLike | null | undefined
): string => {
    if (!user) {
        return '/login';
    }

    const roles = Array.isArray(user.roles) ? user.roles : [];

    if (roles.includes('ADMIN')) {
        return '/admin/dashboard';
    }

    if (roles.includes('EMPLOYER')) {
        return user.hasProfile
            ? '/employer/dashboard'
            : '/employer/setup/company';
    }

    if (roles.includes('SEEKER')) {
        return user.hasProfile
            ? '/jobseeker/DashBoard/overview'
            : '/jobseeker/setup';
    }

    return '/';
};
