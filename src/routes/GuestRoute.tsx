import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../contexts/auth/useAuth';
import { getDefaultAuthenticatedRoute } from '../contexts/auth/auth-utils';

interface GuestRouteProps {
    children: ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
    const { user } = useAuth();

    if (user) {
        return <Navigate to={getDefaultAuthenticatedRoute(user)} replace />;
    }

    return <>{children}</>;
}
