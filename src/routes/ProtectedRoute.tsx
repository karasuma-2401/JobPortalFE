import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { Role } from '../bases/constants/app';
import useAuth from '../contexts/auth/useAuth';
import { getDefaultAuthenticatedRoute } from '../contexts/auth/auth-utils';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: Role[];
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    allowedRoles,
    redirectTo = '/login',
}: ProtectedRouteProps) {
    const { user, roles } = useAuth();

    if (!user) {
        return <Navigate to={redirectTo} replace />;
    }

    if (
        allowedRoles?.length &&
        !allowedRoles.some((role) => roles.includes(role))
    ) {
        return <Navigate to={getDefaultAuthenticatedRoute(user)} replace />;
    }

    return <>{children}</>;
}
