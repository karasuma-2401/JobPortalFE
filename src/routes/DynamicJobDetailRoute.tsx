import { Navigate, useParams } from 'react-router-dom';
import useAuth from '../contexts/auth/useAuth';
import JobSeekerJobDetailPage from '../pages/jobseeker/FindJob/JobDetailPage';

export default function DynamicJobDetailRoute() {
    const { jobId } = useParams<{ jobId: string }>();
    const { user } = useAuth() as { user: Record<string, unknown> | null };

    if (user && typeof user === 'object' && user.role === 'SEEKER') {
        return <Navigate to={`/jobseeker/find-job/${jobId}`} replace />;
    }

    return <JobSeekerJobDetailPage />;
}